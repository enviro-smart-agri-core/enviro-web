import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="box">
      <img className="logo" src="/assets/logo.png" alt="logo" />
      <h1>Enviro</h1>
      <nav>
        <ul>
          {/* Use Link for internal routing */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </nav>
      <Link to="/signup" className="signup-btn">
        <i className="fi fi-rr-sign-in-alt"></i> Sign Up
      </Link>
    </header>
  );
}