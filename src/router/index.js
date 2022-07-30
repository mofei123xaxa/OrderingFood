// 路由接口地址

import Vue from 'vue'
import VueRouter from 'vue-router';


// 使用router
Vue.use(VueRouter);

const router = new VueRouter({
    routes:[
        {
            path:'/login',
            name:'Login',
            component:()=>import('@/views/login'),
        },
        {
            path:'/home',
            name:'home',
            component:()=>import('@/views/Home'),
            children:[
                {
                   path:'details',
                   name:'Details',
                   component:()=>import('@/views/details'),
                }
            ]
        },
        {
            path:'/shopMessage',
            name:'shopMessage',
            component:()=>import('@/views/shopMessage')
        }
        ,
        // 项目运行以后默认定向登陆页面
        {
            path:'*',
            redirect:'/login'
        }
    ]
})
export default router