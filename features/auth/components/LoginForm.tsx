'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await authService.login({ email, password });
            router.replace('/dashboard');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Error inesperado al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <h1 className="text-2xl font-bold mb-1">Iniciar Sesión</h1>
            <p className="text-sm opacity-70 mb-4">Ingresa tus credenciales para acceder.</p>

            {errorMessage && (
                <div role="alert" className="alert alert-error text-sm mb-4">
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <fieldset disabled={isLoading} className="flex flex-col gap-3">
                    <div>
                        <label className="label text-sm" htmlFor="login-email">Correo electrónico</label>
                        <input
                            id="login-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label text-sm" htmlFor="login-password">Contraseña</label>
                        <input
                            id="login-password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-full mt-2"
                    >
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                </fieldset>
            </form>
        </section>
    );
}
