<template>
  <div :class="gridclass"
       class="bg-neutral-50 rounded-t-md border-b-0 mt-1">
    <ListTableHeadings :item="first"
                       :formatter="formatter" />
  </div>
  <div v-for="(item, index) in items"
       :key="index">
    <div :class="{ 'border-b-0': !isLastIndex(index), [gridclass.toString()]: true }">
      <ListTableRow :item="item"
                    :addon="addon"
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
  return item.colspan + prevValue
}

const first = props.items && props.items.length > 0 ? props.items[0] : null;
const gridclass = computed(() => {
  const cols = props.formatter.columns(first).reduce<number>(accumulator, 1)
  return 'grid grid-cols-' + cols.toString() + ' gap-4 border-neutral-300 border px-4 py-2'
})

const isLastIndex = function (rawIndex: string): boolean {
  const index: number = +rawIndex;
  return index === props.items.length - 1
}

const triggerEvent = function (item: Object, action: AdditionalActionsConfig) {
  emit('eventTriggered', action.eventName, item, action)
}
</script>