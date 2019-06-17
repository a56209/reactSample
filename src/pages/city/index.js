import React, { Component } from 'react'
import { Card, Form, Select, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

export default class City extends Component {
    render() {
        return (
            <div>
                城市管理页面
                <Card>
                    <FilterForm />
                </Card>
                <Card>
                    <Button type="primary">开通城市</Button>
                </Card>
            </div>
        )
    }
}

class FilterForm extends Component {
    render() {
        const { getFileDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        // getFileDecorator('city_id')(
                        <Select placeholder='全部' style={{width:100}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>北京</Option>
                            <Option value='2'>上海</Option>
                            <Option value='3'>深圳</Option>
                        </Select>
                        // )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        // getFieldDecorator('mode')(
                        <Select style={{width:120}} placeholder="全部"

                        >
                            <Option value="">全部</Option>
                            <Option value="1">指定停车点模式</Option>
                            <Option value="2">禁停区模式</Option>
                        </Select>
                        // )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        <Select style={{width:80}} placeholder="全部">
                            <Option value="">全部</Option>
                            <Option value="1">自营</Option>
                            <Option value="2">加盟</Option>
                        </Select>
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        // getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        // )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary">查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form >
        )
    }
}
FilterForm = Form.create()(FilterForm);