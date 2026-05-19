import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/login.module.css';
import { loginUser } from '../../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      const token = data.token || (data.data && data.data.token);

      const actualUsername =
        data.username ||
        (data.user && data.user.username) ||
        (data.data && data.data.username) ||
        (data.data && data.data.user && data.data.user.username) ||
        'Eco-Warrior';

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', actualUsername);
        localStorage.setItem('email', email);
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
              <Link
                to="/forgot-password"
                style={{ fontSize: '0.85rem', color: '#538d72', fontWeight: 600, textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </div>
            <button type="submit" className={styles['login-son']} disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
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
            <p>Don&apos;t have an account? <Link to="/signup">Sign UP!</Link></p>
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