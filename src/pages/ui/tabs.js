import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'
// const { TabPane } = Tabs;
const TabPane = Tabs.TabPane;

export default class Tabs1 extends Component {
    newTabIndex = 0;
    handleCallback = (key) => {
        message.info("Hi,你选择了页签:" + key)
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Tab 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]

        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }

    onChange = (activeKey) => {
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标页签">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">创建属于你的React项目</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 1</span>} key="2">尝试如何使用React进行修改</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 1</span>} key="3">删除它，就这么简单</TabPane>
                    </Tabs>
                </Card>
                <Card title="自定义新增Tab">
                    <Tabs defaultActiveKey="1"
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(panel => {
                                return <TabPane
                                    tab={panel.title}
                                    key={panel.key}>
                                    {panel.content}
                                </TabPane>
                            })

                        }

                    </Tabs>
                </Card>

            </div>
        )
    }
}