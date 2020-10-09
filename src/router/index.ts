import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path      : '/',
        name      : 'Home',
        component : Home
    },
    {
        path      : '/dashboard',
        name      : 'Dashboard',
        component : () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard.vue'),
        children  : [
            {
                props       : true,
                path        : '/history/:id',
                name        : 'History',
                component   : () => import(/* webpackChunkName: "dashboard" */ '../components/dashboard/consoleArea.vue'),
            }
        ],
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
