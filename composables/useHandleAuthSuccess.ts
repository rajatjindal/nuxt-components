import { storeToken } from '@rajatjindal1983/crud-sdk'

export async function useHandleAuthSuccess() {
    console.log("inside useHandleAuthSuccess ")

    const raw = useRoute().hash
    const token = raw.replaceAll('#access-token=', '')

    if (token) {
        storeToken(token.toString())
        await useRouter().push("/")
        return true
    }

    return false
}