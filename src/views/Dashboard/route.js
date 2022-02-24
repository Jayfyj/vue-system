//路由配置（平常的路由配置）
/**
 * isFloatBtnShow:是否显示浮动按钮，现在的功能只有返回首页，
 * 
 * 
 */
export default [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./index'),
      meta: { title: '系统首页' }
    }
   ]