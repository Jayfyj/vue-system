import Mock from 'mockjs'

const data = [
  { url: '/devModelFile', text: '开发说明和方式' },
  { url: '/textAlignPage', text: '字体位置' },
  { url: '/vuexDomePage', text: 'vuex使用例子' },
  { url: '/dragPage', text: '拖拽排列' },
  { url: '/remberScrollPage', text: '记录滚动' },
  { url: '/fullPage', text: '全屏滚动切换' },
  { url: '/chooseAllPage', text: '全选和反选例子' },
  { url: '/directivesPage', text: '指令页面' },
  { url: '/echartsPage', text: 'echarts页面' },


]

Mock.setup({
  timeout: '1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

Mock.mock(RegExp('/server/homeMenu' + '.*'), 'get', (options) => {
  console.log(options)
  return Mock.mock({ data, code: '0000' })
})

export default Mock
