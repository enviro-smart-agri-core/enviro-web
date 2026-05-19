// src/api/auth.js

const BASE_URL = '/api/v1/auth';

// helper to safely parse json from a response
// handles empty bodies (204 No Content) and non-JSON error text gracefully
const safeJson = async (response) => {
    const rawText = await response.text();

    // rate limited — tell the user to chill for a sec
    if (response.status === 429) {
        throw new Error('Too many attempts. Please wait a moment before trying again.');
    }

    // empty body — ok if the request succeeded, error if it didn't
    if (!rawText || !rawText.trim()) {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}.`);
        }
        return { success: true };
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch {
        // non-JSON body
        if (!response.ok) throw new Error(rawText);
        return { message: rawText };
    }

    return data;
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await safeJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Failed to login. Check your credentials.');
    }

    return data;
};

// step 1 of signup — sends OTP to email
export const registerRequest = async (username, email, password, name) => {
    const response = await fetch(`${BASE_URL}/register/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, name })
    });

    const data = await safeJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Try a different username or email.');
    }

    return data;
};

// step 2 of signup — verifies OTP
export const registerVerify = async (email, otp) => {
    const response = await fetch(`${BASE_URL}/register/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
    });

    const data = await safeJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed. Check the code and try again.');
    }

    return data;
};

// sends reset link/otp to email
export const forgotPassword = async (email) => {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await safeJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Could not send reset email. Make sure the email is correct.');
    }

    return data;
};

// resets the password using userId + token from email link
export const resetPassword = async (userId, token, newPassword) => {
    const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token, newPassword })
    });

    const data = await safeJson(response);

    if (!response.ok) {
        throw new Error(data.message || 'Password reset failed. The link may have expired.');
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
        if (!response.ok) throw new Error('Server returned an empty error.');
        return { message: 'Success' };
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch {
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
        if (!response.ok) throw new Error('Server returned an empty error.');
        return { message: 'Success' };
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch {
        if (!response.ok) throw new Error(rawText);
        return { message: rawText };
    }

    if (!response.ok) throw new Error(data.message || 'Failed to change password.');
    return data;
};