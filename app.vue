<template>
  <u-page class="!gap-0">
    <template #left>
      <u-aside :links="links" class="py-4 !px-4 !-mx-0 border-r border-gray-500 dark:border-gray-700">
        <template #top>
          <u-input
            :trailing="false"
            color="white"
            icon="i-heroicons-magnifying-glass-20-solid"
            placeholder="Search..."
            size="sm"
          >
            <template #trailing>
              <u-kbd>⌘</u-kbd>
              <u-kbd>K</u-kbd>
            </template>
          </u-input>
        </template>
      </u-aside>
    </template>

    <NuxtPage class="p-4" />
  </u-page>
</template>

<script setup>
const links = [
  {
    label: 'Unix Time Converter',
    icon: 'i-heroicons-clock',
    to: '/unix-time-converter',
  },
  {
    label: 'Roadmap',
    icon: 'i-heroicons-academic-cap',
    to: '/roadmap',
  },
  {
    label: 'Pro',
    icon: 'i-heroicons-square-3-stack-3d',
    to: '/pro',
  },
  {
    label: 'Releases',
    icon: 'i-heroicons-rocket-launch',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank',
  },
]

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})
</script>
