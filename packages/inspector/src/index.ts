import type { App } from 'vue'
import FormControl from './components/basic/FormControl.vue'
import FormControlGroup from './components/basic/FormControlGroup.vue'
import Select from './components/basic/Select.vue'
import Inspector from './Inspector.vue'

export { FormControl, FormControlGroup, Inspector, Select }
export * from './composables/exports'
export * from './types'

export default {
  install: (app: App) => {
    app.component('Inspector', Inspector)
    app.component('FormControl', FormControl)
    app.component('FormControlGroup', FormControlGroup)
  },
}
