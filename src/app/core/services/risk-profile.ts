import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskProfileService {

  private apiUrl =
    'https://localhost:44393/api/v1/RiskProfile';

  constructor(private http: HttpClient) { }

  getRiskProfileByCustomerId(
    customerId: number
  ): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${customerId}`
    );

  }

}