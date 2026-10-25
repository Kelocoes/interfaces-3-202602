import { useSessionStore } from '@/shared/store/session.store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

function getHeaders(): HeadersInit {
    const token = useSessionStore.getState().token;
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

export const api = {
    // GET: consulta y retorna el JSON tipado
    async get<T>(endpoint: string): Promise<T> {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: getHeaders(),
        });

        if (!res.ok) {
            throw new Error(`Error ${res.status}: no se pudo cargar la información`);
        }

        return res.json();
    },

    // POST: envía body y retorna el JSON tipado
    async post<T>(endpoint: string, body: unknown): Promise<T> {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            const msg = Array.isArray(data.message) ? data.message[0] : data.message;
            throw new Error(msg || 'Error al procesar la solicitud');
        }

        return res.json();
    },
};
