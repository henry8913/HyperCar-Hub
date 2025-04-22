import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartItems } = useCart(); // Access cart items from context

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
          <span className="text-xl font-bold tracking-tight">
            Hyper<span className="text-amber-500">Car</span> Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-amber-500 transition-colors font-medium">
            Home
          </Link>
          <Link to="/brand/all" className="text-white hover:text-amber-500 transition-colors font-medium">
            Brand
          </Link>
          <Link to="/compare" className="text-white hover:text-amber-500 transition-colors font-medium">
            Confronta
          </Link>
          <Link to="/about" className="text-white hover:text-amber-500 transition-colors font-medium">
            Chi Siamo
          </Link>
          {user ? (
            <Link to="/profile" className="text-white hover:text-amber-500 transition-colors font-medium">
              Profilo
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-amber-500 transition-colors font-medium">
              Accedi
            </Link>
          )}
          <Link to="/cart" className="text-white hover:text-amber-500 transition-colors font-medium relative">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link> {/* Added Cart Link */}
        </nav>

        {/* Search and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-full w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
          </form>

          <div className="flex items-center space-x-4 md:hidden">
            {user ? (
            <Link to="/profile" className="text-white hover:text-amber-500 transition-colors font-medium">
              Profilo
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-amber-500 transition-colors font-medium">
              Accedi
            </Link>
          )}
            <Link to="/cart" className="text-white hover:text-amber-500 transition-colors font-medium relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button 
              className="text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-800 text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
              </form>
              <Link to="/" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
                Home
              </Link>
              <Link to="/brand/all" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
                Brand
              </Link>
              <Link to="/compare" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
                Confronta
              </Link>
              <Link to="/about" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
                Chi Siamo
              </Link>
              {user ? (
            <Link to="/profile" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
              Profilo
            </Link>
          ) : (
            <Link to="/login" className="text-white hover:text-amber-500 py-2 transition-colors font-medium">
              Accedi
            </Link>
          )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;