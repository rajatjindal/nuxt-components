<template>
  <div :class="colclass(row)"
       v-for="(row, index) in rowItemsWithIndex(0)">
    <div :class="{ [row.class]: true }"
         class="py-1 text-left text-xs font-medium text-gray-500 tracking-wider">
      {{ row.title }}
    </div>
  </div>

  <div class="col-span-2" v-if="$props.formatter.lastColumnActions(item).length > 0">
    <div class="py-1 text-right text-xs font-medium text-gray-500 tracking-wider">
    </div>
  </div>
  
  <div class="col-span-1" v-if="$props.formatter.additionalActions(item).length > 0">
    <div class="py-1 text-right text-xs font-medium text-gray-500 tracking-wider">
    </div>
  </div>
</template>


<script setup lang="ts">
import type { TableFormatter, TableRow } from '@rajatjindal1983/crud-sdk';

const props = defineProps({
  formatter: { type: Object as PropType<TableFormatter<Object>>, required: true },
  item: { type: Object, required: true }
})

const colclass = function (row: TableRow): string {
  return 'col-span-' + row.colspan.toString()
}

const rowItemsWithIndex = function(rowIndex: number): TableRow[] {
  return props.formatter.columns(props.item).filter(i => !i.rowIndex || i.rowIndex === rowIndex)
}

</script>