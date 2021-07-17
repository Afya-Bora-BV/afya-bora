import React from "react";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

import AsyncStorage from '@react-native-async-storage/async-storage';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import produce from "immer";

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
const AFYABORA_USER_PROFILES = afyaBoraStoreKey('user.profiles')

interface AuthStore {
    user:
        | null      // User not in
        | User      // user exist and logged in
    
    // Profile
    // --------------------
    currentProfile: UserProfile | undefined
    setProfile: (profile: UserProfile) => void
    addProfile: (profile: UserProfile) => Promise<void>
    applyProfile: (profileId: number) => Promise<void>
    fetchProfile: (uid: string, profileType: 'patient' | 'doctor') => Promise<PatientProfile[] | ConsultantProfile[]>
    getProfiles: () => Promise<Array<UserProfile>>

    // Login information
    // --------------------
    signInWithEmailAndPassword: (email: string, password: string) => Promise<User>
    signInWithPhoneNumber: (phoneNumber: string, code: string) => Promise<User>
    signUpWithPhoneNumber: (phoneNumber: string) => Promise<(code: string) => Promise<User>>
    verifyPhoneNumber: (phoneNumber: string, code: string) => Promise<User>
    
    signOut: () => Promise<void>

    getVerificationCode: () => Promise<string | undefined>
    setVerificationCode: (code: string) => Promise<void>

    //#private
    _setUser: (u: FirebaseAuthTypes.UserCredential) => User
}

const reshapeUser = (uc: FirebaseAuthTypes.UserCredential): User => {
    let { email: emailAsIs, phoneNumber, photoURL: image, displayName: name, uid } = uc.user
    let { isNewUser: isNew = false } = uc.additionalUserInfo || {}

    return {
        uid,
        email: emailAsIs,
        phoneNumber,
        image,
        name, 
        isNew
    }
}

const fetchPatientProfiles = async (uid: string) => {
    const collectionRef = firestore().collection('patients')
    const patientProfiles = await collectionRef.get({ source: 'server' })
    const existingPatientProfileDocs = patientProfiles.docs.filter(d => d.exists)
    return existingPatientProfileDocs
            .map(d => d.data() as PatientProfile)
            .filter(d => d.uid ===  uid)
}
const fetchConsultantProfiles = async (uid: string) => {
    const collectionRef = firestore().collection('patients')
    const patientProfiles = await collectionRef.get({ source: 'server' })
    const existingPatientProfileDocs = patientProfiles.docs.filter(d => d.exists)
    return existingPatientProfileDocs
            .map(d => d.data() as ConsultantProfile)
            .filter(d => d.uid ===  uid)
}

const {Provider, useStore} = createContext<AuthStore>();
const createAuthStore = () => {
    return create<AuthStore>(
        // persist(
            (set, get) => ({
            // user: null,
            user: {
                name: "Test Patient",
                email: "raghav@testpatient.com",
                uid: "o2e9Z7WMAXhk8kro6QPAAUPho763",
                image: null,
                isNew: false,
                phoneNumber: null,
            },

            // ----------------------
            currentProfile: undefined,

            fetchProfile: async function (uid, profileType) {
                switch (profileType) {
                    case 'doctor':
                        return await fetchConsultantProfiles(uid)
                    case 'patient':
                        return await fetchPatientProfiles(uid)
                    default:
                        throw Error("Profile should either for `patient` or `doctor`")
                }
            },
            setProfile: (profile) => {
                console.debug({ profile })
                set({ currentProfile: profile })
                // NOTE: might need to add the back to phone state... because reasons
            },
            getProfiles: async function () {
                const c = await AsyncStorage.getItem(AFYABORA_USER_PROFILES)
                return c !== null ? JSON.parse(c) : []
            },
            addProfile: async function (profile) {
                const profiles = await get().getProfiles()
                const newProfiles = produce(profiles, df => {
                    df.push(profile)
                    return df
                });

                await AsyncStorage.setItem(
                    AFYABORA_USER_PROFILES, JSON.stringify(newProfiles)
                )
            },
            applyProfile: async function (profileId: number) {
                const profiles = await get().getProfiles()
                console.debug({ profileId })
                set({ currentProfile: profiles[profileId] })
            },

            // ----------------------
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

                    // set user
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
            verifyPhoneNumber: async function (phoneNumber, code) {

                const au = await auth().signInWithPhoneNumber(phoneNumber)
                const out = await au.confirm(code)

                if (out === null) {
                    throw `Unable to verify for <${phoneNumber}>.`
                }

                // set the ser
                return get()._setUser(out)
            },

            _setUser: (uc) => {
                const user = reshapeUser(uc)
                set({ user })
                return user
            },

            // demo signout
            signOut: async () => {
                // reset user
                set({ user: null, currentProfile: undefined })

                // remove
                await auth().signOut()
            }
        }),
        // {
        //     name: "authState",
        //     getStorage: () => AsyncStorage
        // })
    )
}

interface AuthProviderProps { children?: React.ReactElement }
function AuthProvider({ children }: AuthProviderProps) {
	return <Provider createStore={createAuthStore}>{children}</Provider>;
}

export { useStore as useAuthStore, AuthProvider };
