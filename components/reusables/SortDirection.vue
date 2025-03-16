<template>
	<StaticSelect v-bind:modelValue="modelValue"
								v-on:change="updateInput"
								:options="['', 'asc', 'desc']"
								label="Sort Direction" />
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
})

const updateInput = function (event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>