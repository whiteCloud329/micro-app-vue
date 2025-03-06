import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import * as process from 'process'

function pathResolver(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    base: '/sub-vue/',
    build: {
        target: 'esnext', // 确保代码支持 ES 模块
        modulePreload: true,
    },
    server: {
        port: 4001,
        headers: {
            'Access-Control-Allow-Origin': '*', // 允许跨域
        },
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src'),
            },
            {
                find: '_vi',
                replacement: pathResolver('/src/views'),
            },
        ],
    },
})
