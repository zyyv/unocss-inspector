import Inspector from '@uno-inspect/inspector'
import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import './style.css'
import '@uno-inspect/inspector/css'

createApp(App).use(Inspector).mount('#app')
