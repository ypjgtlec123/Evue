import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

let mainVue = new Vue({
    components : {App},
    template : '<App/>',
    router,
    store
}).$mount('#app')