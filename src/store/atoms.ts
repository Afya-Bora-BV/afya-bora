import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Persisted Language atom through out the app.
 *
 * @type {*}
 * */
type Unsubscribe = () => void

type Storage<Value> = {
    getItem: (key: string) => Value | Promise<Value>
    setItem: (key: string, newValue: Value) => void | Promise<void>
    delayInit?: boolean
    subscribe?: (key: string, callback: (value: Value) => void) => Unsubscribe
}

type StringStorage = {
    getItem: (key: string) => string | null | Promise<string | null>
    setItem: (key: string, newValue: string) => void | Promise<void>
}



const defaultStorage = createJSONStorage(() => AsyncStorage)

export const languageAtom = atomWithStorage<"sw" | "en">('language', "en", defaultStorage);
export const showOnboardAtom = atomWithStorage<Boolean>('onboard', true, defaultStorage);
// export const languageAtom = atom<"sw" | "en">("en");


// FIXME: add persistance to this state variable
