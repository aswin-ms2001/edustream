export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}
