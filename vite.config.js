import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173, // you can replace this port with any port
    // https: false,
    // hmr: {
    //   host: "103.106.72.182",
    //   port: 5174,
    //   protocol: "wss",
    // },
    hmr: false
  }
})