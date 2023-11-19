import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMaintenanceRequest } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  // Método para enviar una nueva rama al servidor
  addPaymentMaintenance(request: PaymentMaintenanceRequest) {
    return this.http.post(`${this.apiUrl}/newPaymentMaintenance`, request);
  }

  toMaintenance(transport:any){
	return this.http.post(`${this.apiUrl}/maintenance`, transport);
  }
}