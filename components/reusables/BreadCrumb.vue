<template>
	<div class="w-full font-semibold text-gray-700 flex text-xs">
		<span v-for="bread, index in breads"
					class="flex"
					:key="index">
			<span class="capitalize">{{ bread }}</span>
			<span v-if="!isLastElement(index, breads)"
						class="text-gray-400 text-sm -mt-1">
				<ChevronRight />
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	breads: { type: Array<string>, required: true },
})

const isLastElement = function (index: number, items: any[]): boolean {
	return (index !== items.length - 1 ? false : true)
}
</script>