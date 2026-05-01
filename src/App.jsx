import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/signup';

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

        </Route>



        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

      </Routes>
    </Router>
  );
}