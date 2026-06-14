import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginDto } from '../models/login.model';
import { ApiResponse, LoginResponseDto } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44393/api/v1/Auth';

  constructor(private http: HttpClient) {}

  login(model: LoginDto): Observable<ApiResponse<LoginResponseDto>> {
    return this.http.post<ApiResponse<LoginResponseDto>>(
      `${this.apiUrl}/login`,
      model
    );
  }
}