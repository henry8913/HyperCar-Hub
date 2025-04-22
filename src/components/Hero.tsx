import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  featuredCars: {
    id: number;
    brand: string;
    model: string;
    image: string;
    category: string;
  }[];
}

const Hero = ({ featuredCars }: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate through featured cars every 5 seconds
  useEffect(() => {
    if (featuredCars.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === featuredCars.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredCars.length]);

  if (!featuredCars.length) {
    return (
      <div className="relative h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Discover Extraordinary Cars
          </h1>
          <p className="mt-4 text-xl text-slate-300">
            Loading amazing vehicles...
          </p>
        </div>
      </div>
    );
  }

  const currentCar = featuredCars[currentIndex];

  return (
    <div className="relative min-h-[600px] h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={currentCar.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          src={currentCar.image} 
          alt={`${currentCar.brand} ${currentCar.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
        <div className="max-w-3xl pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block bg-amber-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {currentCar.brand}
            </span>
          </motion.div>

          <motion.h1 
            key={`title-${currentCar.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow"
          >
            {currentCar.brand} <span className="text-amber-500">{currentCar.model}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl text-slate-300 mb-8"
          >
            Scopri prestazioni e lusso senza precedenti in una delle automobili più straordinarie al mondo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to={`/brand/${currentCar.brand.toLowerCase()}`} 
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Esplora 
              <ChevronRight size={20} className="ml-1" />
            </Link>
            <Link 
              to="/brand/all" 
              className="bg-transparent border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Vedi Tutte le Auto
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Pagination Dots */}
      {featuredCars.length > 1 && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {featuredCars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-amber-500' : 'bg-white/50'
              } transition-colors`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;