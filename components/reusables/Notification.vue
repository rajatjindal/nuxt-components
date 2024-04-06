<template>
  <div v-if="error && !hide"
       class="fixed z-50 px-4 top-10 w-80 right-20 h-32 shadow-lg opacity-95 rounded-lg border border-red-300 bg-red-100 text-red-600 text-sm font-semibold flex items-center justify-center">
    {{ error }}
  </div>
  <div v-if="success && !hide"
       class="fixed z-50 top-10 w-80 right-20 h-32 shadow-lg opacity-95 rounded-lg border border-indigo-200 bg-indigo-100 text-indigo-600 text-sm font-semibold flex items-center justify-center">
    {{ success }}
  </div>
</template>
<script setup lang="ts">
import EventBus from '@/sdk/base/eventbus'

const error = ref("" as any)
const success = ref("" as any)
const hide = ref(true)

EventBus.on('error', (e) => {
  hide.value = false
  error.value = e
  setTimeout(function () {
    hide.value = true
  }, 3000);
})

EventBus.on('success', (e) => {
  hide.value = false
  success.value = e
  setTimeout(function () {
    hide.value = true
  }, 3000);
})
</script>