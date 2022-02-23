import Mock from 'mockjs'

const data=
{
    "list": [
        {
            "id": 11,
            "name": "王五",
            "money": 789,
            "address": "湖南省长沙市",
            "state": "失败",
            "date": "2019-11-11",
            "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
        },
        {
            "id": 12,
            "name": "赵六",
            "money": 1011,
            "address": "福建省厦门市鼓浪屿",
            "state": "成功",
            "date": "2019-10-20",
            "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
        }
    ],
    "pageTotal": 12
};

Mock.setup({
    timeout: '1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})
 
Mock.mock(RegExp("/server/tabjson" + ".*"), 'get', (options)=>{
  // console.log(options)
  return Mock.mock({ data, code: '0000' })
})

export default Mock;