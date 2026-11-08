import { test, expect } from '@playwright/test';
import { mockLoginError, mockLoginOk } from './mocks';

// Las pruebas del login deben empezar SIN sesión
test.use({ storageState: { cookies: [], origins: [] } });

test('inicia sesión y llega al dashboard', async ({ page }) => {
    await mockLoginOk(page);

    await page.goto('/login');
    await page.getByLabel('Correo electrónico').fill('ana@icesi.edu.co');
    await page.getByLabel('Contraseña').fill('12345678');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('button', { name: 'Crear Notificación' })).toBeVisible();
});

test('muestra un error si las credenciales son incorrectas', async ({ page }) => {
    await mockLoginError(page);

    await page.goto('/login');
    await page.getByLabel('Correo electrónico').fill('ana@icesi.edu.co');
    await page.getByLabel('Contraseña').fill('incorrecta');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    // Next.js también usa un role="alert" propio: filtramos por el texto para elegir el nuestro
    await expect(page.getByRole('alert').filter({ hasText: 'Credenciales inválidas' })).toBeVisible();
    await expect(page).toHaveURL('/login');
});

test('sin sesión, entrar al dashboard lleva al login', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL('/login');
});