import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm/index'
import ETable from '../../components/ETable';

export default class User extends Component {
    params = {
        page: 1
    }

    state = {}

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名称',
            width: 130
        }, {
            type: 'INPUT',
            label: '用户手机号',
            field: 'user_mobile',
            placeholder: '请输入用户手机号',
            width: 140
        }, {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'uers_date',
            placeholder: '请输入日期'
        }
    ]

    // 处理表单查询
    handleFilter = (params) => {
        // 从子组件传来的值赋值给params
        this.params = params;
        this.requestList();

    }

    requestList = () => {
        axios.requestList(this, '/user/list', this.params, true);
    }



    render() {
        const columns = [
            {
              title: 'id',
              dataIndex: 'id'
            }, {
              title: '用户名',
              dataIndex: 'username'
            }, {
              title: '性别',
              dataIndex: 'sex',
              render(sex) {
                return sex == 1 ? '男' : '女';
              }
            }, {
              title: '状态',
              dataIndex: 'state',
              render(state) {
                let config = {
                  '1': "咸🐟一条",
                  '2': '风华浪子',
                  '3': '北大才子一枚',
                  '4': '百度FE',
                  '5': '创业者',
                };
                return config[state];
              }
            }, {
              title: '爱好',
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
            }, {
              title: '生日',
              dataIndex: 'birthday'
            }, {
              title: '联系地址',
              dataIndex: 'address'
            }, {
              title: '早起时间',
              dataIndex: 'time'
            },
          ];

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit = {this.handleFilter} />
                </Card>
                <Card>
                    
                </Card>
                <div className="content-wrap">
                    <ETable 
                        columns = {columns}
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        selectedItem = {this.state.selectedItem}
                        dataSource = {this.state.list}
                        pagination = {this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}