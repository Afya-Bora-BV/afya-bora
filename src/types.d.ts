type DBDate = number | Date;

interface Facility {
	id: string
	name: string
	geopoint: {
		lat: number
		lng: number
	}
	address: string
	imageUrl?: string
	rating: {
		stars: number // 4.5
		count: number // 934
	}
}


type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};

export interface ConsultantProfile {
	id: string
	uid: Uid
	identifier: string
	facilityId?: Facility['id']
	name: string
	gender: GenderType
	phoneNumber?: string
	email: string
	residence: string,
	rating: number
	ratedBy: number
	clinicianType: string
	specialities: string[]
}


interface RealTimeAppointment {
	cid: string,
	consultant: ConsultantProfile,
	aboutVisit: {
		complaint: string,
		symptoms: string[]
	},
	facilityId: string,
	type: "offline" | "online",
	trl_facility?: {
		geopoint: {
			lat: number,
			lng: 39.2807287
		},
		rating: {
			stars: number,
			count: number
		},
		name: string,
		address: string
	},
	pid: string,
	createdAt: {
		seconds: number,
		nanoseconds: number
	},
	date: {
		seconds: number,
		nanoseconds: number
	}
}
