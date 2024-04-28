import type { PagesMeta } from '@rajatjindal1983/crud-sdk'
import type { IBaseAPI } from '@rajatjindal1983/crud-sdk'

export function useFilter<F, R extends any[]>(oclass: IBaseAPI, inpFilter: F) {
    const items = ref<R>()
    const meta = ref<PagesMeta>({ PageCount: 0 })
    const loading = ref<Boolean>(false)
    const latency = ref<Number>(0)

    async function fetchLatestData(filter: typeof inpFilter) {
        items.value = await oclass.getAllItemsWithFilter(filter)
    }

    async function fetchLatestMeta(filter: typeof inpFilter) {
        meta.value = await oclass.getAllItemsWithFilterMeta(filter)
    }

    // this helped: https://www.thisdot.co/blog/vue-3-composition-api-watch-and-watcheffect/
    watch(
        () => ({ ...inpFilter }),
        async (newFilter: F, oldFilter: F, onInvalidate: any) => {
            loading.value = true
            const startTime = new Date();

            try {
                await Promise.all([fetchLatestMeta(newFilter), fetchLatestData(newFilter)])
            } catch (error) {
                console.log("error is ", error)
            }

            loading.value = false
            const endTime = new Date();
            latency.value = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());
        }
    );

    onMounted(async () => {
        loading.value = true
        const startTime = new Date();

        try {
            await Promise.all([fetchLatestMeta(inpFilter), fetchLatestData(inpFilter)])
        } catch (error) {
            console.log("error is ", error)
        }


        loading.value = false
        const endTime = new Date();
        latency.value = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());
    })

    return { items, meta, loading, latency }
}