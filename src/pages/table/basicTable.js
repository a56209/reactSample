import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
// import axios from 'axios'
import axios from './../../axios'
import utils from '../../utils/utils';


class BasicTable extends Component {
    state = {
        dataSource2: []
    }

    params = {
        page:1
    }
    componentDidMount() {
        const data = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Lily',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ]

        data.map((itme, index) => {
            itme.key = index
        })

        this.setState({
            dataSource: data
        })
        this.request();  //调用
    }

    //动态获取mock数据
    request = () => {
        // let baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/';
        // axios.get(baseUrl + 'table/list').then((res) => {
        //     if (res.status == 200 & res.data.code == 0) {
        //         // console.log(JSON.stringify(res));
        //         this.setState({
        //             dataSource2: res.data.result.list
        //         })
        //     }
        // })

        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:utils.pagination(res,(current)=>{
                        //to-do
                        _this.params.page = current
                        _this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record, index) => {
        //此处用数组，如果是多选的时候会用上
        let selectKey = [index];
        Modal.info({
            title: '选中信息',
            content: `用户ID：${record.id}，用户姓名：${record.userName}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        })
    }

    handleDelete = (()=>{
        let rows = this.state.selectedRows;
        let ids = []
        rows.map((itme)=>{
            ids.push(itme.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    })

    render() {
        // 定义表头
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                Key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        1: '幼儿园',
                        '2': '小学',
                        '3': '初中',
                        '4': '高中',
                        '5': '大学'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[abc]
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows)=>{
                // let ids = [];
                // selectedRows.map((itme)=>{
                //     ids.push(itme.id)
                // })
                this.setState({
                    selectedRowKeys,
                    // selectedIds:ids
                    selectedRows
                })

            }
        }

        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        dataSource={this.state.dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-mock" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index)
                                }

                            };
                        }}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-多选" style={{ margin: '10px 0' }}>
                    <div style={{marginBottom:10}}>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}                        
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-分页" style={{ margin: '10px 0' }}>                    
                    <Table
                        bordered                                             
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        pagination={this.state.pagination}
                    />
                </Card>


            </div>
        )
    }
}

export default BasicTable