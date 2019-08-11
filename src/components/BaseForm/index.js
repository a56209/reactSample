import React, { Component } from 'react';
import { Input, Form, Select } from 'antd';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class FilterForm extends Component {

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList; //从父组件Order.js中获取该对象进行使用
        const formItemList = [];

        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || ''; //默认给空字符串
                let placeholder = item.placeholder;
                let width = item.width;

                if (item.type == 'SELECT') {
                    const city = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator('[field]', {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList([{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '3', name: '天津' }, { id: '4', name: '杭州' }])}
                                </Select>
                            )
                        }
                    </FormItem>
                }
            });
        }
    }

    render() {
        return (<Form></Form>)
    }

}

export default Form.create({})(FilterForm);