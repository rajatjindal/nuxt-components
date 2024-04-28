<template>
  <div :class="colclass(row)"
       v-for="(row, index) in formatter.columns(item)">
    <div :class="{ [row.class]: true }"
         class="py-1 text-left text-xs font-medium text-neutral-500 tracking-wider">
      {{ row.title }}
    </div>
  </div>

  <div class="col-span-1">
    <div class="py-1 text-right text-xs font-medium text-neutral-500 tracking-wider">
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

</script>