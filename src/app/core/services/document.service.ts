import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl =
    'https://localhost:44393/api/v1/Document';

  constructor(
    private http: HttpClient
  ) { }

  uploadDocument(formData: FormData): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/upload`,
      formData
    );

  }

  getDocuments(
    entityType: string,
    entityId: number
  ): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/${entityType}/${entityId}`
    );

  }

  approveDocument(data: any): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/approve`,
      data
    );

  }

  rejectDocument(data: any): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/reject`,
      data
    );

  }

  viewDocument(documentId: number): void {

    window.open(
      `${this.apiUrl}/view/${documentId}`,
      '_blank'
    );

  }

  downloadDocument(documentId: number): void {

    window.open(
      `${this.apiUrl}/download/${documentId}`,
      '_blank'
    );

  }

}