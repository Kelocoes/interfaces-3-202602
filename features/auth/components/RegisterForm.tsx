'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

export function RegisterForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await authService.register({
                username,
                email,
                passwordHash: password,
                roleId: 1,
            });

            router.push('/login');
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'Error al registrar la cuenta');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <h1 className="text-2xl font-bold mb-1">Crear Cuenta</h1>
            <p className="text-sm opacity-70 mb-4">Regístrate para comenzar.</p>

            {errorMessage && (
                <div role="alert" className="alert alert-error text-sm mb-4">
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <fieldset disabled={isLoading} className="flex flex-col gap-3">
                    <div>
                        <label className="label text-sm" htmlFor="reg-username">Nombre de usuario</label>
                        <input
                            id="reg-username"
                            type="text"
                            required
                            minLength={3}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ej. JuanPerez"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label text-sm" htmlFor="reg-email">Correo electrónico</label>
                        <input
                            id="reg-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="label text-sm" htmlFor="reg-password">Contraseña (mínimo 8)</label>
                        <input
                            id="reg-password"
                            type="password"
                            required
                            minLength={8}
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
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </fieldset>
            </form>
        </section>
    );
}
