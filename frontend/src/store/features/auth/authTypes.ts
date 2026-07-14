import type {AppRole} from "@/types/role";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}