import type { App } from 'vue'
import Inspector from './Inspector.vue'

export { Inspector }

export default {
  install: (app: App) => {
    app.component('Inspector', Inspector)
  },
}
