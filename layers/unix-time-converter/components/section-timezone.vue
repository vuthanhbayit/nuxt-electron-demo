<template>
  <div class="flex items-center space-x-2">
    <span class="text-xs">Other timezones:</span>

    <div class="relative w-1/3">
      <u-select-menu
        v-model="tz"
        :options="aryIanaTimeZones"
        searchable
        searchable-placeholder="Search a timezone..."
      ></u-select-menu>
    </div>

    <u-button color="gray" @click="onAdd">Add</u-button>
  </div>

  <div class="mt-3 flex flex-col space-y-2">
    <div v-for="(timezone, index) in selectedTimezones" :key="index" class="flex items-center">
      <span class="text-xs">{{ timezone }}</span>

      <span class="text-xs">: {{ format(timezone) }}</span>

      <div class="ml-3">
        <u-button color="gray" size="2xs" variant="ghost" @click="onRemove(index)">
          <span class="text-2xs">Remove</span>
        </u-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { without } from '@vt7/utils'
import { aryIanaTimeZones } from '../constants'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
  instance: Dayjs
}

const props = defineProps<Props>()

const tz = ref(dayjs.tz.guess())
const selectedTimezones = useLocalStorage<string[]>('selected-tz', [])

const format = (timezone: string) => {
  const _instance = props.instance

  if (!_instance.isValid()) return ''

  return _instance.tz(timezone).format('HH:mm:ss dddd DD MMMM YYYY')
}

const onAdd = () => {
  if (selectedTimezones.value.includes(tz.value)) {
    selectedTimezones.value = without(selectedTimezones.value, tz.value)
  }

  selectedTimezones.value.push(tz.value)
  tz.value = ''
}

const onRemove = (index: number) => {
  selectedTimezones.value.splice(index, 1)
}
</script>
