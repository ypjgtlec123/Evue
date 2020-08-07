import Vue from 'vue';
import App from './App';

let mainVue = new Vue({
    components : {App},
    template : '<App/>'
}).$mount('#app')