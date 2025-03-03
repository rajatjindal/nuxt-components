<template>
  <Button bgcolor="bg-gray-50"
          bordercolor="border-gray-400"
          :callback="callback"
          hoverbgcolor="hover:bg-gray-100"
          hovertextcolor="hover:text-gray-700"
          :hovereffect="true"
          :icon="icon"
          :text="text"
          textcolor="text-gray-800" />
</template>

<script setup lang="ts">
const props = defineProps({
  callback: { type: Function as PropType<(event: MouseEvent) => void> },
  icon: { type: String, default: null },
  text: { type: String, default: "Cancel" },
})
</script>