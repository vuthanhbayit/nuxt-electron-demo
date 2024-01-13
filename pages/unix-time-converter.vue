<template>
  <div class="flex flex-col space-y-6">
    <div class="flex items-center space-x-2">
      <span class="font-semibold text-sm">Input:</span>

      <u-button color="white" variant="solid" @click="handleNow">Now</u-button>
      <u-button color="white" variant="solid">Clipboard</u-button>
      <u-button color="white" variant="solid" @click="time = ''">Clear</u-button>

      <span v-if="time && isInvalid" class="font-semibold text-sm text-red-500">Invalid input</span>
    </div>

    <div class="mt-4 flex space-x-4">
      <div class="w-1/3 flex flex-col">
        <u-input v-model="time"></u-input>

        <span class="mt-1 text-xs">Tips: Input ISO 8601 or Unix timestamps</span>
      </div>
    </div>

    <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>

    <div class="flex space-x-8">
      <div class="w-1/3">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">Local:</span>
            </div>

            <div class="flex space-x-1">
              <u-input :model-value="data.local" class="flex-1"></u-input>

              <button-copy :value="data.local"></button-copy>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">UTC (ISO 8601):</span>
            </div>

            <div class="flex space-x-1">
              <u-input :model-value="data.utc" class="flex-1"></u-input>

              <button-copy :value="data.utc"></button-copy>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">Unix time:</span>
            </div>

            <div class="flex space-x-1">
              <u-input :model-value="data.unix" class="flex-1"></u-input>

              <button-copy :value="data.unix"></button-copy>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/5">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">Day of year:</span>
            </div>

            <div class="flex space-x-1">
              <u-input :model-value="data.dayOfYear" class="flex-1"></u-input>

              <button-copy :value="data.dayOfYear"></button-copy>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">Week of year:</span>
            </div>

            <div class="flex space-x-1">
              <u-input :model-value="data.weekOfYear" class="flex-1"></u-input>

              <button-copy :value="data.weekOfYear"></button-copy>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="mb-1">
              <span class="text-xs">Is leap year?:</span>
            </div>

            <div class="flex space-x-1">
              <div class="flex-1 relative">
                <u-select
                  :model-value="data.isLeapYear"
                  :options="[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]"
                ></u-select>
              </div>

              <button-copy :value="data.isLeapYear"></button-copy>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/3">
        <div class="flex flex-col justify-between h-full">
          <span class="text-xs">Other formats (local):</span>

          <div class="flex space-x-1">
            <u-input :model-value="getTimeFormat('DD/MM/YYYY')" class="flex-1"></u-input>

            <button-copy :value="getTimeFormat('DD/MM/YYYY')"></button-copy>
          </div>
          <div class="flex space-x-1">
            <u-input :model-value="getTimeFormat('MM/DD/YYYY')" class="flex-1"></u-input>

            <button-copy :value="getTimeFormat('MM/DD/YYYY')"></button-copy>
          </div>
          <div class="flex space-x-1">
            <u-input :model-value="getTimeFormat('YYYY-MM-DD')" class="flex-1"></u-input>

            <button-copy :value="getTimeFormat('YYYY-MM-DD')"></button-copy>
          </div>
          <div class="flex space-x-1">
            <u-input :model-value="getTimeFormat('DD-MM-YYYY hh:mm')" class="flex-1"></u-input>

            <button-copy :value="getTimeFormat('DD-MM-YYYY hh:mm')"></button-copy>
          </div>
          <div class="flex space-x-1">
            <u-input :model-value="getTimeFormat('dddd, MMM DD, YYYY')" class="flex-1"></u-input>

            <button-copy :value="getTimeFormat('dddd, MMM DD, YYYY')"></button-copy>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
  </div>
</template>

<script lang="ts" setup>
import { isNumeric } from '@vt7/utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(utc)
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(isLeapYear)

const time = ref('')

const timeInstance = computed(() => {
  if (!time.value) return dayjs(null)

  if (isNumeric(time.value)) {
    const _unix = time.value.length === 13 ? Number(time.value) / 1000 : Number(time.value)

    return dayjs.unix(_unix)
  }

  return dayjs(time.value)
})

const isInvalid = computed(() => {
  return !timeInstance.value.isValid()
})

const data = computed(() => {
  if (isInvalid.value) {
    return {
      local: '',
      utc: '',
      unix: '',
      dayOfYear: '',
      weekOfYear: '',
      isLeapYear: '',
    }
  }

  const _instance = timeInstance.value

  return {
    local: _instance.format(),
    utc: _instance.utc().format(),
    unix: _instance.valueOf().toString(),
    dayOfYear: _instance.dayOfYear(),
    weekOfYear: _instance.week(),
    isLeapYear: _instance.isLeapYear(),
  }
})

const getTimeFormat = (template: string) => {
  if (isInvalid.value) return ''

  const _instance = timeInstance.value

  return _instance.format(template)
}

const handleNow = () => {
  time.value = dayjs().valueOf().toString()
}

useHead({
  title: 'Unix Time Converter',
})
</script>
