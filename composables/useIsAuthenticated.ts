import { fetchAuthDetails } from 'sdk-try-2'
import type { AuthDetails } from 'sdk-try-2'

export function useIsAuthenticated() {
    const { isAuthenticated }: AuthDetails = fetchAuthDetails()
    return { isAuthenticated }
}