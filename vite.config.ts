import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgrPlugin from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: {
                // icon: true,
                // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                // modifyVars: {
                //     dark: true,
                //     'primary-color': '#1cbda3',
                //     // 'primary-color': colors.primary,
                //     // 'border-radius-base': '5px',
                // },
            },
        },
    },
    root: path.resolve('test'),
})
