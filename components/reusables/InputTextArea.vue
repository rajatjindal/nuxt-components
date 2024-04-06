<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-neutral-400 mb-0.5">
			{{ label }}
		</label>
		<textarea class="w-full border border-neutral-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-primary-200 focus:border-primary-200 placeholder-neutral-400 focus:placeholder-neutral-50"
							:placeholder="placeholder"
							:disabled="!editable"
							v-on:input="updateInput"
							v-on:focus="toggleFocused"
							v-on:blur="toggleFocused"
							:rows="rows"
							:value="modelValue"
							v-bind:modelValue="modelValue" />
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: { type: String, required: true, default: "" },
	placeholder: { type: String, default: "" },
	label: { type: String, default: "" },
	showLabel: { type: Boolean, default: true },
	editable: { type: Boolean, default: true },
	rows: { type: Number, default: 2}
})

const isFocused = ref(false);
const toggleFocused = function () {
	isFocused.value = !isFocused.value
}
const updateInput = function (event: Event) {
	const el = event.target as HTMLInputElement;
	emit('update:modelValue', el.value)
}
</script>