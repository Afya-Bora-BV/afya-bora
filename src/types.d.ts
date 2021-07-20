type DBDate = number | Date;

type Consultant = {
	cid: string;
	email: string;
	facilityId: string;
	gender: "male" | "female";
	name: string;
	rating: number;
	specialities: string[];
	ratedBy: number;
};

type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};
