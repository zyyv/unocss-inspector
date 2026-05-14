import { createApp, h } from 'vue'

async function initializeInspector() {
  if (document.querySelector('#unocss-inspector-root')) {
    return
  }

  globalThis.__UNOCSS_INSPECTOR_HOT__ = import.meta.hot

  const { Inspector } = await import('@uno-inspect/inspector')

  const container = document.createElement('div')
  container.id = 'unocss-inspector-root'
  document.body.appendChild(container)

  const app = createApp({
    setup() {
      return () => h(Inspector, {
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
