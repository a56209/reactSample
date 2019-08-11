import {Select} from 'antd';
const Option = Select.Option;

export default {
    formateDate(time) {
        function checkTime(time) {
            return time < 10 ? "0" + time : time
        }
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + checkTime(date.getMonth() + 1) +
            '-' + checkTime(date.getDate()) + ' ' +
            checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
    },

    //封装pagination公共机制
    pagination(data,callback){
        let page = {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条记录，当前为第${data.result.page}页`
            },
            showQuickJumper:true
        }
        return page
    },

    // 封装Option 外层接收data
    getOptionList(data){
        if (data){
            return []
        }

        let options = [];
        data.map((item)=>{
            // 在options中添加option对象
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    }
}