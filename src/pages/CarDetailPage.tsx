import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CarIcon, Heart, Info, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { fetchCarById } from '../api/carService';
import { Car } from '../types/Car';
import LoadingSpinner from '../components/LoadingSpinner';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites } = useUser();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && car) {
      const isCarFavorite = user.favorites.some(favCar => favCar.id === car.id);
      setIsFavorite(isCarFavorite);
    }
  }, [user, car]);

  const toggleFavorite = () => {
    if (!user || !car) return;

    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const loadCar = async () => {
      if (id) {
        const carData = await fetchCarById(id);
        if (carData) {
          setCar(carData);
          setSelectedImage(carData.imageUrl);
        }
        setLoading(false);
      }
    };
    loadCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-slate-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pt-16 bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Auto non trovata</h2>
          <button 
            onClick={() => navigate(-1)}
            className="text-amber-500 hover:text-amber-400 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Torna indietro
          </button>
        </div>
      </div>
    );
  }

  const images = car.images && car.images.length > 0 ? car.images : [car.imageUrl];

  return (
    <div className="min-h-screen pt-16 bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="text-amber-500 hover:text-amber-400 flex items-center gap-2 mb-8"
        >
          <ArrowLeft size={20} />
          Torna indietro
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-xl overflow-hidden mb-4">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0.5, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage} 
                alt={`${car.brand} ${car.name}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-20 rounded-lg overflow-hidden ${
                    image === selectedImage 
                      ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-900' 
                      : 'opacity-70 hover:opacity-100'
                  } transition-all duration-200`}
                >
                  <img 
                    src={image} 
                    alt={`${car.brand} ${car.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-amber-600/20 text-amber-500 text-sm font-semibold px-3 py-1 rounded-full">
                {car.brand}
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-slate-400 text-sm">Premium</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {car.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl text-amber-500 font-bold">
                €{car.price.toLocaleString()}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">starting price</span>
            </div>

            <p className="text-slate-300 leading-relaxed mb-8">
              {car.description}
            </p>

            <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-amber-500" />
                Specifiche Principali
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span className="text-slate-400">Marca</span>
                  <span className="text-white font-medium">{car.brand}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span className="text-slate-400">Modello</span>
                  <span className="text-white font-medium">{car.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700">
                  <span className="text-slate-400">Prezzo Base</span>
                  <span className="text-white font-medium">€{car.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/test-drive?carId=${car.id}`}
                onClick={() => window.scrollTo(0, 0)}
                className="flex-1 bg-slate-700 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <CarIcon size={18} />
                  Prenota Test Drive
                </span>
              </Link>
              <button
                onClick={() => addToCart(car)}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Aggiungi al Carrello
                </span>
              </button>
              {user && (
                <button
                  onClick={toggleFavorite}
                  className={`ml-2 p-3 rounded-xl transition-colors ${
                    isFavorite ? 'bg-red-600 hover:bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                >
                  <Heart size={20} fill={isFavorite ? "white" : "none"} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;