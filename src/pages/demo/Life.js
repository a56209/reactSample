import React, { Component } from 'react'
import Child from './Child'
import './index.less'
import {Button} from 'antd'
//import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class Life extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         count: 0
    //     }
    // }

    state = {
        count:0
    }

    render() {
        
        return <div className="content">
            <p>React生命周期介绍</p>
            <Button onClick={this.handleAdd}>AntD点击一下</Button>
            <button onClick={this.handleClick.bind(this)}>点击一下</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count} ></Child>
        </div>
    }

    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleClick(){
        this.setState({
            count:this.state.count + 1
        })
    }


}

export default Life