import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BrandPage from "./pages/BrandPage";
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './pages/ThankYouPage';
import ComparePage from './pages/ComparePage';
import LoadingSpinner from './components/LoadingSpinner';
import AboutPage from './pages/AboutPage';
import CarDetailPage from './pages/CarDetailPage';
import CarDetail from './components/CarDetail'; 
import TestDrivePage from './pages/TestDrivePage'; 
interface Car {
  id: number;
  make: string;
  model: string;
}

function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOpenCarDetail = (event: Event) => {
      const car = (event as CustomEvent).detail as Car; 
      setSelectedCar(car);
      setIsModalOpen(true);
    };

    window.addEventListener('openCarDetail', handleOpenCarDetail);
    return () => window.removeEventListener('openCarDetail', handleOpenCarDetail);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <LoadingSpinner size="large" color="primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-pulse">
            Hyper<span className="text-amber-500">Car</span> Hub
          </h1>
          <p className="text-slate-400">
            Caricamento veicoli straordinari...
          </p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/brand/:brand" element={<BrandPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/test-drive" element={<TestDrivePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={
                <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                    <p className="text-slate-400 mb-8">The page you are looking for doesn't exist or has been moved.</p>
                    <a href="/" className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Back to Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
            <CarDetail 
              car={selectedCar} 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;