export default defineNuxtConfig({
  ssr: false,

  extends: ['@nuxt/ui-pro', './layers/unix-time-converter'],

  modules: ['nuxt-electron', '@nuxt/ui'],

  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main.ts',
      },
      {
        entry: 'electron/preload.ts',
        onstart(args) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          args.reload()
        },
      },
    ],
    renderer: {},
  },
})
