import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Facility, TimeRange } from "../../types";
import { toggleStringFromList } from "../../utils";
// import firestore from "@react-native-firebase/firestore"

type DobString = string
export interface Profile {
    id: string
    name: string,
    gender: "male" | "female",
    bloodGroup: string,
    dob: DobString,
    height: number,
    location: string,
    weight: number
    type: "patient"
}

export interface ProfileState {
    profile: null | Profile
}

const initialState: ProfileState = {
    profile: null
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state: ProfileState, action: PayloadAction<Profile>) => {
            state.profile = action.payload
        },
        clearProfile: (state: ProfileState) => {
            state.profile = null
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    updateProfile,
    clearProfile
} = profileSlice.actions;

export default profileSlice.reducer;
