<template>
  <div :class="'col-span-' + getColSpan(index)"
       v-for="(row, index) in formatter.columns(item)"
       :key="index">
    <div class="text-xs text-neutral-600 text-left"
         :class="{ [row.class]: true }">
         <span v-if="!row.editable">{{ row.value }}</span>
         <EditableInputNumber v-if="row.editable" :raw="(row.value as number)" :onChangeFunc="row.onChangeFunc ? row.onChangeFunc() : function() {}"/>
    </div>
  </div>

  <div v-if="formatter.additionalActions(item).length > 0"
       class="col-span-1 text-right grid justify-items-end h-6">
    <AdditionalActions :actions="formatter.additionalActions(item)"
                       :formatter="formatter"
                       v-on:eventTriggered="triggerEvent" />
  </div>

  <div v-if="addon">
    <component :is="addon" :item="item" />
  </div>
</template>

<script setup lang="ts">
import type { TableFormatter, TableRow } from '@rajatjindal1983/crud-sdk';
import type { AdditionalActionsConfig } from '@rajatjindal1983/crud-sdk'

const emit = defineEmits(['eventTriggered'])

const props = defineProps({
  item: { type: Object, required: true },
  formatter: { type: Object as PropType<TableFormatter<Object>>, required: true },
  addon: { type: Object as PropType<Component>, required: false, default: null }
})

const getColSpan = function (index: number): number {
  return props.formatter.columns(props.item)[index].colspan
}

const accumulator = function (prevValue: number, item: TableRow) {
  return item.colspan + prevValue
}

const editing = ref(false)

const triggerEvent = function (action: AdditionalActionsConfig) {
  console.log("ListTableRow")
  emit('eventTriggered', props.item, action)
}
</script>