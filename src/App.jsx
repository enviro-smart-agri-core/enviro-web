import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css'; 

export default function App() {
  return (
    <Router>
      <Header />
      
      {/* The Routes component handles swapping out page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Later, you can easily add more routes here, like: */}
        {/* <Route path="/features" element={<FeaturesPage />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}