import { api } from '@/shared/lib/api';
import { session } from '@/shared/lib/session';
import { LoginCredentials, LoginResponse, RegisterData, User } from '../types';

export const authService = {
    // 1. Iniciar sesión: extrae access_token del objeto de respuesta y lo guarda en session
    async login(credentials: LoginCredentials): Promise<string> {
        const res = await api.post<LoginResponse>('/auth/login', credentials);
        session.setToken(res.access_token);
        return res.access_token;
    },

    async register(data: RegisterData): Promise<User> {
        return api.post<User>('/users', data);
    },

    logout(): void {
        session.removeToken();
    },
};
