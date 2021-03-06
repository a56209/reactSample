import React, { Component } from 'react'
import { Card, Button, Spin, Icon, Alert } from 'antd'
import './ui.less'

export default class Loadings extends Component {
    render() {
        const icon = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div>
                <Card title="Spin" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{ margin: '0 10px' }} />
                    <Spin size="large" />
                    <Spin indicator={icon} style={{ marginLeft: 10 }} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎学习React"
                            type="info"
                        />
                    </Spin>
                </Card>

            </div>
        )
    }
}