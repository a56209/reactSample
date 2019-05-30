import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header'
import Foot from './components/Footer'
import NavLeft from './components/NavLeft';
import Home from './pages/home'
import './style/common.less'

class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span={3} className="nav-left">
                    <NavLeft></NavLeft>
                </Col>
                <Col span={21} className="main">
                    <Header></Header>
                    <Row className="content">
                        <Home></Home>
                    </Row>
                    <Foot></Foot>
                </Col>
            </Row>
        );
    }
}

export default Admin

