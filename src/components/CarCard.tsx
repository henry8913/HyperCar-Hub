import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types/Car';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { ShoppingCart, Heart } from 'lucide-react';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites } = useUser();
  const [brand, model] = car.name.split(' ');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      const isCarFavorite = user.favorites.some(favCar => favCar.id === car.id);
      setIsFavorite(isCarFavorite);
    }
  }, [user, car.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;

    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 shadow-lg"
    >
      <Link to={`/car/${car.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {car.brand}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-500 transition-colors">
                {car.name}
              </h3>
              <p className="text-sm text-slate-400">{brand}</p>
            </div>
            <p className="text-amber-500 font-bold">
              ${car.price.toLocaleString()}
            </p>
          </div>

          <p className="text-sm text-slate-400 line-clamp-2 mb-4">
            {car.description}
          </p>

          <div className="flex gap-2">
            <button className="flex-1 bg-slate-700 hover:bg-amber-600 text-white py-2 rounded transition-colors text-sm font-medium">
              Vedi Dettagli
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(car);
              }}
              className="ml-2 bg-amber-600 hover:bg-amber-500 text-white p-2 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
            {user && (
              <button
                onClick={toggleFavorite}
                className={`ml-2 p-2 rounded-lg transition-colors ${
                  isFavorite ? 'bg-red-600 hover:bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
                } text-white`}
              >
                <Heart size={20} fill={isFavorite ? "white" : "none"} />
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;