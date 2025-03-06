const routes = [
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
]
export default routes
