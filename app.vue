<template>
  <div class="flex">
    <div class="hidden lg:block w-[300px]">
      <div class="p-4 border-r border-gray-300 dark:border-gray-700 h-screen">
        <div class="h-full flex flex-col space-y-4">
          <u-input
            :trailing="false"
            color="white"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
            size="sm"
          >
            <template #trailing>
              <div class="flex space-x-1">
                <u-kbd>⌘</u-kbd>
                <u-kbd>K</u-kbd>
              </div>
            </template>
          </u-input>

          <div class="flex-1 overflow-auto">
            <u-aside-links :links="links" :ui="{ label: 'text-xs relative' }"></u-aside-links>
          </div>

          <div class="flex justify-between items-center space-x-2">
            <u-color-mode-toggle></u-color-mode-toggle>

            <span class="text-xs font-semibold">DevUtils 0.0.0</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <nuxt-page class="p-4"></nuxt-page>
    </div>
  </div>
</template>

<script setup>
const links = [
  {
    label: 'Unix Time Converter',
    icon: 'i-heroicons-clock',
    to: '/unix-time-converter',
  },
]

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})
</script>
