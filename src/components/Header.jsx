import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks/useAuth';

export default function Header() {

  const { isLoggedIn, username, logout } = useAuth();

  return (
    <header className={styles.box}>
      <img className={styles.logo} src="/assets/logo.png" alt="logo" />
      <h1>Enviro</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      {isLoggedIn ? (
        <div className={styles['user-controls']}>
          <span className={styles['user-greeting']}>Hi, {username}!</span>
          <Link to="/dashboard" className={styles['signup-btn']}>Dashboard</Link>
          <button onClick={logout} className={`${styles['signup-btn']} ${styles['logout-btn']}`}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/signup" className={styles['signup-btn']}>
          <i className="fi fi-rr-sign-in-alt"></i> Sign Up
        </Link>
      )}
    </header>
  );
}