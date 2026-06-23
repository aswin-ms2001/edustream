export interface IGoogleUser {
  email: string;
  name: string;
  googleId: string;
}

export interface IGoogleAuthService {
  verifyToken(idToken: string): Promise<IGoogleUser>;
}
