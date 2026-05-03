// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/SignUp';
import Dashboard from './pages/Dashboard'; 


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
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        

      </Routes>
    </Router>
  );
}