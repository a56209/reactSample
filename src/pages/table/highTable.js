import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios'

class HighTable extends Component {
    state = {};
    params={
        page:1
    }

    componentDidMount(){
        this.request()
    }

    //动态获取mock数据
    request = () => {        

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
                    dataSource: res.result.list,                    
                })
            }
        })
    }

    render() {
        const columns1 = [
            {
              title: 'id',
              key: 'id',
              width: 80,
              dataIndex: 'id'
            },
            {
              title: '用户名',
              key: 'userName',
              width: 80,
              dataIndex: 'userName'
            },
            {
              title: '性别',
              key: 'sex',
              width: 80,
              dataIndex: 'sex',
              render(sex) {
                return sex == 1 ? '男' : '女'
              }
            },
            {
              title: '状态',
              width: 80,
              dataIndex: 'state',
              render(state) {
                let config = {
                  '1': '咸🐟一条',
                  '2': '风华浪子',
                  '3': '北大才子一枚',
                  '4': '百度FE',
                  '5': '创业者',
                };
                return config[state];
              }
            },
            {
              title: '爱好',
              key: 'interest',
              width: 80,
              dataIndex: 'interest',
              render(abc) {
                let config = {
                  '1': '🏊‍',
                  '2': '🏀',
                  '3': '⚽',
                  '4': '🏃',
                  '5': '🏔',
                  '6': '🚴',
                  '7': '🎱',
                  '8': '🎤',
                };
                return config[abc];
              }
            },
            {
              title: '生日',
              key: 'birthday',
              width: 120,
              dataIndex: 'birthday'
            },
            {
              title: '地址',
              key: 'address',
              width: 120,
              dataIndex: 'address'
            },
            {
              title: '早起时间',
              key: 'time',
              width: 120,
              dataIndex: 'time'
            }
          ];
        return (
            <div>
                <Card title="头部固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns1}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}
                    />
                </Card>
            </div>
        )
    }

}

export default HighTable