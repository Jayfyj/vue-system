//路由配置（平常的路由配置）
/**
 * isFloatBtnShow:是否显示浮动按钮，现在的功能只有返回首页，
 * 
 * 
 */
export default [
    {
      path: '/devModelFile',
      name: 'devModelFile',
      component: () => import('./index'),
      meta: {
        keepAlive: false,
        title:'开发说明和方式'
        // isFloatBtnShow:true
      }
    }
  ]