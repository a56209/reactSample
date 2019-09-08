import { Card, Button, Modal, Form, Select, Input, Tree, Transfer } from 'antd';
import React, { Component } from 'react'
import axios from '../../axios/index'
import ETable from '../../components/ETable/index'
import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'


const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
// 或者 const {TreeNode} = Tree;



export default class PermissionUser extends Component {

    state = {
        isRoleVisible: false
    }

    componentWillMount() {
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/role/list', {}, true);
    }

    // 打开创建角色弹框
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    handleRoleSubmit = () => {
        const data = this.RoleForm.props.form.getFieldsValue();
        console.log(data);
        axios.ajax({
            url: "/role/create",
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.RoleForm.props.form.resetFields();
                this.requestList();
            }
        });
    }

    handlePermission = () => {
        // 取出当前选中项
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '温馨提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPerVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    handlePermEditSubmit = () => {
        // 获取表单的值，添加wrappedComponentRef属性
        let data = this.PermForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id; //角色ID
        data.menus = this.state.menuInfo;

        //数据传入接口
        axios.ajax({
            url: "permission/edit",
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isPerVisible: false  //关闭页面
                })
                this.requestList() // 刷新列表
            }
        })
    }

    // 用户授权
    handleUserAuth = () => {
        // 取出当前选中项
        let item = this.state.selectedItem;
        // 判断有无选择用户，无用户的话，无法授权
        if (!item) {
            Modal.info({
                title: '温馨提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isUserVisible: true,
            detailInfo: item
        })

        this.getRoleUserList(item.id)
    }

    // 获取有该角色的用户列表
    getRoleUserList = (id) => {
        axios.ajax({
            url: "/role/user_list",
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if (res) {
                // 请求成功，筛选目标用户
                this.getAuthUserList(res.result);
            }
        })
    }

    // 筛选目标客户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        // 判断有数据
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }

                // status是1，为目标客户，放入targetKey数据
                if (data.status == 1) {
                    targetKeys.push(data.key)
                }
                mockData.push(data);

            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }

    // 用户授权提交
    handleUserSubmit = () => {
        let data = {}
        data.user_ids = this.state.targetKeys;
        data.role = this.state.selectedItem.id;
        axios.ajax({
            url: '/role/user_role_edit',
            data: {
                params: {
                    ...data  //user_ids[]=6&user_ids[]=4&role=3
                }
            }
        }).then((res) => {
            this.setState({
                isUserVisible: false
            })
            this.requestList();
        })
    }
    render() {
        const columns = [
            {
                title: "角色ID",
                dataIndex: "id"
            },
            {
                title: "角色名称",
                dataIndex: "role_name"
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                render: Utils.formateDate,
                width: 180
            },
            {
                title: "使用状态",
                dataIndex: "status",
                render(status) {
                    return status == 1 ? "停用" : "启用";
                }
            },
            {
                title: "授权时间",
                dataIndex: "authorize_time",
                render: Utils.formateDate,
                width: 180
            },
            {
                title: "授权人",
                dataIndex: "authorize_user_name"
            }
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{ marginLeft: 20, marginRight: 20 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>

                    <div className="content-wrap">
                        <ETable
                            dataSource={this.state.list}
                            columns={columns}
                            selectedItem={this.state.selectedItem}
                            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                            selectedRowKeys={this.state.selectedRowKeys}
                        />
                    </div>
                </Card>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.setState({
                            isRoleVisible: false
                        });
                        // 表单重置
                        this.RoleForm.props.form.resetFields();
                    }}
                >
                    <RoleForm
                        wrappedComponentRef={(inst) => {
                            this.RoleForm = inst
                        }}
                    />
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.isPerVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPerVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={(inst) => {
                            this.PermForm = inst
                        }}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        // 接收子组件数据 React单向流通，只能父组件流向子组件
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    width={600}
                    visible={this.state.isUserVisible}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => {
                            this.userAuthForm = inst
                        }}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys) => {
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}


// 子组件1：角色绑定
class RoleForm extends Component {
    render() {
        const formItemLayout = {
            lableCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator("role_name")(
                        <Input type="text" placeholder="请输入角色名称" />
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("state")(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={2}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm);

// 子组件2：设置权限
class PermEditForm extends Component {
    onCheck = (checkedKeys) => {
        // 将当前选中的项传回父组件 PermEditForm
        this.props.patchMenuInfo(checkedKeys);
    }
    // 递归渲染权限列表
    /**
     *
     * @param data menuConfig.js 导入的权限列表
     */
    renderTreeNodes = (data) => {
        // 判断当前是否有子节点,如果有子节点children继续遍历,直到没有子节点为止
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key} />
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const { getFieldDecorator } = this.props.form;
        const detail_info = this.props.detailInfo;
        const menu_info = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator("status", {
                        initialValue: detail_info.status + ''
                    })(
                        <Select>
                            <Option value="0">启用</Option>
                            <Option value="1">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable  //复选框
                    defaultExpandAll  //全部展开
                    onCheck={(checkedKeys) => {
                        // checkedKeys:当前选中的节点
                        this.onCheck(checkedKeys)

                    }}
                    checkedKeys={menu_info}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermEditForm = Form.create({})(PermEditForm);

// 子组件3：用户授权
class RoleAuthForm extends Component {
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1
    }

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        const detail_info = this.props.detailInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name} />
                </FormItem>

                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 170, height: 400 }}
                        dataSource={this.props.mockData}
                        titles={["待选用户", "已选用户"]}
                        showSearch
                        
                        locale={{itemUnit: '项', itemsUnit: '项',searchPlaceholder:"请输入用户名"}}
                        filterOption={this.filterOption}  // 过滤选项
                        targetKeys={this.props.targetKeys}  // 目标数据源
                        onChange={this.handleChange}
                        render={item => item.title}
                        
                    />
                </FormItem>
            </Form>

        )
    }
}

RoleAuthForm = Form.create({})(RoleAuthForm);