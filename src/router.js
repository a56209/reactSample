import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Admin from './admin'
import Common from './common'
import Home from './pages/home/index'
import Buttons from './pages/ui/buttons'
import Nomatch from './pages/nomatch/index'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Message from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import LoginForm from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import login from './pages/form/login';
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar/index'
import RichText from './pages/rich/index'

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/common" render={()=>{
                        return <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    }} 
                    />
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="admin/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route path="/ui/loadings" component={Loadings} />
                                <Route path="/ui/notification" component={Notice} />
                                <Route path="/ui/messages" component={Message} />
                                <Route path="/ui/tabs" component={Tabs} />
                                <Route path="/ui/gallery" component={Gallery} />
                                <Route path="/ui/carousel" component={Carousel} />
                                <Route path="/form/login" component={LoginForm} />
                                <Route path="/form/reg" component={FormRegister} />    
                                <Route path="/table/basic" component={BasicTable} />  
                                <Route path="/table/high" component={HighTable} />  
                                <Route path="/city" component={City} />                                        
                                <Route path="/order" component={Order} />                                        
                                <Route path="/user" component={User} />
                                <Route path="/bikeMap" component={BikeMap} />
                                <Route path="/charts/bar" component={Bar} />
                                <Route path="/rich" component={RichText} />
                                <Route component={Nomatch} />
                            </Switch>

                        </Admin>

                    } />
                    <Route path="/order/detail" component={Login} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}