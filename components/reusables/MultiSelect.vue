<template>
	<div class="w-full">
		<label v-if="showLabel && label !== ''"
					 class="block text-xs text-neutral-400 mb-0.5">
			{{ label }}
		</label>

		<div v-if="options.length > 0"
				 class="overflow-hidden">
			<div class="flex flex-wrap">
				<div v-for="option in options">
					<div v-show="isSelected(option)"
							 v-on:click="updateInput(option)"
							 class="border py-1 px-2 text-xs rounded mb-2 ml-1 bg-blue-50 text-blue-800 font-bold border-blue-800">{{
							 	option }}
					</div>
					<div v-show="!isSelected(option)"
							 v-on:click="updateInput(option)"
							 class="border py-1 px-2 text-xs rounded mb-2 ml-1 bg-blue-50 text-blue-800">{{ option }}
					</div>
				</div>
			</div>
		</div>

		<div v-if="optionsMap.length > 0"
				 class="overflow-hidden">
			<div class="flex flex-wrap">
				<div v-for="option in optionsMap">
					<div v-show="isSelected(option.key!)"
							 v-on:click="updateInput(option.key!)"
							 class="border py-1 px-2 text-xs rounded mb-2 ml-1 bg-blue-50 text-blue-800 font-bold border-blue-800">{{
							 	option.title }}
					</div>
					<div v-show="!isSelected(option.key!)"
							 v-on:click="updateInput(option.key!)"
							 class="border py-1 px-2 text-xs rounded mb-2 ml-1 bg-blue-50 text-blue-800">{{ option.title }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/sdk/base/formatter';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
	modelValue: { type: Array as PropType<any[]>, required: true, default: [] },
	editable: { type: Boolean, default: true },
	options: { type: Array as PropType<any[]>, required: false, default: [] },
	optionsMap: { type: Object as PropType<SelectOption[]>, required: false, default: [] },
	label: { type: String },
	showLabel: { type: Boolean, default: true },
	alreadySelected: { type: Array as PropType<string[]>, required: false, default: [] }
})

const selectedItems = ref(props.alreadySelected)

const updateInput = function (key: string) {
	if (selectedItems.value.includes(key)) {
		selectedItems.value.splice(selectedItems.value.indexOf(key), 1)
	} else {
		selectedItems.value.push(key)
	}

	emit('update:modelValue', selectedItems.value)
}

const isSelected = function (option: string): boolean {
	return selectedItems.value.includes(option)
}
</script>