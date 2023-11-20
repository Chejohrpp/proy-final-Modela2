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

  createExpense(expense:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/insertExpense`,expense)
  }
  
  getPaymentExpenseByTypeCurrentMoth(data:string): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getPaymentExpenseByTypeCurrentMoth/${data}`)
  }

  totalBranchExpensesMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/totalBranchExpensesMonth/`)
  }

  totalSpecialsExpensesMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/totalSpecialsExpensesMonth/`)
  }
  
  calculateBudgetVsExpenses(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/calculateBudgetVsExpenses/`)
  }

  getNewShipmentsThisMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getNewShipmentsThisMonth/`)
  }

  getEarningsThisMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getEarningsThisMonth/`)
  }

  getDeliveredShipmentsThisMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getDeliveredShipmentsThisMonth/`)
  }

  getTotalExtraHoursThisMonth(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getTotalExtraHoursThisMonth/`)
  }

  getTableHonorarium(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getTableHonorarium/`)
  }
  
  inserthonorarium(honorario:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/inserthonorarium`,honorario)
  }
  
  getemployeesSalary(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getemployeesSalary`)
  }
  
  getNotAssignmentSalaryByBranch(branch:any): Observable<any>{
    return this.http.get(`${this.BASE_URL}/getNotAssignmentSalaryByBranch/${branch}`)
  }
  
  createRole(role:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/createRole`,role)
  }
  
  createRoleBranch(rolebranch:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/createRoleBranch`,rolebranch)
  }
}
