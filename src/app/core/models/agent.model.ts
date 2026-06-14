export interface AgentRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface AgentResponse {
    agentId: number;
    agentCode: string;
    email: string;
}