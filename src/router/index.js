import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Index from '../views/Index.vue'
// import Cy from '../views/CY'
// import Exb from  '../views/index/exbList'
// import Metasploit from  '../views/index/metasploitList'
// import Cnnvd from  '../views/index/cnnvdList'
// import Cwe from  '../views/index/cwe'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     redirect: '/'
    // },
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/bg',
        name: 'Home',
        component: Home,
        children: [{
                path: "/cve",
                name: "cve",
                meta: {
                    title: 'cve'
                },
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard" */
                        "../views/index/cveList")
            },
            {
                path: "/exb",
                name: "exb",
                meta: {
                    title: 'exb'
                },
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard" */
                        "../views/index/exbList")
            }, {
                path: "/metasploit",
                name: "metasploit",
                meta: {
                    title: 'metasploit'
                },
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard" */
                        "../views/index/metasploitList")
            }, {
                path: "/cnnvd",
                name: "cnnvd",
                meta: {
                    title: 'cnnvd'
                },
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard" */
                        "../views/index/cnnvdList")
            }
        ]
    },
    {
        path: '/vuldetails/:id/:type',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router