<template>
  <u-button
    :icon="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'"
    color="white"
    square
    variant="solid"
    @click="onCopy"
  ></u-button>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'

interface Props {
  value: string
}

const props = defineProps<Props>()

const { copy, copied } = useClipboard()
const onCopy = () => {
  if (!props.value) return

  copy(props.value)
}
</script>
