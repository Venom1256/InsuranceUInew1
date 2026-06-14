import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NomineeCreateDto,
  NomineeUpdateDto,
  NomineeListDto
} from '../models/nominee';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  private apiUrl = 'https://localhost:44393/api/v1/CustomerNominee';

  constructor(private http: HttpClient) {}

  getMyNominees(): Observable<ApiResponse<NomineeListDto[]>> {
    return this.http.get<ApiResponse<NomineeListDto[]>>(
      `${this.apiUrl}/my-nominees`
    );
  }

  createNominee(dto: NomineeCreateDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/my-nominees`,
      dto
    );
  }

  updateNominee(dto: NomineeUpdateDto): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.apiUrl}/my-nominees`,
      dto
    );
  }

  deleteNominee(nomineeId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/my-nominees/${nomineeId}`
    );
  }
}