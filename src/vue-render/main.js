import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

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