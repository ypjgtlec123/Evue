import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      redirect : '/hello-world'
    },
    // 监控列表
    {
      path : '/hello-world',
      name : 'helloWorld',
      component : require('@/components/hello-world').default
      // component : import('@/components/hello-world.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
