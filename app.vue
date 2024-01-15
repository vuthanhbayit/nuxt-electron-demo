<template>
  <div id="_app" :class="{ 'is-active-sidebar': visible }">
    <resizable-pane class="h-full">
      <template v-if="visible" #resizable>
        <div class="h-screen bg-gray-100 dark:bg-gray-800 w-full sticky top-0 inset-0 flex flex-col">
          <div class="h-8 w-full"></div>
          <div class="flex-1 p-4 h-full w-full overflow-auto">
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
                <u-aside-links
                  :links="links"
                  :ui="{
                    label: 'text-xs relative',
                    wrapper: 'space-y-3 mb-3 lg:mb-6 lg:mx-0',
                  }"
                ></u-aside-links>
              </div>

              <div class="flex justify-between items-center space-x-2">
                <u-color-mode-toggle></u-color-mode-toggle>

                <span class="text-xs font-semibold">DevUtils 0.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="w-full">
        <div class="title-bar sticky top-0 inset-x-0 bg-white dark:bg-gray-900 z-10 flex items-center h-8 px-4">
          <div>
            <u-button
              color="gray"
              icon="i-heroicons-bars-3"
              size="xs"
              variant="ghost"
              @click="visible = !visible"
            ></u-button>
          </div>

          <div
            class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 rounded bg-gray-100 dark:bg-gray-800 px-8 text-center"
            style="-webkit-user-select: none; -webkit-app-region: drag"
          >
            <div class="flex items-center justify-center py-1">
              <span class="text-xs font-semibold">{{ label }}</span>
            </div>
          </div>
        </div>

        <nuxt-page class="p-4"></nuxt-page>
      </div>
    </resizable-pane>
  </div>
</template>

<script setup>
import { useWindowSize, useLocalStorage } from '@vueuse/core'
import { ipcRenderer } from 'electron'

const links = [
  {
    label: 'Unix Time Converter',
    icon: 'i-heroicons-clock',
    to: '/unix-time-converter',
  },
]

const route = useRoute()
const label = computed(() => {
  const _link = links.find(link => link.to === route.path)

  return _link ? _link.label : 'DevUtils'
})

const { width } = useWindowSize()
const visible = useLocalStorage('sidebar-visible', !(width.value < 800))

watch(width, value => {
  if (value < 800) {
    visible.value = false
  }
})

watch(visible, value => {
  if (!value) return

  if (width.value < 800) {
    ipcRenderer.send('resize-window', { width: 1000 })
  }
})

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})
</script>

<style>
#_app:not(.is-active-sidebar) {
  .resizable {
    display: none;
  }

  .title-bar {
    margin-left: 60px;
  }
}
</style>
