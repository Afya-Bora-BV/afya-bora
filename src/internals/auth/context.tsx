import React from 'react'
import create from 'zustand'
import createContext from 'zustand/context'
import { persist } from "zustand/middleware"

import AsyncStorage from '@react-native-async-storage/async-storage';
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

    signInWithEmailAndPassword: (email: string, password: string) => Promise<void>
    signInWithPhoneNumber: (phoneNumber: string) => Promise<void>
    confirmPhoneCode: (code: string) => Promise<void>
}

const { Provider, useStore } = createContext<AuthStore>()

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))


const createAuthStore = () => create<AuthStore>(persist((set, get) => ({
    user: null,

    // THINK: appropriate might be `setUser`
    signInWithEmailAndPassword: async function (email, password) {
        await sleep(3000)
        // TODO: fetch name and other related information
        // create the fake user 
        set({
            user: {
                uid: "asda",
                name: "George Millanzi",
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
}), {
    name: "authState",
    getStorage: () => AsyncStorage
}))

interface AuthProviderProps { children?: React.ReactElement }
function AuthProvider({ children }: AuthProviderProps) {
    return (
        <Provider createStore={createAuthStore}>
            {children}
        </Provider>
    )
}


export {
    useStore as useAuthStore,
    AuthProvider
}
