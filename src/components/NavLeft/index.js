import React, { Component } from 'react'
import MenuConfig from './../../config/menuConfig'
import './index.less'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavLeft extends Component {
    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }

    //菜单渲染（箭头函数 ）
    renderMenu = (data) => {
        return data.map(
            (itme) => {
                if (itme.children) {
                    return (<SubMenu key={itme.key} title={itme.title}>
                        {this.renderMenu(itme.children)}
                    </SubMenu>)

                }
            return (<Menu.Item title={itme.title} key={itme.key}>{itme.title}</Menu.Item>)
            }
        )
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""></img>
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark">
                    {this.state.menuTreeNode}
                </Menu>                
            </div>
        )
    }
}

export default NavLeft