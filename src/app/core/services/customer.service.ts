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

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private agentApiUrl =
    'https://localhost:44393/api/v1/Agent';

  private customerApiUrl =
    'https://localhost:44393/api/v1/Customer';

  constructor(
    private http: HttpClient
  ) { }

  // ================= SELF REGISTER =================

  selfRegister(
    dto: CustomerRegisterDto
  ): Observable<ApiResponse<CustomerResponse>> {

    return this.http.post<ApiResponse<CustomerResponse>>(
      `${this.customerApiUrl}`,
      dto
    );

  }

  // ================= AGENT CREATE CUSTOMER =================

  createCustomerByAgent(
    dto: CustomerRegisterDto
  ): Observable<ApiResponse<CustomerResponse>> {

    return this.http.post<ApiResponse<CustomerResponse>>(
      `${this.agentApiUrl}/create-customer`,
      dto
    );

  }

  // ================= GET MY PROFILE =================

  getMyProfile(): Observable<ApiResponse<CustomerProfile>> {

    return this.http.get<ApiResponse<CustomerProfile>>(
      `${this.customerApiUrl}/me`
    );

  }

  // ================= UPDATE PROFILE =================

  updateMyProfile(
    dto: CustomerProfileUpdateDto
  ): Observable<ApiResponse<CustomerProfile>> {

    return this.http.put<ApiResponse<CustomerProfile>>(
      `${this.customerApiUrl}/me`,
      dto
    );

  }

  // ================= UPDATE KYC =================

  updateMyKyc(
    dto: CustomerKycUpdateDto
  ): Observable<ApiResponse<CustomerProfile>> {

    return this.http.put<ApiResponse<CustomerProfile>>(
      `${this.customerApiUrl}/me/kyc`,
      dto
    );

  }

  // ================= DELETE ACCOUNT =================

  deleteMyAccount(): Observable<ApiResponse<string>> {

    return this.http.delete<ApiResponse<string>>(
      `${this.customerApiUrl}/me`
    );

  }

  // ================= GET ALL CUSTOMERS =================

  getAllCustomers(
    page: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.customerApiUrl}?page=${page}&pageSize=${pageSize}`
    );

  }

  // ================= AGENT MY CUSTOMERS =================

  getMyCustomers(): Observable<ApiResponse<any[]>> {

    return this.http.get<ApiResponse<any[]>>(
      'https://localhost:44393/api/v1/AgentCustomer/my-customers'
    );

  }

  // ================= PENDING KYC CUSTOMERS =================

  getPendingKycCustomers(): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.customerApiUrl}/kyc-pending`
    );

  }

  // ================= GET CUSTOMER BY ID =================

  getCustomerById(
    customerId: number
  ): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.customerApiUrl}/${customerId}`
    );

  }

}