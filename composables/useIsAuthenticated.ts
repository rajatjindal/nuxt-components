import { fetchAuthDetails } from '@rajatjindal1983/crud-sdk'
import type { AuthDetails } from '@rajatjindal1983/crud-sdk'

export function useIsAuthenticated() {
    const { isAuthenticated }: AuthDetails = fetchAuthDetails()
    return { isAuthenticated }
}