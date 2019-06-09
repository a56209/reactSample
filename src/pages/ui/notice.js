import React, { Component } from 'react'
import { Card, Button,notification } from 'antd'
import { from } from 'rxjs';

export default class Notice extends Component {
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification("success")}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification("info")}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification("warning")}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification("error")}>Error</Button>
                    
                </Card>
                <Card title="通知提醒框-方向控制" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification("success", "topLeft")}>Success-TopLeft</Button>
                    <Button type="primary" onClick={() => this.openNotification("info", "topRight")}>Info-TopRight</Button>
                    <Button type="primary" onClick={() => this.openNotification("warning", "bottomLeft")}>Warning-BottomLeft</Button>
                    <Button type="primary" onClick={() => this.openNotification("error", "bottomRight")}>Error-BottomRight</Button>
                </Card>
            </div>
        )
    }

    openNotification = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            })
        }


        notification[type]({
            message: "发工资了",
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        })
    }
}