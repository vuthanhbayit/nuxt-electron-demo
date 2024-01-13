export default defineAppConfig({
  ui: {
    strategy: 'override',
    variables: {
      header: {
        height: 0,
      },
    },
    button: {
      default: {
        size: '2xs',
      },
    },
    input: {
      default: {
        size: '2xs',
      },
    },
    select: {
      default: {
        size: '2xs',
      },
    },
  },
})
