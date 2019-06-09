import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
    render() {
        return (

            <div>
                <ul>
                    <li>
                        <Link to="/">Home1</Link>
                    </li>
                    <li>
                        <Link to="/about">About1</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics1</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}

            </div>

        )
    }
}