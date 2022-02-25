import Mock from 'mockjs'

const data = {
  'menu':[
    {
      icon: 'el-icon-house',
      index: 'developModule',
      title: '开发说明和方式',
      subs: null
    },
    {
      icon: 'el-icon-house',
      index: 'dashboard',
      title: '系统首页',
      subs: null
    },
    {
      icon: 'el-icon-tickets',
      index: 'table',
      title: '基础表格',
      subs: null
    },
    {
      icon: 'el-icon-tickets',
      index: 'allSelectTable',
      title: '选中所有表格',
      subs: null
    },
    {
      icon: 'el-icon-tickets',
      index: 'wangeditor',
      title: 'Wangeditor富文本',
      subs: null
    },
    {
      icon: 'el-icon-tickets',
      index: 'formTest',
      title: '表单测试',
      subs: null
    },
    {
      icon: 'el-icon-s-grid',
      index: 'tabs',
      title: 'tab选项卡',
      subs: null
    },
    {
      icon: 'el-icon-rank',
      index: '3',
      title: '表单相关',
      subs: [
        {
          index: 'form',
          title: '基本表单',
          subs: null
        },
        {
          index: '3-2',
          title: '三级菜单',
          subs: [
            {
              index: 'editor',
              title: '富文本编辑器',
              subs: null
            },
            {
              index: 'markdown',
              title: 'markdown编辑器',
              subs: null
            }
          ]
        },
        {
          index: 'upload',
          title: '文件上传',
          subs: null
        }
      ]
    },
    {
      icon: 'el-icon-magic-stick',
      index: 'icon',
      title: '自定义图标',
      subs: null
    },
    {
      icon: 'el-icon-pie-chart',
      index: 'charts',
      title: 'schart图表',
      subs: null
    },
    {
      icon: 'el-icon-rank',
      index: '6',
      title: '拖拽组件',
      subs: [
        {
          index: 'drag',
          title: '拖拽列表',
          subs: null
        },
        {
          index: 'dialog',
          title: '拖拽弹框',
          subs: null
        }
      ]
    },
    {
      icon: 'el-icon-rank',
      index: 'i18n',
      title: '国际化功能',
      subs: null
    },
    {
      icon: 'el-icon-rank',
      index: '7',
      title: '错误处理',
      subs: [
        {
          index: 'permission',
          title: '权限测试',
          subs: null
        },
        {
          index: '404',
          title: '404页面',
          subs: null
        }
      ]
    },
    {
      icon: 'el-icon-rank',
      index: '/donate',
      title: '支持作者',
      subs: null
    },
    {
      icon: 'el-icon-rank',
      index: '/tinymec',
      title: 'tinymec富文本',
      subs: null
    }
  ]
}

Mock.setup({
  timeout: '1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

Mock.mock(RegExp('/server/menu' + '.*'), 'get', (options) => {
  console.log(options)
  return Mock.mock({ data, code: '0000' })
})

export default Mock
