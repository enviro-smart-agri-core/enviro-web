// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// 🌟 NEW PATHS
import Login from './pages/auth/Login';
import Register from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard'; 

// ... rest of App.jsx stays the same

// 1. Your standard layout for normal pages (Home, About, etc.)
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> 
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* Normal pages get the Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth pages stand alone */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
        {/* 🌟 THE FIX: The Dashboard MUST stand completely alone */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}