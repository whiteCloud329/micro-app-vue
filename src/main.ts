import { createApp, App as AppInstance } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, Pinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import routes from './router'
import {
    createRouter,
    createWebHistory,
    Router,
    RouterHistory,
} from 'vue-router'

declare global {
    interface Window {
        'microApp': any
        'vue-sub-app': any
        'micro-app-vue-sub-app': any
        'eventCenterForAppNameVite': any
        '__MICRO_APP_NAME__': string
        '__MICRO_APP_BASE_ROUTE__': string
        '__MICRO_APP_ENVIRONMENT__': string
        '__MICRO_APP_BASE_APPLICATION__': string
        '__VUE_DEVTOOLS_GLOBAL_HOOK__': any
    }
}
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = false

// 与基座进行数据交互
function handleMicroData(router: Router) {
    console.info('🚀 ~ file:main.ts method: line: -----', router)
    // 是否是微前端环境
    if (window.__MICRO_APP_ENVIRONMENT__) {
        // 主动获取基座下发的数据

        // 监听基座下发的数据变化
        window.microApp.addDataListener((data: Record<string, unknown>) => {
            window.console.log('child-vue3 addDataListener:', data)

            // 当基座下发path时进行跳转
            if (data.path && data.path !== router.currentRoute.value.path) {
                router.push(data.path)
            }
        })
        window.console.log(
            'child-vue3 getData:',
            window.microApp,
            window.microApp.getData(),
        )
        // 向基座发送数据
        setTimeout(() => {
            window.microApp.dispatch({ myname: 'child-vue3' })
        }, 3000)
    }
}

let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null
let pinia: Pinia | null = null

export const mount = () => {
    // render()
    // history = createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || '/')
    history = createWebHistory('/sub-vue')
    router = createRouter({
        history,
        routes,
    })
    app = createApp(App)
    app.use(router)
    pinia = createPinia()
    // 数据持久化
    pinia.use(piniaPluginPersistedState)
    // 因为状态管理使用的是setup的方式构建所以我们重写一个$reset并挂载到pinia中
    pinia.use(({ store }) => {
        const initialState = JSON.parse(JSON.stringify(store.$state))
        store.$reset = () => {
            store.$patch(initialState)
        }
    })
    app.use(pinia)
    app.mount('#sub-app')
    console.log('微应用child-vite渲染了')

    handleMicroData(router)
}

export const unmount = () => {
    app?.unmount()
    history?.destroy()
    // 卸载所有数据监听函数
    window.eventCenterForAppNameVite?.clearDataListener()
    app = null
    router = null
    history = null
    console.log('微应用child-vite卸载了')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_NAME__) {
    console.log('window', window)
    window[`micro-app-vue-sub-app`] = { mount, unmount }
} else {
    // 非微前端环境直接渲染
    mount()
}
