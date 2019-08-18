import React, { Component } from 'react'
import { Table } from 'antd'
import './index.less'

export default class ETable extends Component {

    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection;

        if (rowSelection == 'checkbox') {
            // 复选
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {
                    // 避免重复添加，先查询有无记录,无则添加
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    // 重复则取反删除
                    selectedIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }

            } else {
                // 没有的话复制（第一次添加）
                selectedIds = [record.id];
                selectedRowKey = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || {},selectedIds);
        } else {
            // 单选
            let selectedRowKeys = [index];
            let selectItem = record;
            this.props.updateSelectedItem(selectedRowKeys, rocord)
        }
    }
    tableInit = () => {

        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys;
        // 当属性非false或者null时，说明没有单选或者复选列
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection == 'checkbox') {
            rowSelection.type = 'checkbox';
        } else {
            // 默认是单选
            row_selection = 'radio';
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? row_selection : null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        // 如果不是单选或者复选，直接返回就，不进入onRowClick事件
                        if (!row_selection) {
                            return;
                        }
                        this.onRowClick(record, index);
                    }
                }
            }

            }
        />
    }

    render() {
        return (<div>

        </div>);
    }
}