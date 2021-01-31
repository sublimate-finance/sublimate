import {hookup} from 'named-logs-console'
import './service-worker-handler'
import App from './App.svelte'
import 'tailwindcss/tailwind.css'
import '../public/global.css'
import '../public/fonts/fonts.css'

hookup()

const app = new App({
	target: document.body,
})

export default app
