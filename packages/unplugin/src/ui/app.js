import Inspector from '@uno-inspect/inspector'
import { createApp, h } from 'vue'

function initializeInspector() {
  if (document.querySelector('#unocss-inspector-root')) {
    return
  }

  const container = document.createElement('div')
  container.id = 'unocss-inspector-root'
  document.body.appendChild(container)

  const app = createApp({
    setup() {
      return () => h(Inspector, {
        modelValue: null,
        panels: [],
      })
    },
  })

  app.mount(container)
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInspector)
}
else {
  initializeInspector()
}
