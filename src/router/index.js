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
            // 设置二级路由直接定位到相关页面
            redirect:'/home/index',
            component:()=>import('@/views/Home'),
            children:[
                // 测试页面
                {
                   path:'details',
                   name:'Details',
                   component:()=>import('@/views/details'),
                },
                // 数据分析
                {
                   path:'index',
                   name:'Index',
                   component:()=>import('@/views/index'),
                },
                // 订单管理
                {
                   path:'order',
                   name:'Order',
                   component:()=>import('@/views/order'),
                },
                // 菜品管理
                {
                   path:'dishes',
                   name:'Dishes',
                   component:()=>import('@/views/dishes'),
                },
                // 菜品类目
                {
                   path:'category',
                   name:'Category',
                   component:()=>import('@/views/category'),
                },
                // 桌号管理
                {
                   path:'Tables',
                   name:'Tables',
                   component:()=>import('@/views/tables'),
                },
                // 店铺设置
                {
                   path:'set-up',
                   name:'Set-up',
                   component:()=>import('@/views/set-up'),
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