import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';

export default function Footer() {
  return (
    <footer className={styles['site-footer']}>
      <div className={styles['footer-col']}>
        <h3>Home</h3>
        <ul>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      
      <div className={styles['footer-col']}>
        <h3>Documents</h3>
        <ul>
          <li>
            <a href="/assets/Enviro_Privacy_Policy.pdf" target='_blank'>
              Privacy Policy
            </a>
          </li>
          <li><a href="/assets/Enviro_Terms_of_Service.pdf" target='_blank' >Terms of Service</a></li>
        </ul>
      </div>

      <div className={styles['footer-col']}>
        <h3>Community</h3>
        <ul>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/events">Events</Link></li>
        </ul>
      </div>
      <div className={styles['footer-col']}>
        <h3>Contact Us</h3>
        <ul>
          <li><a href="tel:+201005792211">+20 1005792211</a></li>
          <li><a href="mailto:Enviro@gmail.com">Enviro@gmail.com</a></li>
        </ul>
      </div>
      <div className={styles['footer-bottom']}>
        <p>&copy; 2026 Enviro. All rights reserved.</p>
        <img className={styles['footer-logo']} src="/assets/logo.png" alt="Enviro Logo" />
      </div>
    </footer>
  );
}