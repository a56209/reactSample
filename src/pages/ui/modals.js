import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd';

export default class Modals extends Component {
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary">Open</Button>
                    <Button type="primary">自定义页脚</Button>
                    <Button type="primary">顶部20px</Button>
                    <Button type="primary">水平垂直居中</Button>
                </Card>

                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary">Confirm</Button>
                    <Button type="primary">Info</Button>
                    <Button type="primary">Success</Button>
                    <Button type="primary">Error</Button>
                    <Button type="primary">Warning</Button>
                </Card>

                <Modal title="React" visible="true" onCancel={()=>{}}>
                    <p>欢迎学习React课程</p>
                </Modal>
            </div>
        )
    }
}