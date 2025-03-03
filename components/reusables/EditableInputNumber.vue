<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-gray-400">
			{{ label }}
		</label>
		<span v-if="!editing"
					class="flex justify-end">
			<span class="align-right">{{ raw }}</span>
			<edit-icon class="w-4 h-4"
								 v-on:click="enableEditing"
								 v-if="editable && !editing" />
		</span>
		<input type="text"
					 :disabled="!editable"
					 v-if="editing"
					 class="w-full border border-gray-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-indigo-200 focus:border-indigo-200 placeholder-gray-400 focus:placeholder-gray-50"
					 :placeholder="placeholder"
					 v-on:blur="blurOut"
					 :value="newValue"
					 v-bind:modelValue="newValue" />
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const props = defineProps({
	raw: { type: Number, required: false },
	editable: { type: Boolean, default: true },
	placeholder: { type: String, default: "" },
	label: { type: String, default: "" },
	showLabel: { type: Boolean, default: true },
	onChangeFunc: { type: Function, default: function () { } },
})

const editing = ref(false)
const newValue = ref(props.raw)

const blurOut = function (newValue: Event) {
	console.log("blurred")
	editing.value = false;
	if (props.raw === +(newValue.target as HTMLInputElement).value) {
		console.log("value not changed");
		return;
	}

	if (!props.onChangeFunc) {
		console.log("not sure what to do here");
		return;
	}

	const asNumber: number = +(newValue.target as HTMLInputElement).value
	props.onChangeFunc(asNumber);
	return
}

const enableEditing = function() {
	editing.value = true
}

</script>