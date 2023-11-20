import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transport } from '../models/transport.model';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  // Método para enviar una nueva rama al servidor
  addShipment(shipment: Shipment) {
    return this.http.post(`${this.apiUrl}/newShipment`, shipment);
  }

}