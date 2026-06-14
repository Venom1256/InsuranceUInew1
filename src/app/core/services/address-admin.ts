import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/login-response.model';
import { CustomerAddressListDto } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AddressAdminService {

  private apiUrl = 'https://localhost:44393/api/v1/CustomerAddress';

  constructor(private http: HttpClient) {}

  // Get all addresses (Admin/Agent)
  getAllAddresses(): Observable<ApiResponse<CustomerAddressListDto[]>> {
    return this.http.get<ApiResponse<CustomerAddressListDto[]>>(
      this.apiUrl
    );
  }

  // Get addresses by Customer ID (Admin/Agent)
  getAddressByCustomer(
    customerId: number
  ): Observable<ApiResponse<CustomerAddressListDto[]>> {

    return this.http.get<ApiResponse<CustomerAddressListDto[]>>(
      `${this.apiUrl}/customer/${customerId}`
    );
  }
}