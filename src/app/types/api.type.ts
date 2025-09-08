export interface ApiResponse<T = void> {
  isSuccess?: boolean;
  message?: string;
  data?: T;
}

export interface JwtClaims {
  iat: string | Date | null;
  exp: string | Date | null;
  iss: string | null;
  sub: string | null;
}
