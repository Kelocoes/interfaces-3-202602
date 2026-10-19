export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    email: string;
    role?: string;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  passwordHash: string;
  roleId: number;
  bio?: string;
}

export interface UserRole {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  createdAt: string;
  role?: UserRole;
}
