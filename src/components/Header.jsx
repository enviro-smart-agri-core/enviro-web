import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

export default function Header() {
  return (
    <header className={styles.box}>
      <img className={styles.logo} src="/assets/logo.png" alt="logo" />
      <h1>Enviro</h1>
      <nav>
        <ul>
          {/* Use Link for internal routing */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>
      <Link to="/signup" className={styles['signup-btn']}>
        <i className="fi fi-rr-sign-in-alt"></i> Sign Up
      </Link>
    </header>
  );
}