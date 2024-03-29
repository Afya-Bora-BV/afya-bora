import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConsultantionType } from "../../internals/data";
import { Facility, TimeRange } from "../../types";
import { isValidDate, toggleStringFromList } from "../../utils";
// import firestore from "@react-native-firebase/firestore"

export interface AppointmentState {
	facility: Facility | null;
	// consultant: {
	// 	name: string;
	// 	clinicianType: string;
	// 	specialities: string[];
	// };
	type: ConsultantionType;
	date: number;
	timeRange: TimeRange;
	location: string;
	speciality: string;
	aboutVisit: {
		symptoms: string[];
		complaint: string;
	};
}

const timeStampNow = new Date().getTime();

const initialState: AppointmentState = {
	facility: null,
	type: "offline",
	location: "",
	speciality: "",
	timeRange: "morning",
	date: timeStampNow,
	aboutVisit: {
		symptoms: [],
		complaint: "",
	},
};

export const appointmentSlice = createSlice({
	name: "appointment",
	initialState,
	reducers: {
		setAppointmentType: (
			state: AppointmentState,
			action: PayloadAction<ConsultantionType>
		) => {
			state.type = action.payload;
		},
		setSpeciality: (state, action: PayloadAction<string>) => {
			state.speciality = action.payload;
		},
		setLocation: (state, action: PayloadAction<string>) => {
			return { ...state, location: action.payload };
		},
		setFacility: (state, action: PayloadAction<Facility>) => {
			state.facility = action.payload;
		},
		setDate: (state, action: PayloadAction<Date | Number>) => {
			if (isValidDate(action.payload)) {
				state.date = new Date(action.payload).getTime();
			} else {
				throw new Error("Attempted to set invalid date");
			}
		},
		setTimeRange: (state, action: PayloadAction<TimeRange>) => {
			state.timeRange = action.payload;
		},
		toggleSymptom: (state, action: PayloadAction<string>) => {
			state.aboutVisit.symptoms = toggleStringFromList(
				action.payload,
				state.aboutVisit.symptoms
			);
		},
		setComplaint: (state, action: PayloadAction<string>) => {
			state.aboutVisit.complaint = action.payload;
		},

		resetAppointmentState: (state) => {
			Object.assign(state, initialState);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setFacility,
	setSpeciality,
	setAppointmentType,
	setLocation,
	setDate,
	setTimeRange,
	toggleSymptom,
	setComplaint,
	resetAppointmentState,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
