import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd';

export default class Modals extends Component {
    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>

                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal title="React" visible={this.state.showModal1} onCancel={()=>{
                    this.setState({
                        showModal1:false
                    })
                }}>
                    <p>欢迎学习React课程</p>
                </Modal>

                <Modal title="React" 
                visible={this.state.showModal2} 
                okText="好的"
                cancelText = "算了"
                onCancel={()=>{
                    this.setState({
                        showModal2:false
                    })
                }}>
                    <p>欢迎学习React课程</p>
                </Modal>
            </div>
        )
    }

    handleOpen = (type) =>{
        this.setState({
            [type]:true
        })
    }

    handleConfirm = (type) =>{
        Modal[type]({
            title:"确认？",
            content:'你确认要进行该操作吗？',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }
}