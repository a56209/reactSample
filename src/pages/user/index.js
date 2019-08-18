import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm/index'

export default class User extends Component {
    params = {
        page: 1
    }
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
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit = {this.handleFilter} />
                </Card>
            </div>
        )
    }
}