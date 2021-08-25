type DBDate = number | Date;
export type FacilityStatus = "active" | "inactive" | "removed"|"suspended"

interface Facility {
	state: string,
	id:string,
	name: string,
	geopoint: {
	   lat: string,
	   lng: string
	},
	street: string,
	rating: {
	   stars: number,
	   count: number
	},
	city: string,
	createdAt: {
	   _seconds: number,
	   _nanoseconds: number
	},
	country: string
}

type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};

export interface ConsultantProfile {
	id: string;
	uid: Uid;
	identifier: string;
	facilityId?: Facility["id"];
	name: string;
	gender: GenderType;
	phoneNumber?: string;
	email: string;
	residence: string;
	rating: number;
	ratedBy: number;
	clinicianType: string;
	specialities: string[];
}

interface RealTimeAppointment {
	id: string
	cid: string;
	consultant: ConsultantProfile;
	status: "pending" | "cancelled";
	patient: {
		name: string,
		gender: "male" | "female",
		bloodGroup: string
	}
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

type TimeRange = "morning" | "afternoon" | "evening" | "asubuhi" | "mchana" | "jioni";