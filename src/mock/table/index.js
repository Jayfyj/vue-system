import Mock from 'mockjs'

const data=
{
    "list": [
        {
            "id": 1,
            "edit":true,
            "name": "张三",
            "money": 123,
            "address": "广东省东莞市长安镇",
            "state": "成功",
            "date": "2019-11-1",
            "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
            "id": 2,
            "name": "李四",
            "money": 456,
            "address": "广东省广州市白云区",
            "state": "成功",
            "date": "2019-10-11",
            "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
        },
        {
            "id": 3,
            "name": "王五",
            "money": 789,
            "address": "湖南省长沙市",
            "state": "失败",
            "date": "2019-11-11",
            "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
        },
        {
            "id": 4,
            "name": "赵六",
            "money": 1011,
            "address": "福建省厦门市鼓浪屿",
            "state": "成功",
            "date": "2019-10-20",
            "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
        },
        {
            "id": 5,
            "edit":true,
            "name": "张三",
            "money": 123,
            "address": "广东省东莞市长安镇",
            "state": "成功",
            "date": "2019-11-1",
            "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
            "id": 6,
            "name": "李四",
            "money": 456,
            "address": "广东省广州市白云区",
            "state": "成功",
            "date": "2019-10-11",
            "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
        },
        {
            "id": 7,
            "name": "王五",
            "money": 789,
            "address": "湖南省长沙市",
            "state": "失败",
            "date": "2019-11-11",
            "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
        },
        {
            "id": 8,
            "name": "赵六",
            "money": 1011,
            "address": "福建省厦门市鼓浪屿",
            "state": "成功",
            "date": "2019-10-20",
            "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
        },
        {
            "id": 9,
            "edit":true,
            "name": "张三",
            "money": 123,
            "address": "广东省东莞市长安镇",
            "state": "成功",
            "date": "2019-11-1",
            "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
        },
        {
            "id": 10,
            "name": "李四",
            "money": 456,
            "address": "广东省广州市白云区",
            "state": "成功",
            "date": "2019-10-11",
            "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
        }
    ],
    "pageTotal": 12
};

Mock.setup({
    timeout: '1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})
 
Mock.mock(RegExp("/server/table" + ".*"), 'get', (options)=>{
  // console.log(options)
  return Mock.mock({ data, code: '0000' })
})

export default Mock;