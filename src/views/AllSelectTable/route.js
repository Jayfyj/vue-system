//路由配置（平常的路由配置）
/**
 * 
 * 
 */
 export default [
    {
      path: '/allSelectTable',
      name: 'AllSelectTable',
      component: () => import('./index'),
      meta: {
        title:'全选数据表格'
      }
    }
  ]