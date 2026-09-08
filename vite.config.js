import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
      host: true,          // bind to 0.0.0.0 so LAN devices can reach the dev server
      allowedHosts: [
        'codedelight.jami.ltd',
        'compiler.jami.ltd'  // kept for backwards compatibility
      ]
    },
    // Used by `npm run preview` to serve the production build (dist/) on the
    // same port nginx proxies to — no dev server / source / HMR exposed.
    preview: {
      host: true,
      port: 4000,
      strictPort: true,
      allowedHosts: ['codedelight.jami.ltd', 'compiler.jami.ltd']
    }
})
