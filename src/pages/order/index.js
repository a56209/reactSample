import React, { Component } from 'react'
import { Card, Form, Select, Button, Table, Modal, DatePicker, } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

export default class Order extends Component {
    state = {};
    params = {
        page: 1
    }

    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询',
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        },
    ]

    componentDidMount() {
        this.requestList()
    }
    //数据请求
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list: list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })

            })
        });
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectRowKeys: selectKey,
            selectedItem: record
        })

    }

    onSelectChange = (selectedRowKeys, selectedItem) => {
        const record = selectedItem[0];
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedItem: record
        })
    }

    openOrderDetial = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单'
            })
        }
        window.open(`/#/common/order/detail/${item.id}`);
        // window.location.href = `/#/common/order/detail/${item.id}`;
    }
    render() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                width: 100
            }, {
                title: '用户名',
                dataIndex: 'user_name'
            }, {
                title: '手机号',
                dataIndex: 'mobile'
            }, {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return (distance / 1000) + " " + "km";
                }
            }, {
                title: '行程时长',
                dataIndex: 'total_time'
            }, {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    return status == 1 ? '进行中' : '行程结束';
                }
            }, {
                title: '开始时间',
                dataIndex: 'start_time'
            }, {
                title: '结束时间',
                dataIndex: 'end_time'
            }, {
                title: '订单金额',
                dataIndex: 'total_fee'
            }, {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 5 }}>
                    <Button type="primary" onClick={this.openOrderDetial}>订单详情</Button>
                    <Button type="primary" style={{marginLeft:20}} >结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            }
                        }}
                    />
                </div>
            </div>
        )

    }
}

// 子组件：选择表单
class FilterForm extends Component {
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder='全部' style={{ width: 100 }}>
                                <Option value=''>全部</Option>
                                <Option value='1'>北京</Option>
                                <Option value='2'>上海</Option>
                                <Option value='3'>深圳</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker />
                        )
                    }
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select style={{ width: 80 }} placeholder="全部">
                                <Option value="0">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form >
        )
    }
}
FilterForm = Form.create({})(FilterForm);