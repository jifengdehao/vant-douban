import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Hot from '../pages/hot'
import Setting from '../pages/setting'
import Detail from '../pages/detail'
import Top250 from '../pages/top250'
import usRang from '../pages/us-rang'
import Performer from '../pages/performer'
import VFooter from '../components/v-footer'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: VFooter,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                    meta: {
                        title: '热映',
                        keepAlive: true
                    }
                },
                {
                    path: '/hot',
                    name: 'hot',
                    component: Hot,
                    meta: {
                        title: '榜单',
                        keepAlive: true
                    }
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: Setting,
                    meta: {
                        title: '设置',
                        keepAlive: true
                    }
                }
            ]
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: Detail,
            meta: {
                title: '电影详情',
                keepAlive: false
            }
        },
        {
            path: '/top-250',
            name: 'top-250',
            component: Top250,
            meta:{
                title: 'top250',
                keepAlive: true
            }
        },
        {
            path: '/us-rang',
            name: 'us-rang',
            component: usRang,
            meta:{
                title: '北美票房',
                keepAlive: true
            }
        },
        {
            path: '/performer/:id',
            name: 'performer',
            component: Performer,
            meta:{
                title: '演员',
                keepAlive: false
            }
        }
    ]
})
