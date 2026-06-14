import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/login.module.css';
import { forgotPassword } from '../../api/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.ballknowledge}>
      <div className={styles.left}>
        <Link to="/login" className={styles.back}>
          <i className="fi fi-rr-arrow-left"></i> Back to Login
        </Link>

        <div className={styles.container}>
          {!success ? (
            <>
              <h1>Forgot Password</h1>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Enter your account email and we&apos;ll send you a link to reset your password.
              </p>

              {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  className={styles.email}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.login} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className={styles.signup} style={{ marginTop: '1.5rem' }}>
                <p>Remember your password? <Link to="/login">Sign in!</Link></p>
              </div>
            </>
          ) : (
            <>
              <h1>Check Your Email</h1>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                We sent a password reset link to <strong>{email}</strong>.<br />
                Follow the link in the email to reset your password.
              </p>
              <button
                type="button"
                className={styles.login}
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
              <div className={styles.signup} style={{ marginTop: '1.5rem' }}>
                <p>
                  Didn&apos;t receive it?{' '}
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    style={{ background: 'none', border: 'none', color: '#0056b3', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    Try again
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.content}>
          <img src="/assets/image 2(1).png" alt="Plant and Wind Turbines Illustration" />
          <h2>The grass is always greener<br />on our side</h2>
        </div>
      </div>
    </main>
  );
}
