// src/api/auth.js

const BASE_URL = '/api/v1/auth';

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });



    const rawText = await response.text();


    if (!rawText) {
        throw new Error("The server returned an empty response. Check the Netlify proxy or backend logs.");
    }


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



export const updateProfile = async (token, username, email) => {
    const response = await fetch(`${BASE_URL}/update`, {
        method: 'PUT', 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email })
    });


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

    if (!response.ok) throw new Error(data.message || 'Failed to update profile.');
    return data;
};

export const updatePassword = async (token, currentPassword, newPassword) => {
    const response = await fetch(`${BASE_URL}/password`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
    });

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