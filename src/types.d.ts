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
