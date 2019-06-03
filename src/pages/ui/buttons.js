import React, { Component } from 'react'
import {Card, Button} from 'antd'
import './ui.less'

export default class Buttons extends Component {
    render() {
        return (
            <div>
                <Card title ="基础按钮" className="card-wrap">
                    <Button type="primary">顺欣同创</Button>
                    <Button >顺欣同创</Button>
                    <Button type="dashed">顺欣同创</Button>
                    <Button type="danger">顺欣同创</Button>
                    <Button disabled>顺欣同创</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
            </div>
        );
    }
}