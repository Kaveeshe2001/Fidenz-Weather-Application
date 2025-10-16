export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AuthUser {
  sub: string;
  exp: number;
}

export interface VerifyMfaRequest {
  mfaToken: string;
  otp: string;
}

export interface MfaRequiredResponse {
  mfaRequired: true;
  mfaToken: string;
}

export interface LoginSuccessResponse {
  mfaRequired: false;
  token: AuthResponse;
}

export type InitialLoginResponse = MfaRequiredResponse | LoginSuccessResponse;