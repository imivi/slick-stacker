import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),

    // https://github.com/vbenjs/vite-plugin-compression#options
    viteCompression({
      deleteOriginFile: true,
    }),
  ],
})
