<template>
	<MultiSelect :alreadySelected="alreadySelected"
							 v-on:update:modelValue="updateInput"
							 :optionsMap="options"
							 label="Status" />
</template>

<script setup lang="ts">
import type { SelectOption } from '@rajatjindal1983/crud-sdk';
import type { StatusFilter } from '@rajatjindal1983/crud-sdk';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
	filter: { type: Object as PropType<StatusFilter>, required: true, default: {} },
})

let alreadySelected: string[] = []
if (props.filter.showNew) {
	alreadySelected.push('new')
}

if (props.filter.showPending) {
	alreadySelected.push('pending')
}

if (props.filter.showInProgress) {
	alreadySelected.push('in-progress')
}

if (props.filter.showCancelled) {
	alreadySelected.push('cancelled')
}

if (props.filter.showCompleted) {
	alreadySelected.push('completed')
}

const updateInput = function (values: string[]) {
	props.filter.showNew = false;
	props.filter.showPending = false
	props.filter.showInProgress = false
	props.filter.showCancelled = false
	props.filter.showCompleted = false

	values.forEach(item => {
		switch (item) {
			case 'new':
				props.filter.showNew = true
				break;
			case 'pending':
				props.filter.showPending = true
				break;
			case 'in-progress':
				props.filter.showInProgress = true
				break;
			case 'completed':
				props.filter.showCompleted = true
				break;
			case 'cancelled':
				props.filter.showCancelled = true
				break;
			default:
			// code block
		}
	})
}

const options: SelectOption[] = [
	{
		key: "new",
		title: "New"
	},
	{
		key: "pending",
		title: "Pending"
	},
	{
		key: 'in-progress',
		title: "In Progress"
	},
	{
		key: "completed",
		title: "Completed"
	},
	{
		key: "cancelled",
		title: "Cancelled"
	}
]
</script>