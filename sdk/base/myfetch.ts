import { ofetch } from 'ofetch'
import { fetchAuthDetails } from '../auth/auth'
import EventBus from './eventbus'

const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.public ? runtimeConfig.public.baseURL as string : ""

export const myfetch = ofetch.create({
    baseURL: baseURL,
    retry: 0,
    async onRequest({ request, options }) {
        console.log('[fetch request]', `[${JSON.stringify(options)} ${request}]`)

        const raw = JSON.stringify(options.headers)
        let headers = raw && raw !== '' ? JSON.parse(raw) : {}
        
        const authDetails = fetchAuthDetails()
        headers['Authorization'] = `Bearer ${authDetails.token}`
        
        options.headers = headers;
    },
    onRequestError: function ({ request, options, error }) { 
        console.log(error)
    },
    onResponse: function ({ request, response, options }) { },
    onResponseError: function ({ request, response, options, error }) {
        if (response.status === 401) {
            console.error('[fetch response error unauthorized]', response.status, response.body, error);
            EventBus.emit('error', "Your session has timedout, login again")
            return
        }

        if (response.status === 403) {
            console.error('[fetch response error unauthorized]', response.status, response.body, error);
            EventBus.emit('error', "You are not authorized to access this. please contact administrator")
            return
        }

        if (response.status === 500) {
            console.error('[fetch response error unauthorized]', response.status, response.body, error);
            if (response._data) {
                EventBus.emit('error', response._data)
            } else {
                EventBus.emit('error', "something didn't work as planned. please contact administrator")
            }
            return
        }

        console.error('[fetch response error]', response.status, response.body, error);
        EventBus.emit('error', error)
    },
})