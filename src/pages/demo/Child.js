import React, { Component } from 'react'

class Child extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log('will mount')
    }

    componentDidMount() {
        console.log('did mount')
    }

    componentWillReceiveProps(newProps) {
        console.log('will props' + newProps.name)
    }

    shouldComponentUpdate() {
        console.log('should update')
        return true
    }

    componentWillUpdate() {
        console.log('will updae')
    }

    componentDidUpdate() {
        console.log('did update')
    }


    render() {
        return <div>
            <p>这里是子组件,子组件的生命周期</p>
            <p>{this.props.name}</p>
        </div>
    }
}

export default Child

