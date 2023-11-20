import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PointNearRequest } from '../models/branch.model';
import { RouteRequest } from '../models/route.model';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) { }

  // Método para enviar una nueva rama al servidor
  addPointsNear(points: PointNearRequest) {
    return this.http.post(`${this.apiUrl}/newPointsNear`, points);
  }

  getPointsNear() {
    return this.http.get(`${this.apiUrl}/listPointsNear`);
  }

  saveRoute(newRouteRequest: RouteRequest) {
    return this.http.post(`${this.apiUrl}/newPointAssignment`, newRouteRequest);
  }

  getRoutes() {
    return this.http.get(`${this.apiUrl}/getRoutes`);
  }
}