export class Branch {
	id_branch:number;
	address: string;
	location: string;
	name: string;
}

export class PointNear {
	id_point_near: number;
	origin: number;
	destiny: number;
	distance: number;
	active: boolean;
	time: number;

	constructor(){
		this.active = false;
	}
}

export class PointNearRequest {
	points: PointNear[] = [];
}