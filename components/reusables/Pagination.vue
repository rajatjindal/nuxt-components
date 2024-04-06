<template>
	<div class="w-full flex gap-1">
		<div class="text-center">
			<Button v-on:click="first"
							text="First" />
		</div>

		<div class="text-center">
			<Button v-on:click="prev"
							text="Prev" />
		</div>

		<div class="text-center">
			<Button :text="pageInfo.toString()"
							:hovereffect="false" />
		</div>

		<div class="text-center">
			<Button v-on:click="next"
							text="Next" />
		</div>

		<div class="text-center">
			<Button v-on:click="last"
							text="Last" />
		</div>

		<div class="text-center"
				 v-if="allowExport">
			<Button v-on:click="exportFunc"
							text=""
							icon="DownloadIcon" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { PaginationConfig } from "../../sdk/base/types"
import type { PageFilter } from "../../sdk/base/types"
import type { IBaseAPI } from "../../sdk/base/api"

const props = defineProps({
	filter: { type: Object as PropType<PageFilter>, default: { page: 0, perPage: 15 } },
	totalPages: { type: Number, default: 0 },
	allowExport: { type: Boolean, default: false },
	api: { type: Object as PropType<IBaseAPI>, default: {}}
})

const pageconfig: PaginationConfig = reactive({
	currentPage: props.filter.page + 1,
	totalPages: props.totalPages,
	allowExport: props.allowExport
})

const updateFilterProp = function () {
	props.filter.page = pageconfig.currentPage - 1
}

const next = function () {
	if (pageconfig.currentPage >= props.totalPages) {
		return
	}

	pageconfig.currentPage++
	updateFilterProp()
}

const prev = function () {
	if (pageconfig.currentPage === 1) {
		return
	}

	pageconfig.currentPage--
	updateFilterProp()
}

const last = function () {
	pageconfig.currentPage = pageconfig.totalPages
	updateFilterProp()
}

const first = function () {
	pageconfig.currentPage = 1
	updateFilterProp()
}

const exporting = ref(false)
const exportFunc = async function() {
	const filterClone = JSON.parse(JSON.stringify(props.filter))
	filterClone.perPage = -1
	filterClone.page = 0

	exporting.value = true
	console.log("exportFunc called ", props.api)
	const resp = await props.api.export(filterClone)
	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += await resp.text()
	const data = encodeURI(csvContent);
	const link = document.createElement("a");
	link.setAttribute("href", data);
	link.setAttribute("download", "exported-data.csv");
	link.click();

	exporting.value = false;
}

const pageInfo = computed(() => pageconfig.currentPage + ' of ' + pageconfig.totalPages)
const pageInfo2 = function(): string {
	return pageconfig.currentPage + ' of ' + pageconfig.totalPages
}

</script>