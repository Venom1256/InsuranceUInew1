import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerAddressCreateDto, CustomerAddressListDto } from '../models/customer.model';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = 'https://localhost:44393/api/v1/CustomerAddress';

  constructor(private http: HttpClient) { }

  // GET /api/v1/CustomerAddress/my-addresses
  // Returns: ApiResponse<IEnumerable<CustomerAddressListDto>>
  getMyAddresses(): Observable<ApiResponse<CustomerAddressListDto[]>> {
    return this.http.get<ApiResponse<CustomerAddressListDto[]>>(
      `${this.baseUrl}/my-addresses`
    );
  }

  // POST /api/v1/CustomerAddress/my-addresses
  // Body: CustomerAddressCreateDto
  createMyAddress(dto: CustomerAddressCreateDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/my-addresses`,
      dto
    );
  }

  // PUT /api/v1/CustomerAddress/my-addresses
  // Body: CustomerAddressCreateDto
  updateMyAddress(dto: CustomerAddressCreateDto): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.baseUrl}/my-addresses`,
      dto
    );
  }

  // DELETE /api/v1/CustomerAddress/my-addresses
  deleteMyAddress(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.baseUrl}/my-addresses`
    );
  }
}