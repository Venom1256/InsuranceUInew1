import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PagedCustomerResult } from '../models/customer.model';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerAdminService {

  private apiUrl = 'https://localhost:44393/api/v1/Customer';

  constructor(private http: HttpClient) {}

  // Get all customers with pagination
  getAllCustomers(
    page: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<PagedCustomerResult>> {

    return this.http.get<ApiResponse<PagedCustomerResult>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  // Get customer by ID
  getCustomerById(id: number): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/${id}`
    );
  }

  // Soft Delete Customer
  softDeleteCustomer(id: number): Observable<ApiResponse<string>> {

    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/${id}`
    );
  }
}