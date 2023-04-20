import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors:true,
    proxy: {
      "/api":{
        target: "http://127.0.0.1:8000",
        changeOrigin:true,
        secure: false,
        // pathRewrite: { 
        //   '^/api':'/'
        // },
        rewrite: (path)=>path.replace(/^\/api/,"")
      }
      // "/api": 'http://127.0.0.1:8000/info'
    }
  }
})
