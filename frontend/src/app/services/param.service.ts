import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Param } from '../models/param.model';

@Injectable({
  providedIn: 'root',
})
export class ParamService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  getParams(){
    return this.http.get(`${this.apiUrl}/getParams`);
  }

  getDataPrices(){
    return this.http.get(`${this.apiUrl}/getDataPrices`);
  }

  updateParam(toUpdate:Param){
	return this.http.put(`${this.apiUrl}/updateParam`,toUpdate);
  }
}