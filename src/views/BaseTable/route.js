//路由配置（平常的路由配置）
/**
 * 
 * 
 */
export default [
  {
      path: '/table',
      name:'BaseTable',
      component: () => import('./index'),
      meta: { title: '基础表格' }
  },
  ]