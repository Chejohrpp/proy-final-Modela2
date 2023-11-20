export class Shipment {
	id_shipment: number;
	origin: number;
	destiny: number;
	volume: number;
	max_time: number;
	weight:number;
	payment: number;
	status: boolean;
	date: string;

	constructor() {
		this.date = new Date().toISOString().split('T')[0];
		this.status = true;
	}
}