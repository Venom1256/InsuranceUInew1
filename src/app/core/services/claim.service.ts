import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'https://localhost:44393/api/v1/Claim';

  constructor(
    private http: HttpClient
  ) { }

  getAllClaims(): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}`
    );

  }

  getClaimById(claimId: number): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/${claimId}`
    );

  }

  raiseClaim(data: any): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/raise`,
      data
    );

  }

  getClaimStatus(claimId: number): Observable<ApiResponse<any>> {

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/status/${claimId}`
    );

  }

  getMyClaims() {

  return this.http.get<any>(
    `${this.apiUrl}/my-claims`
  );
}

investigateClaim(data: any): Observable<ApiResponse<any>> {

  return this.http.post<ApiResponse<any>>(
    `${this.apiUrl}/investigate`,
    data
  );

}

approveClaim(data: any) {

  return this.http.post<any>(
    `${this.apiUrl}/approve`,
    data
  );

}

rejectClaim(data: any) {

  return this.http.post<any>(
    `${this.apiUrl}/reject`,
    data
  );

}

settleClaim(data: any) {

  return this.http.post<any>(
    `${this.apiUrl}/settle`,
    data
  );

}

}