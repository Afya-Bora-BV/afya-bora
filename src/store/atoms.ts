import { atom } from "jotai";

/**
 * Persisted Language atom through out the app.
 *
 * @type {*}
 * */
export const languageAtom = atom<"sw" | "en">("en");

// FIXME: add persistance to this state variable
