import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
    cssCodeSplit: false, // Disables CSS code splitting
		minify: false,
  }
});
