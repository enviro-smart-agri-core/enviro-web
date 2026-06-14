import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <header className={styles.avgball}>
      <img className={styles.img} src="/assets/logo.png" alt="logo" />
      <h1>Enviro</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>

      {isLoggedIn ? (
        <div className={styles.user}>
          <span className={styles.greeting}>Hi, {username}!</span>
          <Link to="/dashboard" className={styles.button}>Dashboard</Link>
          <button onClick={logout} className={`${styles.button} ${styles.logout}`}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/signup" className={styles.button}>
          <i className="fi fi-rr-sign-in-alt"></i> Sign Up
        </Link>
      )}
    </header>
  );
}