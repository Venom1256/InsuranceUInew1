import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl =
    'https://localhost:44393/api/v1/Policy';

  constructor(
    private http: HttpClient
  ) { }

  getMyPolicies(): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/my-policies`
    );

  }

}