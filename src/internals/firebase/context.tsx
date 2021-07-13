import React from 'react'
import create from 'zustand'
import createContext from 'zustand/context'


/**
 * User object
 */
 interface User {
    uid: string
    name: string
    image?: string
}

/**
 * Authentication store
 */
interface AuthStore {
    user: User | null
    login: () => Promise<void>
}

const { Provider, useStore } = createContext<AuthStore>()

const createAuthStore = () => create<AuthStore>((set, get) => ({
    user: null,
    login: async () => {

        // create the fake user 
        set({
            user: {
                uid: "h9172",
                name: "George",
            }
        })
    }
}))

interface AuthProviderProps { children?: React.ReactElement }
function AuthProvider ({ children }: AuthProviderProps) {
    return (
        <Provider createStore={createAuthStore}>
            { children }
        </Provider>
    )
}


export {
    useStore as useAuthStore,
    AuthProvider
}
