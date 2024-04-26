<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-neutral-400 mb-0.5">
			{{ label }}
		</label>

		<div :class="{ 'flex': alignment === 'horizontal', 'flex-col': alignment === 'vertical' }">
			<div v-for="option in options"
					 :key="option.value?.toString()"
					 class="mr-2 flex mt-2">
				<input type="radio"
							 class="form-radio"
							 :name="name"
							 :value="option.value"
							 v-bind:modelValue="modelValue"
							 v-on:change="updateInput"
							 :checked="modelValue === option.value">
				<div :class="{'font-bold': modelValue === option.value}" class="text-xs ml-1 text-gray-600">{{ option.display }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { toISOFormatDate } from '../../sdk/base/formatter';
import type { RadioButtonInput } from '../../sdk/base/types';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
	editable: { type: Boolean, default: true },
	options: { type: Array as PropType<RadioButtonInput[]>, required: true },
	label: { type: String },
	showLabel: { type: Boolean, default: true },
	alignment: { type: String, default: "horizontal" },
	name: { type: String, required: true, default: toISOFormatDate(new Date())}
})

const updateInput = function (event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>