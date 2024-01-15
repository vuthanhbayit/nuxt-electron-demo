<template>
  <div :style="{ cursor, userSelect }" class="resizable-pane" @mousemove="onMouseMove" @mouseup="onMouseUp">
    <section
      :style="{
        minWidth: minSize,
        maxWidth: maxSize,
        width: resizeValue + '%',
      }"
      class="pane resizable"
    >
      <slot name="resizable"></slot>
    </section>

    <div class="resizer" @mousedown="onMouseDown" />

    <section class="pane">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default defineComponent({
  name: 'ResizablePane',

  props: {
    minSize: {
      type: String,
      default: '16.5rem',
    },
    maxSize: {
      type: String,
      default: '50%',
    },
    resizeType: {
      validator(value) {
        return ['vertical', 'horizontal'].includes(value)
      },
      default: 'vertical',
    },
  },
  data() {
    return {
      isActive: false,
      resizeValue: null,
    }
  },
  computed: {
    userSelect() {
      return this.isActive ? 'none' : ''
    },
    cursor() {
      return this.isActive ? 'col-resize' : ''
    },
  },
  methods: {
    onMouseDown() {
      this.isActive = true
    },
    onMouseUp() {
      this.isActive = false
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.isActive = false
      }

      if (this.isActive) {
        let offset = 0
        let target = e.currentTarget
        while (target) {
          offset += target.offsetLeft
          target = target.offsetParent
        }

        const currentPage = e.pageX
        const targetOffset = e.currentTarget.offsetWidth
        const resizeValue = Math.floor(((currentPage - offset) / targetOffset) * 10000) / 100

        if (resizeValue < 100) {
          this.resizeValue = resizeValue
        }
      }
    },
  },
})
</script>

<style>
.resizable-pane {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}

.pane {
  position: relative;
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  align-items: flex-start;
}

.pane.resizable {
  flex: none;
}

.resizer {
  cursor: col-resize;
  position: relative;
  width: 4px;
  margin: 0 -2px;
  z-index: 1;
}

.resizer::before {
  @apply bg-gray-300 dark:bg-gray-700;

  content: '';
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  transition: box-shadow 250ms;
}

.resizer:hover::before {
}
</style>
