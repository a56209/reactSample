import React, { Component } from 'react'
import { Row, Col } from 'antd';
import './index.less'
import Utils from '../../utils/utils.js'
import axios from '../../axios/index'

class Header extends Component {
    componentWillMount() {
        this.setState({
            userName: "蔡冲"
        })

        setInterval(() => {
            let sysTime = Utils.formateDate(new Date().getTime());

            this.setState({
                sysTime
            })
        }, 1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = '深圳';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            if (res.status == 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                })
            }
        })

    }

    render() {
        //取出menuType (父组件common.js传来) 用作二级导航
        const menuType = this.props.menuType
        console.log('菜单类型' + menuType);
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? (
                            <Col span="6" className="logo">
                                <img src="assets/logo-ant.svg" alt="" />
                                <span>A56209 通用页面模板</span>
                            </Col>
                        ) : (
                                <Col span={menuType ? 18 : 24}>
                                    <span>欢迎，{this.state.userName}</span>
                                    <a href="#">退出</a>
                                </Col>
                            )
                    }

                </Row>
                {
                    menuType ? '' :
                        (
                            <Row className="breadcrumb">
                                <Col span={4} className="breadcrumb-title">首页</Col>
                                <Col span={20} className="weather">
                                    <span className="date">{this.state.sysTime}</span>
                                    <span className="weather-img">
                                        <img src={this.state.dayPictureUrl} alt="" />
                                    </span>

                                    <span className="weather-detail">
                                        {this.state.weather}
                                    </span>
                                </Col>
                            </Row>
                        )
                }
            </div>
        )
    }
}

export default Header