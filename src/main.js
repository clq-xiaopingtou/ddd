import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'



const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


// 懒加载配置代码
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // loading: "https://2url.cc/1OwrB",

  loading: "/a/vlazy.svg"
});


// 实例化时间总线对象
Vue.prototype.eventBus = new Vue();



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
