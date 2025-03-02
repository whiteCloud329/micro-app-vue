import { createRouter, createWebHistory } from 'vue-router'

// const {
//     __MICRO_APP_BASE_ROUTE__,
//     __MICRO_APP_ENVIRONMENT__,
//     addEventListener,
// } = window

const router = createRouter({
    history: createWebHistory(window?.__MICRO_APP_BASE_ROUTE__ || '/vue/'),
    routes: [
        {
            path: '/',
            redirect: '/home', // 处理根路径重定向
        },
        {
            path: '/home',
            name: 'HomeView',
            component: () => import('@/views/Home.vue'),
        },
        {
            path: '/demo',
            name: 'DemoView',
            component: () => import('@/views/demo.vue'),
        },
    ],
})

// // 监听基座应用数据变化
// if (window.__MICRO_APP_ENVIRONMENT__) {
//     window.addEventListener('microparent', () => {
//         window.console.log(window.__MICRO_APP_BASE_ROUTE__, 'vue')
//         router.replace(window.__MICRO_APP_BASE_ROUTE__)
//     })
// }
export default router
