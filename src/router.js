import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Admin from './admin'
import Home from './pages/home/index'
import Buttons from './pages/ui/buttons'
import Nomatch from './pages/nomatch/index'
import Modals from './pages/ui/modals'

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/ui/buttons" component={Buttons} />
                                <Route path="/ui/modals" component={Modals} />
                                <Route component={Nomatch} />
                            </Switch>

                        </Admin>

                    } />
                    <Route path="/order/detail" component={Login} />
                </App>
            </HashRouter>
        )
    }
}