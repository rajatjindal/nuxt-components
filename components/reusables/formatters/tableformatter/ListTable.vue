<template>
  <div :class="gridclass"
       class="bg-gray-50 rounded-t-md border-b-0 mt-1">
    <ListTableHeadings :item="first"
                       :formatter="formatter" />
  </div>
  <div v-for="(item, index) in items"
       :key="index">
    <div
         :class="{ 'border-b-0': !isLastIndex(index), [gridclass.toString()]: true, ['bg-blue-50 text-blue-900']: +index % 2 === 0 }">
      <ListTableRow :item="item"
                    :addon="addon"
                    :itemIndex="Number(index)"
                    v-on:eventTriggered="triggerEvent"
                    :formatter="formatter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableFormatter, TableRow } from '@rajatjindal1983/crud-sdk'
import type { AdditionalActionsConfig } from '@rajatjindal1983/crud-sdk'

const emit = defineEmits(['eventTriggered'])

const props = defineProps({
  items: { type: Object, required: true },
  formatter: { type: Object as PropType<TableFormatter<Object>>, required: true },
  addon: { type: Object }
})

const accumulator = function (prevValue: number, item: TableRow) {
  // don't consider items where rowIndex > 0
  // these items are added to 2nd row of the div
  // and does not need to be counted when calculating
  // grid for primary row in div
  if (item.rowIndex && item.rowIndex > 0) {
    return prevValue
  }

  return item.colspan + prevValue
}

const first = props.items && props.items.length > 0 ? props.items[0] : null;
const gridclass = computed(() => {
  let cols = props.formatter.columns(first).reduce<number>(accumulator, 0)

  if (props.formatter.lastColumnActions(first).length > 0) {
    cols += 2
  }

  if (props.formatter.additionalActions(first).length > 0) {
    cols += 1
  }

  return ' grid grid-cols-' + cols.toString() + ' gap-4 border-gray-300 border px-4 py-2'
})

const isLastIndex = function (rawIndex: string): boolean {
  const index: number = +rawIndex;
  return index === props.items.length - 1
}

const triggerEvent = function (item: Object, action: AdditionalActionsConfig) {
  emit('eventTriggered', action.eventName, item, action)
}
</script>