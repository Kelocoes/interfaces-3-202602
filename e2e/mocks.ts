import type { Page } from '@playwright/test';

// La respuesta que daría el backend de NestJS al iniciar sesión (los datos son inventados)
export const LOGIN_OK = {
    access_token: 'token-de-prueba',
    token_type: 'Bearer',
    user: { id: 1, email: 'ana@icesi.edu.co' },
};

// Intercepta la petición de login del navegador y responde sin llamar al backend real
export async function mockLoginOk(page: Page) {
    await page.route('**/auth/login', (route) => route.fulfill({ json: LOGIN_OK }));
}

export async function mockLoginError(page: Page) {
    await page.route('**/auth/login', (route) =>
        route.fulfill({ status: 401, json: { message: 'Credenciales inválidas' } }),
    );
}