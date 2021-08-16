import axios from "axios";
import functions from "@react-native-firebase/functions";

// FIXME: Remove this
export const API_ROOT = "https://afya-bora-api.herokuapp.com";

interface ConsultantDetails {
	id: string;
	name: string;
	gender: "male" | "female";
	clinicianType: string;
	specialities: string[];
	rating: number;
	ratedBy: number;
}

interface AppointmentDetails {
	id: string;
	cid: string;
	pid: string;
	date: string;
	status: "pending" | "cancelled" | "confirmed";
	type: "offline" | "online";
	aboutVisit: {
		complaint: string[];
		symptoms: string[];
	};
	trl_facility?: {
		address: string;
		geopoint: {
			lat: number;
			lng: number;
		};
		name: number;
		rating: {
			stars: number;
			count: number;
		};
	};
	createdAt: {
		_seconds: number;
		_nanoseconds: number;
	};
	facility: {
		id: string;
		name: string;
		geopoint: {
			lat: number;
			lng: number;
		};
		address: string;
		rating: {
			stars: string;
			count: string;
		};
	};
	consultant?: ConsultantDetails;
	patient: {
		name: string;
		bloodGroup: string;
		gender: "male" | "female";
		phoneNumber: string;
		dob: string;
	};
}

export const getAppointmentDetails = async ({
	cid,
	pid,
}: {
	cid: string;
	pid: string;
}): Promise<AppointmentDetails[]> => {
	console.log(
		"Link ",
		`${API_ROOT}/v0/data/appointments?consultantId=${cid}&patientId=${pid}`
	);
	const res = await axios.get<AppointmentDetails>(
		`${API_ROOT}/v0/data/appointments?consultantId=${cid}&patientId=${pid}`
	);
	const consultants: AppointmentDetails = await res.data.data;
	return consultants;
};

interface AppointmentRequestBody {
	// id: string;
	pid: string;
	fid: string;
	timeRange: "morning" | "afternoon" | "evening";
	aboutVisit: {
		symptoms: string[];
		complaint: string;
	};
	// status: "pending" | "accepted" | "rejected";
	type: "online" | "in-person";
	// This only exists when there is an appointment
	//  is accepted
	// appointmentId?: Appointment['id']
}

export const requestAppointment = async (
	appointmentRequest: AppointmentRequestBody
): Promise<any> => {
	// console.log("Link ", `${API_ROOT}/v0/data/appointments/request`)
	const res = await axios.post<any>(
		`${API_ROOT}/v0/create/request-appointment`,
		appointmentRequest
	);
	return res.data;
};

export const getFacilities = async (): Promise<any> => {
	const result = await functions().httpsCallable("getFacilities")({});

	if (result && result.data) {
		return result.data;
	}

	// FIXME: potentially just return the error
	console.log("Error: Unable to get list of facilities");
	return { count: 0, data: [] };
};
