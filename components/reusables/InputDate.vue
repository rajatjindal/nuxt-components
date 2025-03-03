<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-gray-400">
			{{ label }}
		</label>
		<input type="date"
					 :disabled="!editable"
					 class="w-full border border-gray-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-indigo-200 focus:border-indigo-200 placeholder-gray-400 focus:placeholder-gray-50"
					 :placeholder="placeholder"
					 v-on:input="updateInput"
					 v-on:focus="toggleFocused"
					 v-on:blur="toggleFocused"
					 :valueDefault="null"
					 :value="format(modelValue)"
					 v-bind:modelValue="format(modelValue)" />
	</div>
</template>
<script setup lang="ts">
import moment from 'moment'
import type { Moment } from 'moment-timezone'

import type { MomentInput } from 'moment'
import { formatDate } from '@rajatjindal1983/crud-sdk';

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const props = defineProps({
	modelValue: { type: Object as PropType<string | null>, required: true, default: '' },
	editable: { type: Boolean, default: true },
	placeholder: { type: String, default: "" },
	label: { type: String, default: "" },
	showLabel: { type: Boolean, default: true }
})

const isFocused = ref(false);
const toggleFocused = function () {
	isFocused.value = !isFocused.value
	if (!isFocused.value) {
		emit('blur')
		return
	}

	emit('focus')
}

const format = function (date: string | null): string {
	if (!date || date === "") {
		return ''
	}

	return moment(date as MomentInput).format("YYYY-MM-DD").toString()
}

const updateInput = function (event: Event) {
	const el = event.target as HTMLInputElement;
	emit('update:modelValue', moment(el.value as MomentInput).format())
}
</script>