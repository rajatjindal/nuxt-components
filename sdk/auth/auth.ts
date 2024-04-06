export interface AuthDetails {
    isAuthenticated: boolean,
    token?: string
}

const runtimeConfig = useRuntimeConfig().public.baseURL
const baseURL = runtimeConfig


export const fetchAuthDetails = function (): AuthDetails {
    const token = localStorage.getItem('auth-token')?.trim();
    if (!token) {
        const details: AuthDetails = {
            isAuthenticated: false,
        }

        return details
    }

    const details: AuthDetails = {
        isAuthenticated: true,
        token: token
    }

    return details
}

export const logout = async function () {
    const loginURL = baseURL + "/auth/login"
    localStorage.removeItem('auth-token')
    await navigateTo(loginURL, {
        external: true
    })
}

export const login = async function () {
    const loginURL = baseURL + "/auth/login"
    await navigateTo(loginURL, {
        external: true
    })
}

export const storeToken = function (token: string) {
    localStorage.setItem('auth-token', token);
}