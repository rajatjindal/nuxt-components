<template>
	<div class="w-full relative">
		<div class="">
			<label v-if="label !== ''"
						 class="block text-xs text-neutral-400 mb-0.5">
				{{ label }}
			</label>
			<div class="flex">
				<div v-if="!showOptions"
						 v-on:click="enableShowOptions"
						 :class="{ 'bg-gray-200': !editable }"
						 class="shadow-2xl w-full border border-neutral-300 px-2 py-2 rounded-r-md text-xs focus:outline-none focus:border-2 focus:ring-primary-200 focus:border-primary-200 placeholder-neutral-400 focus:placeholder-neutral-50">
					<span v-if="selected">{{ formatter.toSelectOption(selected).title }}</span>
					<span v-else
								class="w-full rounded-r-md text-xs text-neutral-400">
						click to select
					</span>
				</div>
				<PinIcon v-if="pin && (pinned || selected) && !showOptions"
								 v-on:click="pinIt"
								 :selected="pinned"
								 class="ml-1 w-4 h-4 my-2" />
			</div>
		</div>
		<div class="mt-1"
				 v-if="showOptions">
			<div class="flex ml-1">
				<InputText v-model="inputvalue"
									 ref="inputElement"
									 placeholder="search" />
				<CloseIcon v-on:click="disableShowOptions"
									 class="ml-1 w-4 h-4 my-2" />
			</div>

			<ul
					class="absolute z-10 w-full min-w-min border-t-0 border-neutral-300 bg-white rounded shadow-neutral-300 shadow-2xl max-h-56 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm mb-2">
				<li>
					<div v-on:click="updateSelected({})"
							 class="z-100 text-neutral-900 cursor-default select-none relative py-3 pl-3 pr-9 border-b border-neutral-200 text-xs hover:bg-neutral-100 flex justify-between">
						-
					</div>
					<div v-on:click="updateSelected(selected)"
							 v-if="selected && formatter.toSelectOption(selected).key"
							 class="z-100 text-neutral-900 cursor-default select-none relative py-3 pl-3 pr-9 border-b border-neutral-200 text-xs hover:bg-neutral-100 flex justify-between">
						<p>{{ formatter.toSelectOption(selected).title }}</p>
						<p v-if="formatter.toSelectOption(selected).subtitle" class="text-gray-400">{{ formatter.toSelectOption(selected).subtitle }}</p>
						<CheckIcon class="-mt-1 text-greenaccent-600" />
					</div>
				</li>

				<li v-for="item in filteredItems">
					<div v-if="!selected || (selected && formatter.toSelectOption(selected).key !== formatter.toSelectOption(item).key)"
							 v-on:click="updateSelected(item)"
							 v-on:blur="disableShowOptions"
							 class="z-100 text-neutral-900 cursor-default select-none relative py-3 pl-3 pr-9 border-b border-neutral-200 text-xs hover:bg-neutral-100">
						<p>{{ formatter.toSelectOption(item).title }}</p>
						<p v-if="formatter.toSelectOption(item).subtitle" class="text-gray-400">{{ formatter.toSelectOption(item).subtitle }}</p>
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>
<script setup lang="ts">
import type { SelectFormatter } from '../../sdk/base/formatter';

const emit = defineEmits(['update:modelValue', 'input-changed'])
const props = defineProps({
	label: { type: String },
	modelValue: { type: Object, required: false, default: null },
	editable: { type: Boolean, default: true },
	items: { type: Array as PropType<any[]>, required: true, default: [] },
	formatter: { type: Object as PropType<SelectFormatter<Object>>, required: true },
	pin: { type: Boolean, default: false },
	showingOptions: { type: Boolean, default: false}
})

const clone = function <T>(item: T): T {
	return JSON.parse(JSON.stringify(item))
}

const inputvalue = "";
watch(() => clone(inputvalue), (currentValue, oldValue) => {
	emit('input-changed', currentValue)
})

const showOptions = ref(props.showingOptions);
const filteredItems = computed(() => props.items.filter(item => props.formatter.toSelectOption(item).title !== '' && props.formatter.toSelectOption(item).title?.toLowerCase().includes(inputvalue.toLowerCase())))

const disableShowOptions = function() {
	showOptions.value = false
}

const selected: Ref<Object> = ref(props.modelValue)
const updateSelected = function (item: Object, resetPin = true) {
	selected.value = item
	showOptions.value = false
	emit('update:modelValue', item)

	if (resetPin) {
		resetPinFunc()
	}
}

let pinned = ref(props.formatter.getPin ? props.formatter.getPin() : null)
if (pinned.value && !props.modelValue) {
	updateSelected(pinned.value, false)
}

const inputElement = ref<HTMLInputElement | null>(null)
const enableShowOptions = function () {
	if (!props.editable) {
		return
	}
	showOptions.value = true

	if (!inputElement || !inputElement.value) {
		console.log("return from here")
		return
	}

	inputElement.value.focus()
}

const resetPinFunc = function() {
	props.formatter.resetPin()
		pinned.value = null
}

const pinIt = function() {
	if (pinned.value) {
		resetPinFunc()
		return
	}

	console.log("pinIt")	
	props.formatter.setPin(selected.value)
	pinned.value = props.formatter.getPin()
	showOptions.value = false
}
</script>