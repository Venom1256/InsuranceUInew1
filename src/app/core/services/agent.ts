import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentRegisterDto, AgentResponse } from '../models/agent.model';
import { ApiResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = 'https://localhost:44393/api/v1/Agent';

  constructor(private http: HttpClient) { }

  createAgent(dto: AgentRegisterDto): Observable<ApiResponse<AgentResponse>> {
    return this.http.post<ApiResponse<AgentResponse>>(
      `${this.apiUrl}/create`,
      dto
    );
  }

  getAllAgents(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/list`);
  }
}