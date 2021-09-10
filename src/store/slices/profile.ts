import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Facility, TimeRange } from "../../types";
import { toggleStringFromList } from "../../utils";
// import firestore from "@react-native-firebase/firestore"

type DobString = string;

export interface Profile {
	id: string;
	uid: string;
	name: string;
	gender: "male" | "female";
	bloodGroup: string;
	dob: DobString;
	height: number;
	location: string;
	weight: number;
	type: "patient";
	loggedIn: boolean;
}

// export type ProfileState = null | Profile;

const initialState: Profile = {
	id: "",
	uid: "",
	name: "",
	gender: "male",
	bloodGroup: "",
	dob: "",
	height: 0,
	weight: 0,
	location: "",
	type: "patient",
	loggedIn: false,
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile: (state: Profile, action: PayloadAction<Profile>) => {
			state = action.payload;
		},
		clearProfile: (state: Profile) => {
			state = { ...initialState };
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
