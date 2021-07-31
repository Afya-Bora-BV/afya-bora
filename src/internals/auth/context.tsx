import React from "react";
import create from "zustand";
import createContext from "zustand/context";
import { persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, ToastAndroid } from "react-native";
import auth from "@react-native-firebase/auth";

/**
 * User object
 */

type Gender = "male" | "female"
export interface User {
    uid: string;
    id: string;
    name: string;
    phone: string;
    email?: string;
    gender: Gender;
    dob: Date; //change to date
    height: number;
    weight: number;
    bloodGroup: string;
    residence: string;
    phoneNumber: string
    type: "patient";
}
export interface Patient {
    bloodGroup: string,
    dob: string,
    gender: Gender,
    height: string,
    id: string,
    location: string,
    name: string,
    weight: string
}

export interface Consultant {
    uid: string;
    id: string;
    clinicianType: string
    createdAt: string
    email: string
    facilityId: string
    identifier: string
    name: string
    phoneNumber: string
    ratedBy: number
    rating: number
    residence: string
    specialities: string
    type: "doctor"
}

// its safe to delete 'user' now, its been replaced with 'profile'
interface AuthStore {
    user:
    | undefined // User doesn't exist yet
    | User // user exist and logged in
    | null; // user logged out

    userExists: true | false;
    confirm: any;
    phone: string;
    profile: User | Consultant | null;
    profileType: "patient" | "consultant" | ""
    updateProfileType: (type: "patient" | "consultant" | "") => void
    updateProfile: (profile: User | Consultant) => void
    clearProfile: () => void
    signInWithEmailAndPassword: (
        email: string,
        password: string
    ) => Promise<void>;
    signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
    confirmPhoneCode: (code: string) => Promise<void>;
    signOut: () => Promise<void>;
    registerUser: (data: any) => Promise<void>;
    updatePhoneNumber: (phone: string) => void;
}

const { Provider, useStore } = createContext<AuthStore>();

// method to check if the user exists in database
// the user dont login untill we make sure his details exist

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

const createAuthStore = () =>
    create<AuthStore>(
        persist(
            (set, get) => ({
                user: null,
                userExists: false,
                confirm: null,
                phone: "",
                profile: null,
                profileType: "",
                updateProfileType: (type: "patient" | "consultant" | "") => {
                    set({ profileType: type })
                },
                updateProfile: (profile: User | Consultant) => {
                    set({ profile: profile })
                },
                clearProfile: () => {
                    set({ profile: null })
                },
                updatePhoneNumber: (phone: string) => {
                    set({ phone: phone })
                },
                registerUser: async () => { },
                // THINK: appropriate might be `setUser`
                signInWithEmailAndPassword: async function (
                    email: string,
                    password: string
                ) { },

                // demo signout
                signOut: async () => {
                    // await auth().signOut()
                    // await sleep(3000)
                    set({ user: null, confirm: null, phone: "" });
                },
                // Signing in for user
                signInWithPhoneNumber: async function (phone) {

                },

                // confirming code
                confirmPhoneCode: async function (code) {


                },
            }),
            {
                name: "authState",
                getStorage: () => AsyncStorage,
            }
        )
    );

interface AuthProviderProps {
    children?: React.ReactElement;
}
function AuthProvider({ children }: AuthProviderProps) {
    return <Provider createStore={createAuthStore}>{children}</Provider>;
}

export { useStore as useAuthStore, AuthProvider };
