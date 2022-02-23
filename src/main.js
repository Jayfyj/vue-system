import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入VueI18n
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//引入mock
const Mock = require('@/mock')

//引入图标样式
import './assets/css/icon.css';

//引入NProgress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

//引入过滤器
import './filter'

//引入自定义命令
import './directives'

//引入
import 'babel-polyfill'

//引入element
import './element'

//使用组合API
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

//引入moment
import moment from 'moment' //导入文件
Vue.prototype.$moment = moment //赋值使用

Vue.config.productionTip = false

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
      next('/login');
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin' ? next() : next('/403');
  } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
          Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
              confirmButtonText: '确定'
          });
      } else {
          next();
      }
  }
});

router.afterEach( ()=> {
  NProgress.done();
});


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
