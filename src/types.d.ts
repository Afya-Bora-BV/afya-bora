type DBDate = number | Date;
export type FacilityStatus = "active" | "inactive" | "removed" | "suspended";

export interface Consultant {
	id: string;
	name: string;
	phoneNumber: string;
	residence: string;
	facilityId: string;
	email: string;
	clinicianType: string;
	specialities: string[];
	specialties: string[];
	type: "consultant";
}

export type Appointment = {
	patient: {
		name: string;
		id: string;
		telephone: string;
		uid: string;
	};
	aboutVisit: {
		symptoms: string[];
		complaint: string;
	};
	updatedAt: {
		seconds: number;
		nanoseconds: number;
	};
	fid: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	date: {
		seconds: number;
		nanoseconds: number;
	};
	pid: string;
	utcDate: string;
	timeRange:
	| "morning"
	| "afternoon"
	| "evening"
	| "asubuhi"
	| "mchana"
	| "jioni";
	facility: {
		address: string;
		name: string;
	};
	status: "pending" | "accepted" | "cancelled" | "rejected";
	type: "offline" | "online";
	id: string;
	consultant?: Consultant;
	callRoomId?: string,
	callRoom?: {
		id: string;
		name: string;
		enabled: boolean;
		description: string;
		customer: string;
		recording_info: {
			enabled: boolean;
		};
		template_id: string;
		region: string;
		created_at: string;
		updated_at: string;
	};
};

interface Facility {
	state: string;
	id: string;
	name: string;
	geopoint: {
		latitude: number;
		longitude: number;
	};
	street: string;
	rating: {
		stars: number;
		count: number;
	};
	city: string;
	createdAt: {
		_seconds: number;
		_nanoseconds: number;
	};
	services: Array<string>;
	specialties: Array<string>;
	startPrice: number;
	endPrice: number;
	country: string;
	photoUrl?: string;
}

type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};

interface RealTimeAppointment {
	id: string;
	cid: string;
	status: "pending" | "cancelled";
	patient: {
		name: string;
		gender: "male" | "female";
		bloodGroup: string;
	};
	aboutVisit: {
		complaint: string;
		symptoms: string[];
	};
	facilityId: string;
	type: "offline" | "online";
	facility?: {
		geopoint: {
			lat: number;
			lng: 39.2807287;
		};
		rating: {
			stars: number;
			count: number;
		};
		name: string;
		address: string;
	};
	pid: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	date: {
		seconds: number;
		nanoseconds: number;
	};
}

interface PatientProfile {
	bloodGroup: "A+" | "B+" | "AB+" | "O+" | "A-" | "B-" | "AB-" | "O-";
	pid: string;
	id: string;
	gender: "male" | "female";
	dob: Date;
	height: string;
	name: string;
	phoneNumber: string;
	residence: string;
	type: "patient";
	weight: string;
	email: string;
}

type TimeRange =
	| "morning"
	| "afternoon"
	| "evening"
	| "asubuhi"
	| "mchana"
	| "jioni";
