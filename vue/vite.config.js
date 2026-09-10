import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({mode}) => {
  return {
	  base: mode === 'development' ? './' : '/',
	  plugins: [vue()],
	  build: {
	    outDir: './output',
	    emptyOutDir: true,
	    rollupOptions: {
	      input: {
		main: './index.html',
		notfound: './404.html'
	      },
	    },
	  },
  }
});
