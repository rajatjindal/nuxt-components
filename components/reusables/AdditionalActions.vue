<template>
  <div class="w-full text-right grid justify-items-end px-4">
    <div class="text-xs text-neutral-900" v-if="!showOptions"
         v-on:click="toggleShowOptions">
      ...
    </div>
    <div v-on:mouseleave="timeoutShowOptions" class="z-50"
         v-on:mouseenter="cancelTimeout">
      <div v-if="showOptions"
           class="border rounded border-neutral-300 bg-neutral-50 flex-col text-left shadow-xxl text-neutral-800 text-xs block w-fit whitespace-nowrap w-32">
        <div v-for="(action, index) in actions" class="border-b"
             :key="index">
          <nuxt-link :to="action.link"
                     v-if="action.link">
            <div class="px-4 py-1 hover:bg-neutral-200 bg-neutral-50">
              {{ action.title }}
            </div>
          </nuxt-link>

          <!-- to load dynamic component -->
          <div class="py-1 px-2 hover:bg-neutral-200 bg-neutral-50"
               v-if="action.eventName"
               v-on:click="triggerEvent(action)">
            {{ action.title }}
          </div>

          <div class="py-1 px-2 hover:bg-neutral-200 bg-neutral-50"
               v-if="action.callback"
               v-on:click="action.callback">
            {{ action.title }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdditionalActionsConfig } from '@rajatjindal1983/crud-sdk'
import type { TableFormatter } from '@rajatjindal1983/crud-sdk';

const emit = defineEmits(['eventTriggered'])

const props = defineProps({
  actions: { type: Object as PropType<AdditionalActionsConfig[]>, required: true },
  formatter: { type: Object as PropType<TableFormatter<Object>>, required: true },
})

const showOptions = ref(false)
const toggleShowOptions = function () {
  showOptions.value = !showOptions.value
}

// hide additional options 5s after mouseleaves
var timeoutFunc: string | number | NodeJS.Timeout | undefined
const timeoutShowOptions = function () {
  timeoutFunc = setTimeout(function () {
    showOptions.value = false
  }, 200)
}

// cancel hiding options if user mouseenters the options again
const cancelTimeout = function () {
  clearTimeout(timeoutFunc)
}

const triggerEvent = function (action: AdditionalActionsConfig) {
  emit('eventTriggered', action)
  showOptions.value = false
}
</script>