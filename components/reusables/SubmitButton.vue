<template>
  <Button bgcolor="bg-indigo-600"
          bordercolor="border-indigo-600"
          :callback="callback"
          hoverbgcolor="hhover:bg-indigo-700"
          hovertextcolor="hover:text-gray-200"
          :hovereffect="true"
          :icon="icon"
          :text="text"
          textcolor="text-gray-50" />
</template>

<script setup lang="ts">
const props = defineProps({
  callback: { type: Function as PropType<(event: MouseEvent) => void> },
  icon: { type: String, default: null },
  text: { type: String, default: "Save" },
})
</script>

