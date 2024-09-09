export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  type: string;
  token: string;
}