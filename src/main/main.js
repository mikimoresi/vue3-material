import { createSSRApp, watch } from 'vue'

import App from '@/main/App.vue' 

export async function createApp(url) {

  const app = createSSRApp(App)

	return new Promise((resolve) => {
		resolve({ app });
	});
	

  
}
