import Mock from 'mockjs'

const data={ 
    name:"jay",
    age:"18",
    sex:"男",
    job:"码农"
};

Mock.setup({
    timeout: '600-50000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})
 
Mock.mock(RegExp("/server/user" + ".*"), "get", (options)=>{
  console.log(options)
  return Mock.mock({data,code:"0000"});
})

export default Mock;