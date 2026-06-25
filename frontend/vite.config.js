
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import chalk from 'chalk'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    {
      name: 'custom-startup-message',
      configureServer() {
        setTimeout(() => {
            console.log("client running....");
        }, 300)
      }
    }

  ],
  server: {
    port: 4154,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'cc444de18062.ngrok-free.app', // 👈 add your ngrok domain here
    ],
  },
  
})
