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
    }
}