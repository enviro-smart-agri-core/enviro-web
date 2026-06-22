export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const getUsername = () => {
  return localStorage.getItem('username') || 'User'; 
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = '/';
};