import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transport } from '../models/transport.model';

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  // Método para enviar una nueva rama al servidor
  addTransport(transportData: Transport) {
    return this.http.post(`${this.apiUrl}/newTransport`, transportData);
  }

  getTransports(){
    return this.http.get(`${this.apiUrl}/listTransport`);
  }
}