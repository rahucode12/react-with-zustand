const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004';

// Fetch all users
export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Create a new user
export const createUser = async (user: { name: string; email: string }) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    throw new Error('Signup failed');
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error('Login failed');
  }
  return res.json(); // usually returns JWT token or user info
}
