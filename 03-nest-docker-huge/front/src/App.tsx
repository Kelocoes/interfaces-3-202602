import { useState, useEffect } from 'react';
import './App.css';

interface User {
  id?: number;
  email: string;
  username?: string;
  name?: string;
}

const API_URL = 'http://localhost:8080';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) return;

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          passwordHash: 'Password123!',
          bio: 'Usuario creado desde el front',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message || `Error ${res.status}`;
        throw new Error(message);
      }

      setUsername('');
      setEmail('');
      fetchUsers();
    } catch (err: any) {
      alert(`Error al crear usuario: ${err.message}`);
    }
  };

  const getDisplayName = (user: User) => {
    return user.username || user.name || user.email || 'U';
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Interfaces 3 - Fullstack Dashboard</h1>
        <p>Front-end (Vite React TS) + Back-end (NestJS) + DB (PostgreSQL)</p>
      </header>

      <main className="content">
        <section className="card">
          <h2>Crear Nuevo Usuario</h2>
          <form onSubmit={handleCreateUser} className="user-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Ej. juanperez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="juan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Guardar Usuario</button>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Lista de Usuarios (desde API)</h2>
            <button onClick={fetchUsers} className="btn-secondary">🔄 Recargar</button>
          </div>

          {loading && <p className="status">Cargando datos...</p>}
          {error && <p className="status error">⚠️ Error: {error}</p>}

          {!loading && !error && users.length === 0 && (
            <p className="status">No hay usuarios registrados aún en la Base de Datos.</p>
          )}

          {!loading && !error && users.length > 0 && (
            <ul className="user-list">
              {users.map((user) => {
                const displayName = getDisplayName(user);
                return (
                  <li key={user.id || user.email} className="user-item">
                    <div className="user-avatar">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <strong>{displayName}</strong>
                      <span>{user.email}</span>
                    </div>
                    <span className="user-badge">ID: {user.id}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
