export class PointAssignment {
	id_point_assignment:number;
	id_point:number;
	id_route:number;
	sequence:number;
	start_origin:boolean;

	constructor(){

	}
}

export class RouteRequest {
	pointAssignments: PointAssignment[] = [];
	route: RouteModel;
}

export class RouteModel {
	id_route:number;
	name:string;
	steps: number;
	
	constructor(){

	}
}