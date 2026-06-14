import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/signup.module.css';
import { registerRequest, registerVerify } from '../../api/auth';
import { isPasswordStrong } from '../../utils/passwordStrength';
import PasswordChecklist from '../../components/PasswordChecklist';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterRequest = async (e) => {
    e.preventDefault();
    setError('');

    if (!isPasswordStrong(password)) {
      setError('Please make sure your password meets all the requirements below.');
      return;
    }

    setLoading(true);

    try {
      await registerRequest(username, email, password, name);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerVerify(email, otp);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      await registerRequest(username, email, password, name);
      setError('');
      alert('A new OTP has been sent to your email.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.ballknowledge}>
      <div className={styles.left}>
        <Link to="/" className={styles.back}>
          <i className="fi fi-rr-arrow-left"></i> Back to Home
        </Link>

        <div className={styles.container}>
          {step === 1 ? (
            <>
              <h1>Register</h1>

              {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

              <form onSubmit={handleRegisterRequest}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordChecklist password={password} />

                <button type="submit" className={styles.register} disabled={loading}>
                  {loading ? 'Sending...' : 'Create Account'}
                </button>
              </form>

              <div className={styles.divider}><span>OR</span></div>

              <div className={styles.social}>
                <p>Sign up using</p>
                <button className={styles.google} type="button">
                  <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" />
                  <span>Google</span>
                </button>
              </div>

              <div className={styles.login}>
                <p>Have account already? <Link to="/login">Sign in!</Link></p>
              </div>
            </>
          ) : (
            <>
              <h1>Verify Email</h1>
              <p style={{ textAlign: 'center', color: '#555', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to activate your account.
              </p>

              {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

              <form onSubmit={handleVerifyOtp}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <button type="submit" className={styles.register} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>

              <div className={styles.login} style={{ marginTop: '1.5rem' }}>
                <p>
                  Didn&apos;t get the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    style={{ background: 'none', border: 'none', color: '#0056b3', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    Resend OTP
                  </button>
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{ background: 'none', border: 'none', color: '#538d72', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    Back to sign up form
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.content}>
          <img src="/assets/image (ww1).png" alt="Globe Environment Illustration" />
          <h2>Environment is a two-way<br />street. You give it love, and it<br />gives you love back!</h2>
        </div>
      </div>
    </main>
  );
}