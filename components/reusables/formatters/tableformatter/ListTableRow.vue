<template>
  <div :class="'col-span-' + getColSpan(row)"
       v-for="(row, index) in rowItemsWithIndex(0)"
       :key="index">
    <div class="text-xs text-left"
         :class="{ [row.class]: true }">
      <component v-if="row.rawHTML"
                 :is="ocompile(row.rawHTML, row.rawHTML)"></component>
      <span v-else-if="!row.editable">{{ row.value }}</span>
      <EditableInputNumber v-else-if="row.editable"
                           :raw="(row.value as number)"
                           :onChangeFunc="row.onChangeFunc ? row.onChangeFunc() : function () { }" />
    </div>
  </div>

  <div v-if="formatter.lastColumnActions(item).length > 0"
       class="col-span-1 text-right grid justify-items-end h-6">
    <LastColumnActions :actions="formatter.lastColumnActions(item)"
                       :formatter="formatter"
                       v-on:eventTriggered="triggerEvent" />
  </div>

  <div v-if="formatter.additionalActions(item).length > 0"
       class="col-span-1 text-right grid justify-items-end h-6">
    <AdditionalActions :actions="formatter.additionalActions(item)"
                       :formatter="formatter"
                       v-on:eventTriggered="triggerEvent" />
  </div>

  <div :class="'col-span-' + getColSpan(row)"
       v-for="(row, index) in rowItemsWithIndex(1)"
       :key="index">
    <div class="text-xs text-left"
         :class="{ [row.class]: true, 'text-gray-600': +itemIndex % 2 !== 0, 'text-blue-900': +itemIndex % 2 === 0 }">
      <component v-if="row.rawHTML"
                 :is="compile(row.rawHTML)"></component>
      <span v-else-if="!row.editable">{{ row.value }}</span>
      <EditableInputNumber v-else-if="row.editable"
                           :raw="(row.value as number)"
                           :onChangeFunc="row.onChangeFunc ? row.onChangeFunc() : function () { }" />
    </div>
  </div>



  <div v-if="addon">
    <component :is="addon"
               :item="item" />
  </div>
</template>

<script setup lang="ts">
import type { TableFormatter, TableRow } from '@rajatjindal1983/crud-sdk';
import type { AdditionalActionsConfig } from '@rajatjindal1983/crud-sdk'
import { compile } from 'vue';
import type { RenderFunction } from 'vue';
import EmptyComponent from './EmptyComponent.vue';
import LastColumnActions from './LastColumnActions.vue';

const emit = defineEmits(['eventTriggered'])

const props = defineProps({
  item: { type: Object, required: true },
  formatter: { type: Object as PropType<TableFormatter<Object>>, required: true },
  addon: { type: Object, required: false, default: null },
  itemIndex: { type: Number, required: false, default: 0 }
})

const getColSpan = function (item: TableRow): number {
  return item.colspan
}

const editing = ref(false)

const triggerEvent = function (action: AdditionalActionsConfig) {
  console.log("ListTableRow")
  emit('eventTriggered', props.item, action)
}

const rowItemsWithIndex = function (rowIndex: number): TableRow[] {
  if (rowIndex === 0) {
    return props.formatter.columns(props.item).filter(i => !i.rowIndex || i.rowIndex === rowIndex)
  }

  return props.formatter.columns(props.item).filter(i => i.rowIndex === rowIndex)
}

const ocompile = function (title: string, raw: string): RenderFunction {
  try {
    return compile(raw)
  } catch (error) {
    console.log("failed to compile raw html into vue component ", raw, "\nerror -> ", error)
  }

  return compile('<span class="text-red-400">failed to load data. <br/>pls report this error</span>')
}
</script>