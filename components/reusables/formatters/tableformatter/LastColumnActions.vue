<template>
  <div class="col-span-1">
    <div class="flex">
      <div v-for="(action, index) in actions"
           :key="index">

        <a v-if="action.link && action.showIf && action.showIf()"
           :href="action.link"
           class="ml-1">
          <component v-if="action.icon"
                     :is="ocompile(action.icon, action.icon)"></component>
        </a>

        <div class="ml-1"
             v-if="action.callback && action.showIf && action.showIf()"
             v-on:click="action.callback">
          <component v-if="action.icon"
                     :is="ocompile(action.icon, action.icon)"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdditionalActionsConfig } from '@rajatjindal1983/crud-sdk'
import type { TableFormatter } from '@rajatjindal1983/crud-sdk';
import { compile } from 'vue';
import type { RenderFunction } from 'vue';

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

const ocompile = function (title: string, raw: string): RenderFunction {
  try {
    return compile(raw)
  } catch (error) {
    console.log("failed to compile raw html into vue component ", raw)
  }

  return compile('<span class="text-red-400">failed to load data. <br/>pls report this error</span>')
}
</script>