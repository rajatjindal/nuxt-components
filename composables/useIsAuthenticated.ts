import { fetchAuthDetails } from '../sdk/auth/auth'
import type { AuthDetails } from '../sdk/auth/auth'

export function useIsAuthenticated() {
    const { isAuthenticated }: AuthDetails = fetchAuthDetails()
    return { isAuthenticated }
}