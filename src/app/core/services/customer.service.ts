import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CustomerRegisterDto,
  CustomerResponse,
  CustomerProfileUpdateDto,
  CustomerKycUpdateDto,
  CustomerProfile
} from '../models/customer.model';
import { ApiResponse } from '../models/login-response.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private agentApiUrl = 'https://localhost:44393/api/v1/Agent';
  private customerApiUrl = 'https://localhost:44393/api/v1/Customer';

  constructor(private http: HttpClient) { }

  // ========== SELF REGISTRATION (Public - No Auth) ==========
  selfRegister(dto: CustomerRegisterDto): Observable<ApiResponse<CustomerResponse>> {
    return this.http.post<ApiResponse<CustomerResponse>>(this.customerApiUrl, dto);
  }

  // ========== AGENT CREATES CUSTOMER (Agent Auth Required) ==========
  createCustomerByAgent(dto: CustomerRegisterDto): Observable<ApiResponse<CustomerResponse>> {
    return this.http.post<ApiResponse<CustomerResponse>>(
      `${this.agentApiUrl}/create-customer`,
      dto
    );
  }

  // ========== GET MY PROFILE (Customer Auth Required) ==========
  getMyProfile(): Observable<ApiResponse<CustomerProfile>> {
    return this.http.get<ApiResponse<CustomerProfile>>(`${this.customerApiUrl}/me`);
  }

  // ========== PROFILE UPDATE (Customer Auth Required) ==========
  updateMyProfile(dto: CustomerProfileUpdateDto): Observable<ApiResponse<CustomerProfile>> {
    return this.http.put<ApiResponse<CustomerProfile>>(`${this.customerApiUrl}/me`, dto);
  }

  // ========== KYC UPDATE (Customer Auth Required) ==========
  updateMyKyc(dto: CustomerKycUpdateDto): Observable<ApiResponse<CustomerProfile>> {
    return this.http.put<ApiResponse<CustomerProfile>>(`${this.customerApiUrl}/me/kyc`, dto);
  }

  // ========== DELETE ACCOUNT (Customer Auth Required) ==========
  deleteMyAccount(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.customerApiUrl}/me`);
  }

  // ========== GET ALL CUSTOMERS (Admin Only) ==========
  getAllCustomers(page: number = 1, pageSize: number = 10): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.customerApiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  // ========== AGENT: GET MY CUSTOMERS ==========
  getMyCustomers(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.agentApiUrl}/my-customers`);
  }
  
}