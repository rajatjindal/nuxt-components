import type { PagesMeta } from '../sdk/base/types'
import type { IBaseAPI } from '../sdk/base/api'

export function useFilter<F, R extends any[]>(oclass: IBaseAPI, inpFilter: F) {
    const items = ref<R>()
    const meta = ref<PagesMeta>({ PageCount: 0 })
    const loading = ref<Boolean>(false)
    const latency = ref<Number>(0)

    async function fetchLatestData(filter: typeof inpFilter) {
        console.log("inside data")
        items.value = await oclass.getAllItemsWithFilter(filter)
    }

    async function fetchLatestMeta(filter: typeof inpFilter) {
        console.log("inside meta")
        meta.value = await oclass.getAllItemsWithFilterMeta(filter)
    }

    // this helped: https://www.thisdot.co/blog/vue-3-composition-api-watch-and-watcheffect/
    watch(
        () => ({ ...inpFilter }),
        async (newFilter, oldFilter, onInvalidate) => {
            console.log("inside watch ", newFilter)
            loading.value = true
            const startTime = new Date();

            try {
                await Promise.all([fetchLatestMeta(inpFilter), fetchLatestData(inpFilter)])
            } catch(error) {
                console.log("error is ", error)
            }

            loading.value = false
            const endTime = new Date();
            latency.value = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());
        }
    );

    onMounted(async () => {
        console.log("inside mounted ", inpFilter)
        loading.value = true
        const startTime = new Date();

        try {
            await Promise.all([fetchLatestMeta(inpFilter), fetchLatestData(inpFilter)])
        } catch(error) {
            console.log("error is ", error)
        }
        

        loading.value = false
        const endTime = new Date();
        latency.value = Math.abs(endTime.getMilliseconds() - startTime.getMilliseconds());
    })

    return { items, meta, loading, latency }
}