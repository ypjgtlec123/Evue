import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
// 快捷键监听
// import { shortCutService } from './assets/js/short-cut.service.js';
// 网络请求
import {ProxyService} from './assets/js/proxy.service.ts';

// common-css
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public.less';

// 设置变量
Vue.use(ElementUI);
Vue.prototype.$http      = ProxyService
Vue.prototype.$baseUrl   = process.env.VUE_APP_PROXY

// let mainVue = new Vue({
//     components : {App},
//     template : '<App/>',
//     router,
//     // store
// }).$mount('#app')


// 初始化
let newVue = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')