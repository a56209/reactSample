import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'
const FormItem = Form.Item;

class FormLogin extends Component {

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.userName} 恭喜通过本次表单验证，当前密码为:${userInfo.userPwd}`)
            }

        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{ marginTop: 10 }}>
                    <Form style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 5, max: 10,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            // pattern: /^\w+$/g,
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须为字母或数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码名不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码" type="password" />
                                )
                            }

                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue:true

                                })(
                                    <Checkbox>记住我</Checkbox>
                                )
                            }
                            <a href="#" style={{float:"right"}}>忘记密码</a>
                        </FormItem>


                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>

                    </Form>
                </Card>

            </div>
        )
    }


}

export default Form.create()(FormLogin);