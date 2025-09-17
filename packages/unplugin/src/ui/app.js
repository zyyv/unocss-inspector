// Auto-injected Inspector component
import Inspector from '@unocss-inspector/dist/inspector.js'
import { createApp, h } from 'vue'
import '@unocss-inspector/dist/inspector.css'

// Function to initialize the inspector
function initializeInspector() {
  // Check if inspector is already initialized
  if (document.querySelector('#unocss-inspector-root')) {
    return
  }

  // Create a container for the inspector
  const container = document.createElement('div')
  container.id = 'unocss-inspector-root'
  document.body.appendChild(container)

  // Create Vue app instance with the Inspector
  const app = createApp({
    setup() {
      return () => h(Inspector, {
        // Default configuration - can be customized via plugin options
        modelValue: null,
        panels: [],
      })
    },
  })

  // Mount the inspector
  app.mount(container)
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInspector)
}
else {
  initializeInspector()
}
