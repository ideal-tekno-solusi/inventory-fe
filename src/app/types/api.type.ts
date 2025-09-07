export interface ApiResponse<T = void> {
  isSuccess?: boolean;
  message?: string;
  data?: T;
}

export interface JwtClaims {
  exp: number | null;
  iss: string | null;
  sub: string | null;
}
