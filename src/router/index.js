import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Signin from '../components/Signin.vue'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        redirect: '/login'
    },
    {
        path: '/login',
        redirect: '/login/signin',
        component: Login,
        children: [{
                path: 'signin',
                component: Signin
            },
            {
                path: 'register',
                component: Register
            }
        ]
    },
    {
        path: '/home',
        component: Home,
        props: true
    },
    {
        path: '/home/:username',
        component: Home,
        props: true
    }
]

const router = new VueRouter({
    routes
})

//挂载路由导航
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login/signin' || to.path === '/login/register') return next();
//     //获取token
//     const tokenStr = window.sessionStorage.getItem('token');
//     if (!tokenStr) { return next('/login'); } else { next(); }
// })

export default router