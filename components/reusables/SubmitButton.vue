<template>
  <Button bgcolor="bg-primary-600"
          bordercolor="border-primary-600"
          :callback="callback"
          hoverbgcolor="hhover:bg-primary-700"
          hovertextcolor="hover:text-neutral-200"
          :hovereffect="true"
          :icon="icon"
          :text="text"
          textcolor="text-neutral-50" />
</template>

<script setup lang="ts">
const props = defineProps({
  callback: { type: Function as PropType<(event: MouseEvent) => void> },
  icon: { type: String, default: null },
  text: { type: String, default: "Save" },
})
</script>

