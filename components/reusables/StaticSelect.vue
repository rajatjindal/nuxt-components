<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-gray-400 mb-0.5">
			{{ label }}
		</label>
		<select class="w-full border border-gray-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-indigo-200 focus:border-indigo-200 placeholder-gray-400 focus:placeholder-gray-50"
						v-bind:modelValue="modelValue"
						v-if="options.length > 0"
						v-on:change="updateInput"
						:disabled="!editable">
			<option v-for="option in options"
							:value="option"
							:selected="option === modelValue"
							class="text-sm p-2 text-gray-400">{{ option }}</option>
		</select>

		<select class="w-full border border-gray-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-indigo-200 focus:border-indigo-200 placeholder-gray-400 focus:placeholder-gray-50"
						v-bind:modelValue="modelValue"
						v-if="optionsMap.length > 0"
						v-on:change="updateInput"
						:disabled="!editable">
			<option v-for="option in optionsMap"
							:value="option.key"
							:selected="option.key === modelValue"
							class="text-sm p-2 text-gray-400">{{ option.title }}</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@rajatjindal1983/crud-sdk';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
	editable: { type: Boolean, default: true },
	options: { type: Array as PropType<any[]>, required: false, default: [] },
	optionsMap: { type: Object as PropType<SelectOption[]>, required: false, default: [] },
	label: { type: String },
	showLabel: { type: Boolean, default: true }
})

const updateInput = function (event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>