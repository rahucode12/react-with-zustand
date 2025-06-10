'use client';

import { useState } from 'react';
import { createUser } from '@/lib/api';

export default function CreateUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ name, email });
      setName('');
      setEmail('');
      setError(null);
      alert('User created successfully!');
    } catch (err) {
      setError('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Create User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}