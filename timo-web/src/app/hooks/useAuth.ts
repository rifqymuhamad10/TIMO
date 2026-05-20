// src/hooks/useAuth.ts
import { useState } from 'react';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    const json = await res.json();
    setLoading(false);
    if (json.error) setError(json.error);
    return json;
  };

  const register = async (email: string, password: string) => { /* mirip login */ };
  const logout = async () => { /* ... */ };

  return { login, register, logout, loading, error };
}