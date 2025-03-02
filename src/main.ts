import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import router from './router'
import { Router } from 'vue-router'

declare global {
    interface Window {
        'microApp': any
        'micro-app-vue': any
        'eventCenterForAppNameVite': any
        '__MICRO_APP_NAME__': string
        '__MICRO_APP_BASE_ROUTE__': string
        '__MICRO_APP_ENVIRONMENT__': string
        '__MICRO_APP_BASE_APPLICATION__': string
    }
}

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

let app: any = null

// // 独立运行时
// if (!window.__MICRO_APP_ENVIRONMENT__) {
//     render()
// }
// render()
// 作为子应用被加载时
export const mount = () => {
    render()
    window.console.log('子应用已挂载')
}

export const unmount = () => {
    app?.unmount()
    app = null
    window.console.log('子应用已卸载')
}

function render() {
    const app = createApp(App)
    app.use(router)
    console.log(12, 11)
    handleMicroData(router)
    const pinia = createPinia()
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
    app.mount('#vue-app')
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
    window['micro-app-vue'] = { mount, unmount }
} else {
    // 非微前端环境直接渲染
    mount()
}
