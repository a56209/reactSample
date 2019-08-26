import React, { Component } from 'react'
import { Card, Button, Modal, Form, Radio, Select, Input, DatePicker } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm/index'
import ETable from '../../components/ETable';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;


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

    // 功能区操作
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if (type == 'create') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if (type == 'edit') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo: item
            })
        } else if (type == 'detail') {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: item
            })
        } else {
            if (!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                });
                return;
            }

            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中员工：' + item.username,
                onOk(){
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                          params: {
                            id: item.id
                          }
                        }
                      }).then(
                        (res) => {
                            if (res.code == 0) {
                              _this.setState({
                                isVisible: false,
                                // selectedRowKeys:'' // 点击删除,单选框失去焦点:  空: null ''   参考网址https://blog.csdn.net/oscar999/article/details/9353713
                              });
                              _this.requestList();
                            }
                          }
                      )

                }
            })
        }

    }

    // 创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        console.log(data)
        axios.ajax({
            url: type == 'create'?'/user/add':'/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
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

        let footer = {}
        if (this.state.type == 'detail') {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={() => this.handleOperate('detlete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo}
                        wrappedComponentRef={(inst) => this.userForm = inst} />



                </Modal>
            </div>
        )
    }
}


// 用户表单
class UserForm extends Component {

    getState = (state) => {
        let config = {
            '1': "咸🐟一条",
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者',
        };
        return config[state];
    }
    render() {
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名"  {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.username :
                            getFieldDecorator('user_name', {
                                initialValue: userInfo.username
                            })(
                                <Input type="text" placeholder="请输入用户名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator('sex', {
                                initialValue: userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state', {
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>咸🐟一条</Option>
                                    <Option value={2}>风华浪子</Option>
                                    <Option value={3}>北大才子一枚</Option>
                                    <Option value={4}>百度FE</Option>
                                    <Option value={5}>创业者</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker format="YYYY-MM-DD" />
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.address :
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址" />
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}

UserForm = Form.create({})(UserForm);