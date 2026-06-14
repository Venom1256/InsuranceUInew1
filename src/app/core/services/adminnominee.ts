import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  NomineeListDto,
  NomineeCreateDto,
  NomineeUpdateDto,
  NomineeFilterDto,
  PagedNomineeResult
} from '../models/nominee';

import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class NomineeAdminService {

  private apiUrl = 'https://localhost:44393/api/v1/CustomerNominee';

  constructor(private http: HttpClient) { }

  // ========== GET ALL NOMINEES ==========
  getAllNominees(): Observable<ApiResponse<NomineeListDto[]>> {
    return this.http.get<ApiResponse<NomineeListDto[]>>(this.apiUrl);
  }

  // ========== GET NOMINEES BY CUSTOMER ==========
  getNomineesByCustomer(
    customerId: number
  ): Observable<ApiResponse<NomineeListDto[]>> {

    return this.http.get<ApiResponse<NomineeListDto[]>>(
      `${this.apiUrl}/customer/${customerId}`
    );
  }

  // ========== GET NOMINEE BY ID ==========
  getNomineeById(
    nomineeId: number
  ): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/${nomineeId}`
    );
  }

  // ========== CREATE NOMINEE ==========
  createNomineeForCustomer(
    customerId: number,
    dto: NomineeCreateDto
  ): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/customer/${customerId}/nominees`,
      dto
    );
  }

  // ========== UPDATE NOMINEE ==========
  updateAnyNominee(
    dto: NomineeUpdateDto
  ): Observable<ApiResponse<any>> {

    return this.http.put<ApiResponse<any>>(
      this.apiUrl,
      dto
    );
  }

  // ========== DELETE NOMINEE ==========
  deleteAnyNominee(
    nomineeId: number
  ): Observable<ApiResponse<string>> {

    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/${nomineeId}`
    );
  }

  // ========== FILTER NOMINEES ==========
  getFilteredNominees(
    filter: NomineeFilterDto,
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'nomineeId',
    sortOrder: string = 'asc'
  ): Observable<ApiResponse<PagedNomineeResult>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    if (filter.customerId) {
      params = params.set(
        'customerId',
        filter.customerId.toString()
      );
    }

    if (filter.customerName) {
      params = params.set(
        'customerName',
        filter.customerName
      );
    }

    if (filter.relationship) {
      params = params.set(
        'relationship',
        filter.relationship
      );
    }

    if (filter.minSharePercentage !== undefined) {
      params = params.set(
        'minSharePercentage',
        filter.minSharePercentage.toString()
      );
    }

    if (filter.maxSharePercentage !== undefined) {
      params = params.set(
        'maxSharePercentage',
        filter.maxSharePercentage.toString()
      );
    }

    return this.http.get<ApiResponse<PagedNomineeResult>>(
      `${this.apiUrl}/filter`,
      { params }
    );
  }
}