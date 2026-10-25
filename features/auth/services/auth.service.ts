import { api } from '@/shared/lib/api';
import { useSessionStore } from '@/shared/store/session.store';
import { useNotificationsStore } from '@/features/notifications/store/notifications.store';
import { LoginCredentials, LoginResponse, RegisterData, User } from '../types';

export const authService = {
    // 1. Iniciar sesión: extrae access_token del objeto de respuesta y lo guarda en session
    async login(credentials: LoginCredentials): Promise<string> {
        const res = await api.post<LoginResponse>('/auth/login', credentials);
        useSessionStore.getState().setToken(res.access_token);
        useNotificationsStore.getState().addNotification('Inicio de sesión exitoso');
        return res.access_token;
    },

    async register(data: RegisterData): Promise<User> {
        return api.post<User>('/users', data);
    },

    logout(): void {
        useSessionStore.getState().clearSession();
        useNotificationsStore.getState().addNotification('Sesión cerrada');
    },
};
