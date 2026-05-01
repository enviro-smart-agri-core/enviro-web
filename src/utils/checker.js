// src/utils/checker.js

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username') || 'Omar'; 
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  //force reload
  window.location.href = '/';
};