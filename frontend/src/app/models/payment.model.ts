export class Payment {
	id_payment:number;
	type:string;
	date:string;
	amount:number;
}

export class PaymentSpecial {
	id_payment:number;
	name:string;
	description: string;
}

export class PaymentMaintenanceRequest {
	payment: Payment;
	special: PaymentSpecial;
	transport: number;
}