import JsonP from 'jsonp'

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
}