<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-gray-400">
			{{ label }}
		</label>
		<input type="text"
					 :disabled="!editable"
					 class="w-full border border-gray-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-indigo-200 focus:border-indigo-200 placeholder-gray-400 focus:placeholder-gray-50"
					 :placeholder="placeholder"
					 v-on:input="lazyUpdateInput"
					 v-on:focus="toggleFocused"
					 v-on:blur="toggleFocused"
					 :value="modelValue"
					 v-bind:modelValue="modelValue" />
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
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

const updateInput = function (event: Event) {
	const el = event.target as HTMLInputElement;
	emit('update:modelValue', el.value)
}

function debounce<Params extends any[]>(
	func: (...args: Params) => any,
	timeout: number,
): (...args: Params) => void {
	let timer: NodeJS.Timeout
	return (...args: Params) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func(...args)
		}, timeout)
	}
}

const lazyUpdateInput = debounce(updateInput, 500)
</script>