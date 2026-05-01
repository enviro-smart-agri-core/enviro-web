import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { isLoggedIn, getUsername, logout } from '../utils/checker';

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const username = getUsername();

  return (
    <header className={styles.box}>
      <img className={styles.logo} src="/assets/logo.png" alt="logo" />
      <h1>Enviro</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">Contact</Link></li>
          <li><Link to="#">Products</Link></li>
        </ul>
      </nav>

      {loggedIn ? (
        <div className={styles['user-controls']}>
          <span className={styles['user-greeting']}>
            Hi, {username}!
          </span>

          <Link to="/dashboard" className={styles['signup-btn']}>
            Dashboard
          </Link>

          <button
            onClick={logout} //calling fn quick
            className={`${styles['signup-btn']} ${styles['logout-btn']}`}
          >
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