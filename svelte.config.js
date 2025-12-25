import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';

const isVercel = process.env.VERCEL === '1';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Switch adapter based on environment
		adapter: isVercel ? adapterVercel({ runtime: 'nodejs20.x' }) : adapterNode()
	}, 
	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events') return
		handler(warning)
	  },
};

export default config;