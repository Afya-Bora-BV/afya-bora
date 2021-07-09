type DBDate = number | Date;

type Consultant = {
	id: string;
	name: string;
	hospital: string;
	region: string;
	expertise: string;
};

type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};
