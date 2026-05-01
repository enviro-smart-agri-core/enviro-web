import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/signup.module.css'; 
import { registerUser } from '../api/auth'; // 👈 Import the service

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Clean and simple API call
      await registerUser(username, email, password, name);

      alert('Account created successfully! Please log in.');
      navigate('/login');

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
          <h1>Register</h1>

          {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          
          <form onSubmit={handleRegister}>
            <input 
              className={styles['input-son']} 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              className={styles['input-son']} 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input 
              className={styles['input-son']} 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              className={styles['input-son']} 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className={styles['register-son']}>Create Account</button>
          </form>

          <div className={styles.ORSHI}><span>OR</span></div>

          <div className={styles.gglbtn}>
            <p>Sign up using</p>
            <button className={styles['google-btn']} type="button">
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" />
              <span>Google</span>
            </button>
          </div>

          <div className={styles['login-link']}>
            <p>Have account already? <Link to="/login">Sign in!</Link></p>
          </div>
        </div>
      </div>

      <div className={styles['right-box']}>
        <div className={styles['right-content']}>
          <img src="/assets/image (ww1).png" alt="Globe Environment Illustration" />
          <h2>Environment is a two-way<br />street. You give it love, and it<br />gives you love back!</h2>
        </div>
      </div>
    </main>
  );
}