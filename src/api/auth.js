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

// Add this to the bottom of src/api/auth.js

// src/api/auth.js

export const updateProfile = async (token, username, email) => {
    // Replace '/update' with your actual backend endpoint
    const response = await fetch(`${BASE_URL}/update`, {
        method: 'PUT', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email }) // Passing the new data
    });

    // 🌟 THE FIX: Read as text first to prevent the JSON crash
    const rawText = await response.text();
    
    if (!rawText) {
        if (!response.ok) throw new Error("Server returned an empty error.");
        return { message: "Success" }; // Fake a success object if backend sends nothing
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch (e) {
        // If it fails to parse, the backend probably just sent plain text!
        if (!response.ok) throw new Error(rawText);
        return { message: rawText }; 
    }

    if (!response.ok) throw new Error(data.message || 'Failed to update profile.');
    return data;
};

export const updatePassword = async (token, currentPassword, newPassword) => {
    // Replace '/password' with your actual backend endpoint
    const response = await fetch(`${BASE_URL}/password`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
    });

    // 🌟 THE FIX: Read as text first
    const rawText = await response.text();
    
    if (!rawText) {
        if (!response.ok) throw new Error("Server returned an empty error.");
        return { message: "Success" };
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch (e) {
        if (!response.ok) throw new Error(rawText);
        return { message: rawText }; 
    }

    if (!response.ok) throw new Error(data.message || 'Failed to change password.');
    return data;
};