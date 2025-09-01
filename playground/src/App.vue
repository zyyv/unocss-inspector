<script setup lang="ts">
import { ref } from 'vue'
import ElementSelector from '../../src/ElementSelector.vue'

const selectedElement = ref(null)

function onElementSelected(element: any) {
  console.log('选择了元素:', element)
}

const style = ref({
  display: 'flex',
})
</script>

<template>
  <div class="min-h-screen font-sans p-5 md:p-10">
    <ElementSelector
      v-model="selectedElement"
      @element-selected="onElementSelected"
    />
    <header class="text-center mb-10 text-white">
      <h1 class="text-4xl md:text-5xl mb-2.5 font-bold drop-shadow-lg">
        UnoCSS Inspector Demo
      </h1>
      <p class="text-lg opacity-90">
        Click the inspect button below to start element inspection
      </p>
    </header>

    <main max-w-4xl mx-auto flex flex-col gap-7.5>
      <div bg-white rounded-3xl p-5 md:p-7.5 shadow-2xl border border-white border-opacity-20>
        <h2 text-gray-800 mb-4 text-xl md:text-2xl font-semibold>
          Sample Card Component
        </h2>
        <p class="text-gray-600 leading-relaxed mb-5">
          This is a sample card with various styling properties. Hover over this element and inspect it to see the margin, padding, and other CSS properties.
        </p>
        <button class="px-5 py-2.5 border-0 rounded-md font-semibold cursor-pointer mr-2.5 mb-2 transition-all duration-300 ease-in-out bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5">
          Primary Button
        </button>
        <button class="px-5 py-2.5 border-0 rounded-md font-semibold cursor-pointer transition-all duration-300 ease-in-out bg-gray-600 text-white hover:bg-gray-700 hover:-translate-y-0.5">
          Secondary Button
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="bg-white p-7.5 rounded-2xl text-center font-semibold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1.25">
          Grid Item 1
        </div>
        <div class="bg-white p-7.5 rounded-2xl text-center font-semibold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1.25">
          Grid Item 2
        </div>
        <div class="bg-white p-7.5 rounded-2xl text-center font-semibold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1.25">
          Grid Item 3
        </div>
        <div class="bg-white p-7.5 rounded-2xl text-center font-semibold text-gray-800 shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1.25">
          Grid Item 4
        </div>
      </div>

      <form class="bg-white p-5 md:p-7.5 rounded-3xl shadow-2xl">
        <div class="mb-5">
          <label for="name" class="block mb-1.25 font-semibold text-gray-800">Name</label>
          <input id="name" type="text" class="w-full p-3 border-2 border-gray-200 rounded-md text-sm transition-all duration-300 focus:outline-none focus:border-blue-600" placeholder="Enter your name">
        </div>
        <div class="mb-5">
          <label for="email" class="block mb-1.25 font-semibold text-gray-800">Email</label>
          <input id="email" type="email" class="w-full p-3 border-2 border-gray-200 rounded-md text-sm transition-all duration-300 focus:outline-none focus:border-blue-600" placeholder="Enter your email">
        </div>
        <button type="submit" class="px-5 py-2.5 border-0 rounded-md font-semibold cursor-pointer transition-all duration-300 ease-in-out bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5">
          Submit
        </button>
      </form>

      <div style="margin-top: 1.25rem;">
        <div>
          <h3 :style="style" style="color: white; margin-bottom: 1rem; font-size: 1.125rem; font-weight: 500;">
            Styled Elements for Testing
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div style="margin: 1.25rem; padding: 1rem; border: 3px solid #2563eb; background-color: #eff6ff; border-radius: 1rem; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.875rem;">
              Element with margin (20px), padding (15px), and border (3px)
            </div>
            <div style="margin-top: 0.625rem; margin-right: 1.25rem; margin-bottom: 1.875rem; margin-left: 2.5rem; padding-top: 0.3125rem; padding-right: 0.625rem; padding-bottom: 1rem; padding-left: 1.25rem; background-color: #fef2f2; border-radius: 1rem; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.875rem;">
              Element with different margin/padding on each side
            </div>
            <div style="padding: 1.5625rem; background-color: #f0fdf4; border: 2px dashed #4ade80; border-radius: 1rem; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.875rem;">
              <div style="margin: 1rem; padding: 0.625rem; background-color: #f3e8ff; border: 1px solid #a855f7; border-radius: 0.5rem;">
                Nested element for testing selection
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
