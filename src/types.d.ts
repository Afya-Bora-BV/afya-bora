type DBDate = number | Date;

type Consultant = {
	name: string
	gender: "male" | "female",
	facility: { name: string, address: string },
	clinicianType: string,
	specialities: string[],
	rating: number,
	ratedBy: number
};

type Rating = {
	stars: number;
	createdAt: DBDate;
	ratedById: string;
};
