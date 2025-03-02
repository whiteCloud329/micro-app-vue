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
    base: '/vue/',
    server: {
        port: 3000,
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
