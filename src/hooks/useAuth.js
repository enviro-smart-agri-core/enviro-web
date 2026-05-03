// src/hooks/useAuth.js
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  // 1. Centralize pulling data from storage
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const username = localStorage.getItem('username') || 'user';
  const email = localStorage.getItem('email') || 'userExample@email.com';
  const fullName = localStorage.getItem('name') || 'Omar Sherif Abd El-Hamid';

  // 2. Centralize the Logout logic
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    
    // Redirect to home and force a reload to clear all React state
    window.location.href = '/'; 
  };

  // 3. Return everything so any component can use it
  return { token, isLoggedIn, username, email, fullName, logout };
};