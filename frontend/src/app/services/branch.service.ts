import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = 'http://localhost:3000/branch'; // Reemplaza con la URL de tu servidor Express

  constructor(private http: HttpClient) {}

  // Método para enviar una nueva rama al servidor
  addBranch(branchData: any) {
    return this.http.post(`${this.apiUrl}/new`, branchData);
  }

  getBranches(){
    return this.http.get(`${this.apiUrl}/list`);
  }
}