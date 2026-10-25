import { create } from 'zustand'; // Función principal para crear un store
import { devtools, persist, createJSONStorage } from 'zustand/middleware'; // Middlewares para depuración y persistencia

// Tipado del estado y acciones del store
type SessionState = {
    token: string | null; // JWT del usuario autenticado o null si cerró sesión
    hasHydrated: boolean; // Bandera para saber si ya leyó localStorage tras montar
    setToken: (token: string) => void; // Acción para guardar el token
    clearSession: () => void; // Acción para limpiar la sesión (logout)
    setHasHydrated: (value: boolean) => void; // Acción para actualizar el estado de hidratación
};

// Definición del hook useSessionStore envuelto en devtools y persist
export const useSessionStore = create<SessionState>()(
    devtools( // Middleware 1: Conecta con la extensión Redux DevTools
        persist( // Middleware 2: Guarda y restaura el estado en localStorage
            (set) => ({ // Función que recibe 'set' para mutar el estado
                token: null, // Valor inicial: sin token
                hasHydrated: false, // Valor inicial: aún no hidratado

                setToken: (token) => set({ token }, undefined, 'session/setToken'), // Actualiza token con nombre de acción en DevTools
                clearSession: () => set({ token: null }, undefined, 'session/clear'), // Borra token con nombre de acción en DevTools
                setHasHydrated: (value) => set({ hasHydrated: value }, undefined, 'session/hydrated'), // Actualiza bandera de hidratación en DevTools
            }),
            {
                name: 'auth_token', // Clave bajo la cual se guarda en localStorage
                storage: createJSONStorage(() => localStorage), // Serializa a JSON y posterga el acceso a window/localStorage
                partialize: (state) => ({ token: state.token }), // Solo guarda 'token'; ignora hasHydrated en disco
                skipHydration: true, // No restaura en el servidor; evita errores de hidratación en SSR
                onRehydrateStorage: () => (state) => { // Callback que se ejecuta cuando termina de leer localStorage
                    state?.setHasHydrated(true); // Marca hasHydrated en true al terminar la lectura
                },
            },
        ),
        { name: 'SessionStore', enabled: process.env.NODE_ENV !== 'production' }, // Nombre en DevTools y solo activo fuera de producción
    ),
);

