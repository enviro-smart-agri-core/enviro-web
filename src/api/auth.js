// src/api/auth.js

const BASE_URL = '/api/v1/auth';

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });


    // Read the raw text first!
    const rawText = await response.text();

    // If the server sent back literally nothing, throw a clean error
    if (!rawText) {
        throw new Error("The server returned an empty response. Check the Netlify proxy or backend logs.");
    }

    // If we have text, THEN parse it into JSON
    const data = JSON.parse(rawText);


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