export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponseDto {
  token: string;
  role: string;
  email: string;
}