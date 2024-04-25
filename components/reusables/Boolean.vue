<template>
	<RadioButtons :options="options"
							 :editable="editable"
							 :label="label"
							 :showLabel="showLabel"
							 :alignment="alignment"
							 v-bind:modelValue="modelValue"
							 v-on:change="updateInput"/>
</template>


<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
	editable: { type: Boolean, default: true },
	label: { type: String },
	showLabel: { type: Boolean, default: true },
	alignment: { type: String, default: "horizontal" },
})

const options = [{
	value: "true",
	display: "True"
}, {
	value: "false",
	display: "False"
}]

const updateInput = function (event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>