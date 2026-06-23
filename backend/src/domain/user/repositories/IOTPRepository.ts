export interface IOTPRepository {
  saveOTP(email: string, otp: string, ttlSeconds: number): Promise<void>;
  getOTP(email: string): Promise<string | null>;
  deleteOTP(email: string): Promise<void>;
}
