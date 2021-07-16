import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';
import {persist} from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

/**
 * User object
 */
interface User {
  uid: string;
  email: string | null;
  name: string | null;
  phoneNumber: string | null;
  image: string | null;
  isNew: boolean;
}

/**
 * Authentication store
 */

// const demoUsers = [{
//     uid: "ASa",
//     name: "George Millanzi",
//     phone: "+255692100918",
//     gender: "Male",
//     dob: "12/12/2001",
//     height: 12,
//     weight: 12,
//     bloodGroup: "0",
//     residence: "Arusha"
// }]


// method to check if the user exists in database
// the user dont login untill we make sure his details exist 

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
const afyaBoraStoreKey = (addon: string) => `AFYA-BORA-AUTH-STATE-ITEM.${addon}`
const AFYABORA_VERFICATION_CODE = afyaBoraStoreKey('vCode')

interface AuthStore {
    user:
        | null      // User not in
        | User      // user exist and logged in
    // userExists: true | false
    // confirm: any
    // phone: string
    // demoUsers: typeof demoUsers
    signInWithEmailAndPassword: (email: string, password: string) => Promise<User>
    signInWithPhoneNumber: (phoneNumber: string, code: string) => Promise<User>
    signUpWithPhoneNumber: (phoneNumber: string) => Promise<(code: string) => Promise<User>>
    // confirmPhoneCode: (code: string) => Promise<void>
    signOut: () => Promise<void>
    // registerUser: (data: any) => Promise<void>
    // isNewUser: (phone: string) => boolean
    // getUserDetails: (phone: string) => User | undefined

    getVerificationCode: () => Promise<string | undefined>
    setVerificationCode: (code: string) => Promise<void>

    //#private
    _setUser: (u: FirebaseAuthTypes.UserCredential) => User
}

const {Provider, useStore} = createContext<AuthStore>();

const createAuthStore = () => create<AuthStore>(persist((set, get) => ({
    user: null,
    // userExists: false,
    // confirm: null,
    // phone: "",
    // demoUsers: [
    //     ...demoUsers
    // ],
    // isNewUser: (phone: string) => {
    //     return true
    //     // const user = get().demoUsers.filter(user => user.phone === phone)
    //     // console.log("User  : ", phone)
    //     // return Boolean(user[0])
    // },
    // getUserDetails: (phone: string) => {
    //     // const user = get().demoUsers.filter(user => user.phone === phone)
    //     // console.log("User  : ", phone)
    //     // return user[0]
    //     return get().user || undefined
    // },

    getVerificationCode: async () => (await AsyncStorage.getItem(AFYABORA_VERFICATION_CODE) || undefined),
    setVerificationCode: async (code: string) => await AsyncStorage.setItem(AFYABORA_VERFICATION_CODE, code),

    signInWithEmailAndPassword: async function (email, password) {
        const val = await auth().signInWithEmailAndPassword(email, password)
        return get()._setUser(val)
    },

    signUpWithPhoneNumber: async function (phoneNumber) {
        let au = await auth().signInWithPhoneNumber(phoneNumber, true)

        // Expose function that would then require passcode to be sent
        return async function (code: string) {
            let out = await au.confirm(code)

            if (out === null) {
                throw Error(`Unable to verify for <${phoneNumber}>.`)
            }

            // set the ser
            return get()._setUser(out)
        }
    },

    // Signing in for user
    signInWithPhoneNumber: async function (phoneNumber, code) {
        // await sleep(2000)
        // TODO: fetch name and other related information
        // create the fake user 

        const au = await auth().signInWithPhoneNumber(phoneNumber)
        const out = await au.confirm(code)

        if (out === null) {
            throw `Unable to verify for <${phoneNumber}>.`
        }

        // set the ser
        return get()._setUser(out)
    },

    // confirming code
    // confirmPhoneCode: async function (code) {
    //     // create fake person after 2 seconds
    //     // await sleep(3000)
    //     try {
    //         if (get().confirm === code) {
    //             const user = get().getUserDetails(get().phone)
    //             set({
    //                 user: user,
    //                 confirm: null
    //             })
    //         } else {
    //             ToastAndroid.show("Invalid confirmation code", ToastAndroid.LONG)
    //         }

    //         // assuming everything went right
    //         // get the user with given phone number

    //     } catch (error) {
    //         console.log('Invalid code.');
    //         ToastAndroid.show("Invalid confirmation code", ToastAndroid.LONG)
    //     }
    // },

    _setUser: (uc) => {
        let { email: emailAsIs, phoneNumber, photoURL: image, displayName: name, uid } = uc.user
        let { isNewUser: isNew = false } = uc.additionalUserInfo || {}

        const user = {
            uid,
            email: emailAsIs,
            phoneNumber,
            image,
            name, 
            isNew
        }
        set({ user })

        return user
    },

    // demo signout
    signOut: async () => {
        await auth().signOut()

        // reset user
        set({ user: null })
    },
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

export {useStore as useAuthStore, AuthProvider};
