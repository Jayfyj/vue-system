//路由配置（平常的路由配置）
/**
 * isFloatBtnShow:是否显示浮动按钮，现在的功能只有返回首页，
 * 
 * 
 */
export default [
    {
      path: '/wangeditor',
      name: 'Wangeditor',
      component: () => import('./index'),
      meta: {
        keepAlive: false,
        title:'Wangeditor富文本'
        // isFloatBtnShow:true
      }
    }
  ]