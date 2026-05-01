import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';
import { loginUser } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Call the clean function from auth.js
      const data = await loginUser(email, password);

      // 2. Save the token
      const token = data.token || (data.data && data.data.token);
      if (token) {
        localStorage.setItem('token', token);
      }

      // 3. Send them to the home page
      navigate('/'); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className={styles.box}>
      <div className={styles['left-box']}>
        <Link to="/" className={styles['back-btn']}>
          <i className="fi fi-rr-arrow-left"></i> Back to Home
        </Link>

        <div className={styles['form-container']}>
          <h1>Sign In</h1>
          
          {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <input 
              className={styles['email-son']} 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              className={styles['password-son']} 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles['login-son']}>Login</button>
          </form>

          <div className={styles.divider}><span>OR</span></div>

          <div className={styles['social-login']}>
            <p>Sign In using</p>
            <button className={styles['google-btn']} type="button">
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" />
              <span>Google</span>
            </button>
          </div>

          <div className={styles['signup-link']}>
            <p>Don't have an account? <Link to="/signup">Sign UP!</Link></p>
          </div>
        </div>
      </div>

      <div className={styles['right-box']}>
        <div className={styles['right-content']}>
          <img src="/assets/image 2(1).png" alt="Plant and Wind Turbines Illustration" />
          <h2>The grass is always greener<br />on our side</h2>
        </div>
      </div>
    </main>
  );
}