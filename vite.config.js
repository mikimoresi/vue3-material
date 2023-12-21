import path from 'node:path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

const base = '/'

export default defineConfig(({ command, ssrBuild }) => ({
  base,
	resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
			"@localconfig": path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    vuePlugin(),
    
  ],
 
  build: {
    minify: true,
		target: 'esnext'
  },
  
}))
