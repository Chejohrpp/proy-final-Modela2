import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private BASE_URL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getRolesSalaryByBranch(branch:any): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getRolesSalaryByBranch/${branch}`)
  }

  getAllBranchEmployee(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getallbranchemployee`)
  }

  createEmployee(employee:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/createEmployee`,employee)
  }
}
