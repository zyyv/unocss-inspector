import UnoInspector from '@uno-inspect/inspector'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@uno-inspect/inspector/index.css'

createApp(App).use(UnoInspector).mount('#app')
