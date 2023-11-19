export class Transport {
	id_transport:number;
	tonnage:number;
	branch: number;
	active: boolean;
	maintenance: boolean;

	constructor(){
		this.active = false;
		this.branch = 0;
		this.maintenance = false;
	}
}