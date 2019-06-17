import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

export default class Axios {
    static jsonp(options) {
        //使用Promise解决函数间的嵌套问题..链式调用
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                //to-do
                //传入JsoP的对象进行操作
                //如果返回的对象是成功,使用resolve方法进行返回
                //debugger;//通过这个打断点
                if (response.status == 'success') {//成功后  用resolve返回数据
                    resolve(response);
                } else {    //失败后用reject返回数据
                    reject(response.message);
                }
            })
        });

    }

    static ajax(options) {
        return new Promise((resolve, reject) => {
            let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.message
                        })
                    }
                } else {
                    reject(response)
                }
            })

        });
    }
}