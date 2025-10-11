<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-900 font-dm-sans">
    <!-- Header Section -->
    <header class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h1
          id="main-title"
          w-full
          flex="~ items-center justify-center gap-2"
          class="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
        >
          <span>UnoCSS Inspector</span>
          <a text-inherit hover:text-rose href="https://github.com/zyyv/unocss-inspector" target="_blank">
            <div text-8 cursor-pointer i-hugeicons:github />
          </a>
        </h1>
        <p
          class="opacity-90 mx-auto leading-relaxed" max-w-2xl text="xl red hover:blue sad asdqwe adqws asdqwgfd"
          custom="foo bar" dark:hover="baz text-foo"
          style="display: block; max-width: 600px; margin-top: 0.5rem; font-size: 1.125rem;"
        >
          Explore and inspect CSS properties with interactive element selection
        </p>
        <div class="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Click the
          <span text-pink>UnoCSS Icon</span>
          or use
          <span text-amber inline-flex items-center gap-0.5>
            <kbd>
              <div i-hugeicons:command />
            </kbd> + U
          </span>

          to start
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto py-12 px-6 space-y-12">
      <!-- Feature Card -->
      <section class="bg-dark-200 text-gray-100 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700">
        <div class="max-w-3xl">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
            Interactive Element Inspector
          </h2>
          <p class="text-gray-300 text-lg leading-relaxed mb-8">
            This demo showcases the UnoCSS Inspector's capabilities. Hover over any element and use the inspector
            to visualize margin, padding, borders, and other CSS properties in real-time.
          </p>
          <div class="flex flex-wrap gap-4">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Start Inspecting
            </button>
            <button
              class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <!-- Grid Layout Demo -->
      <section>
        <h3 class="text-2xl font-bold text-gray-100 mb-6">
          Grid Layout Components
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            class="bg-dark-200 text-gray-100 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-3000 hover:-translate-y-1 border border-gray-700"
          >
            <div class="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold">1</span>
            </div>
            <h4 class="font-semibold text-white mb-2">
              Component One
            </h4>
            <p class="text-gray-300 text-sm">
              Update after 3000ms
            </p>
          </div>
          <div
            class="bg-dark-200 text-gray-100 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
          >
            <div class="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold">2</span>
            </div>
            <h4 class="font-semibold text-white mb-2">
              Component Two
            </h4>
            <p class="text-gray-300 text-sm">
              Update after 300ms
            </p>
          </div>
          <div
            class="bg-dark-200 text-gray-100 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
          >
            <div class="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold">3</span>
            </div>
            <h4 class="font-semibold text-white mb-2">
              Component Three
            </h4>
            <p class="text-gray-300 text-sm">
              Modern design system
            </p>
          </div>
          <div
            class="bg-dark-200 text-gray-100 p-6 rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700"
          >
            <div class="w-12 h-12 bg-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span class="text-white font-bold">4</span>
            </div>
            <h4 class="font-semibold text-white mb-2">
              Component Four
            </h4>
            <p class="text-gray-300 text-sm">
              Utility-first approach
            </p>
          </div>
        </div>
      </section>

      <!-- Form Demo -->
      <section class="bg-dark-200 text-gray-100 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-700">
        <h3 class="text-2xl font-bold text-white mb-8">
          Contact Form Example
        </h3>
        <form class="max-w-2xl space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-gray-300 font-medium mb-2">First Name</label>
              <input
                id="firstName" type="text"
                class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your first name"
              >
            </div>
            <div>
              <label for="lastName" class="block text-gray-300 font-medium mb-2">Last Name</label>
              <input
                id="lastName" type="text"
                class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your last name"
              >
            </div>
          </div>
          <div>
            <label for="email" class="block text-gray-300 font-medium mb-2">Email Address</label>
            <input
              id="email" type="email"
              class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="your@email.com"
            >
          </div>
          <div>
            <label for="message" class="block text-gray-300 font-medium mb-2">Message</label>
            <textarea
              id="message" rows="4"
              class="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Send Message
          </button>
        </form>
      </section>

      <!-- Box Model Testing -->
      <section>
        <h3 class="text-2xl font-bold text-gray-100 mb-6">
          Box Model Testing Elements
        </h3>
        <div class="space-y-8">
          <!-- Standard Box Model -->
          <div class="bg-blue-900/30 border-3 border-blue-400 rounded-2xl p-6 m-5 font-mono text-sm">
            <div class="text-blue-300 font-semibold mb-2">
              Standard Box Model
            </div>
            <div class="text-blue-200">
              Margin: 20px | Border: 3px solid | Padding: 24px | Content area with rounded corners
            </div>
          </div>

          <!-- Asymmetric Spacing -->
          <div class="bg-red-900/30 rounded-2xl font-mono text-sm mt-2.5 mr-5 mb-7.5 ml-10 pt-1.25 pr-2.5 pb-4 pl-5">
            <div class="text-red-300 font-semibold mb-2">
              Asymmetric Spacing
            </div>
            <div class="text-red-200">
              Different margin and padding values on each side for testing complex layouts
            </div>
          </div>

          <!-- Nested Elements -->
          <div class="bg-green-900/30 border-2 border-dashed border-green-400 rounded-2xl p-6 font-mono text-sm">
            <div class="text-green-300 font-semibold mb-4">
              Nested Element Container
            </div>
            <div class="bg-purple-900/40 border border-purple-400 rounded-lg p-4 m-4">
              <div class="text-purple-300 font-semibold mb-2">
                Nested Child Element
              </div>
              <div class="text-purple-200">
                Perfect for testing element selection and hierarchy visualization
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-950 text-gray-300 py-8 px-6 mt-16 border-t border-gray-700">
      <div class="max-w-4xl mx-auto text-center">
        <p class="mb-2">
          Built with UnoCSS • Designed for developers
        </p>
        <p class="text-gray-500 text-sm">
          Inspect any element to see its CSS properties in action
        </p>
      </div>
    </footer>
  </div>
</template>
