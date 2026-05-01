// src/services/auth.js

const BASE_URL = 'http://51.21.241.218/api/v1/auth';

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to login. Check your credentials.');
  }

  return data;
};

export const registerUser = async (username, email, password, name) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, name })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed. Try a different username or email.');
  }

  return data;
};