'use client';
import { login } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(email, password);

      // ⚠️ Save token in cookie (NOT localStorage, so middleware can read it)
      Cookies.set('auth_token', data.access_token, {
        expires: 1, // days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });

      // Optional: You can save user data in context/state as needed

      router.push('/'); // Redirect after login
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
