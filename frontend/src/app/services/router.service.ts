import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PointNearRequest } from '../models/branch.model';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  // Método para enviar una nueva rama al servidor
  addPointsNear(points: PointNearRequest) {
    return this.http.post(`${this.apiUrl}/newPointsNear`, points);
  }
}