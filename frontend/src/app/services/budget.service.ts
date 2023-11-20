import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private BASE_URL = 'http://localhost:3000/api/budget';

  constructor(private http: HttpClient) {}

  createBudget(budgetInfo: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/createBudget`, budgetInfo);
  }

  updateBudgetAmount(month_year: string, newAmount: number): Observable<any> {
    return this.http.put(`${this.BASE_URL}/updateBudgetAmount`, { month_year, newAmount });
  }

  getAllBudgets(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getAllBudgets`);
  }

  getBudgetByMonthYear(month_year: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getBudgetByMonthYear/${month_year}`);
  }

  getBudgetsByYear(year: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getBudgetsByYear/${year}`);
  }

  getBudgetsBetweenMonths(start_month_year: string, end_month_year: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getBudgetsBetweenMonths/${start_month_year}/${end_month_year}`);
  }
}
