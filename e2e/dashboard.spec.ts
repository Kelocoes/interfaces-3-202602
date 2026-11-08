import { test, expect } from '@playwright/test';

// Estas pruebas usan la sesión guardada por auth.setup.ts (ver el proyecto "chromium")
test('crear una notificación aumenta el contador de la campana', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('button', { name: 'Notificaciones (0)' })).toBeVisible();

    await page.getByRole('button', { name: 'Crear Notificación' }).click();

    await expect(page.getByRole('button', { name: 'Notificaciones (1)' })).toBeVisible();
});

test('cerrar sesión lleva al login y vuelve a proteger el dashboard', async ({ page }) => {
    await page.goto('/dashboard');

    await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
    await expect(page).toHaveURL('/login');

    // Sin token, el guard de la aplicación vuelve a mandarnos al login
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
});