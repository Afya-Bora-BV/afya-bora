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
    user: 
        | undefined // User doesn't exist yet
        | User      // user exist and logged in
        | null      // user logged out
    login: () => Promise<void>

    /**
     * @Returns something
     * Error: something
     */
    signInWithPhoneNumber: (phoneNumber: string) => Promise<void>
    confirmPhoneCode: (code: string) => Promise<void>
}

const { Provider, useStore } = createContext<AuthStore>()

const createAuthStore = () => create<AuthStore>((set, get) => ({
    user: null,

    // THINK: appropriate might be `setUser`
    login: async () => {

        // create the fake user 
        set({
            user: {
                uid: "h9172",
                name: "George",
            } as User
        })
    },

    // Signing in for user
    signInWithPhoneNumber: async function (phoneNumber) {

    },

    // confirming code
    confirmPhoneCode: async function (code) {
        // create fake person after 2 seconds
        setInterval(() => {
            // NOTE: if user is set, it forces the state of `user` in the 
            //  `App.tsx -> <Main />` to change, thus forcing a login
            set({
                user: {
                    uid: "r31e4",
                    name: "Raghav",
                } as User
            })
        }, 2000)
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
