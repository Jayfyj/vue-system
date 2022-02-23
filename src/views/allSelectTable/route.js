//路由配置（平常的路由配置）
/**
 * 
 * 
 */
 export default [
    {
      path: '/allSelectTable',
      name: 'allSelectTable',
      component: () => import('./index'),
      meta: {
        keepAlive: false,
        title:'全选数据表格'
      }
    }
  ]