import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import router from './router'
import store from './store'
import {Lazyload} from 'vant'
import logo from './assets/logo.png'

// options 为可选参数，无则不传
Vue.use(Lazyload, {
    loading: logo,
    error: logo
});
router.beforeEach((to, from, next) => {
    next()
})
router.afterEach((to) => {
    document.title = to.meta.title ? to.meta.title : '豆瓣电影'
})

// import FastClick from 'fastclick'

// FastClick.attach(document.body);

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
