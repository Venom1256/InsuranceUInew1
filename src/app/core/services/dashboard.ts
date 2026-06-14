import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:44393/api/v1/Dashboard';

  constructor(private http: HttpClient) { }

  getDashboard() {
    return this.http.get<any>(this.apiUrl);
  }
}