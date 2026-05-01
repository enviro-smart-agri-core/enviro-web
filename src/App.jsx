import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/signup';

// 1. Create a Layout component right here
// The <Outlet /> is the magic hole where React injects the actual page content (like Home)
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
        
        {/* =========================================
            GROUP 1: Pages WITH Header & Footer
            ========================================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* If you add an /about or /contact page later, drop them right here! */}
        </Route>


        {/* =========================================
            GROUP 2: Pages WITHOUT Header & Footer
            ========================================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

      </Routes>
    </Router>
  );
}