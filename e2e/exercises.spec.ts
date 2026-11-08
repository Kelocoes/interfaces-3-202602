import { test, expect } from '@playwright/test';

test('filtra los ejercicios por categoría', async ({ page }) => {
    await page.goto('/exercises');

    await page.getByRole('button', { name: 'Cardio' }).click();

    await expect(page).toHaveURL(/category=cardio/);
    await expect(page.getByRole('heading', { name: 'Saltos de tijera' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sentadilla' })).toHaveCount(0);
});

test('busca un ejercicio por texto', async ({ page }) => {
    await page.goto('/exercises');

    await page.getByLabel('Buscar ejercicio').fill('plan');

    await expect(page).toHaveURL(/q=plan/);
    await expect(page.getByRole('heading', { name: 'Plancha' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Flexiones' })).toHaveCount(0);
});

test('abre el ejercicio en un modal y lo cierra', async ({ page }) => {
    await page.goto('/exercises');

    await page.getByRole('link', { name: /Zancadas/ }).click();

    await expect(page).toHaveURL('/exercises/4');
    await expect(page.getByRole('dialog')).toBeVisible();

    // Dentro del modal: "Cerrar" también coincide con "Cerrar Sesión" de la barra
    await page.getByRole('dialog').getByRole('button', { name: 'Cerrar' }).click();
    await expect(page).toHaveURL('/exercises');
    await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('una dirección que no existe muestra la página de ejercicio no encontrado', async ({ page }) => {
    await page.goto('/exercises/999');

    await expect(page.getByRole('heading', { name: 'Ese ejercicio no existe' })).toBeVisible();
});