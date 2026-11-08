import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Dónde viven las pruebas
    testDir: './e2e',

    // Las pruebas de archivos distintos corren en paralelo
    fullyParallel: true,

    // Si dejas un test.only por error, la ejecución falla en lugar de saltarse el resto
    forbidOnly: !!process.env.CI,

    // Un reporte en HTML que se abre con: npx playwright show-report
    reporter: 'html',

    use: {
        // Permite escribir page.goto('/login') en lugar de la dirección completa
        baseURL: 'http://localhost:3000',

        // Guarda una traza (película paso a paso) cuando un reintento falla
        trace: 'on-first-retry',
    },

    projects: [
        // 1. Inicia sesión una sola vez y guarda el resultado en un archivo
        { name: 'setup', testMatch: /auth\.setup\.ts/ },

        // 2. Las demás pruebas parten con esa sesión ya iniciada
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
            dependencies: ['setup'],
        },
    ],

    // Arranca la aplicación antes de las pruebas (y la reutiliza si ya la tienes corriendo)
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120_000, // la primera compilación de Next puede tardar
    },
});