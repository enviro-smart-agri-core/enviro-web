export const useAuth = () => {


  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const username = localStorage.getItem('username') || 'user';
  const email = localStorage.getItem('email') || 'userExample@email.com';
  const fullName = localStorage.getItem('name') || 'Omar Sherif Abd El-Hamid';


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    

    window.location.href = '/'; 
  };


  return { token, isLoggedIn, username, email, fullName, logout };
};