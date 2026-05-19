import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import styles from '../../styles/login.module.css';
import { resetPassword } from '../../api/auth';
import { isPasswordStrong } from '../../utils/passwordStrength';
import PasswordChecklist from '../../components/PasswordChecklist';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // backend sends ?token=...&id=... in the reset email link
  const userId = searchParams.get('id') || '';
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      setError('Invalid or missing reset link. Please request a new one.');
    }
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // match backend validation: needs upper, lower, and digit
    if (!isPasswordStrong(newPassword)) {
      setError('Password must meet all the requirements shown below.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(userId, token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.box}>
      <div className={styles['left-box']}>
        <Link to="/login" className={styles['back-btn']}>
          <i className="fi fi-rr-arrow-left"></i> Back to Login
        </Link>

        <div className={styles['form-container']}>
          {!success ? (
            <>
              <h1>Reset Password</h1>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                Enter a new password for your account.
              </p>

              {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  className={styles['password-son']}
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={!userId || !token}
                />
                <PasswordChecklist password={newPassword} />
                <input
                  className={styles['password-son']}
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!userId || !token}
                />
                <p style={{ fontSize: '0.8rem', color: '#777', textAlign: 'center', marginTop: '-0.5rem' }}>
                  Password must contain uppercase, lowercase, and a number.
                </p>
                <button
                  type="submit"
                  className={styles['login-son']}
                  disabled={loading || !userId || !token}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

              {(!userId || !token) && (
                <div className={styles['signup-link']} style={{ marginTop: '1.5rem' }}>
                  <p>
                    <Link to="/forgot-password">Request a new reset link</Link>
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>Password Reset!</h1>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Your password has been updated successfully.<br />
                You can now sign in with your new password.
              </p>
              <button
                type="button"
                className={styles['login-son']}
                onClick={() => navigate('/login')}
              >
                Go to Login
              </button>
            </>
          )}
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
