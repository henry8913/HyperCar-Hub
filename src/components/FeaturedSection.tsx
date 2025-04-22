import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types/Car';
import CarCard from './CarCard';

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
  cars: Car[];
  viewAllLink: string;
}

const FeaturedSection = ({ title, subtitle, cars, viewAllLink }: FeaturedSectionProps) => {
  const [displayCount, setDisplayCount] = useState(6);

  return (
    <section className="py-8 md:py-16 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-400 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to={viewAllLink} 
              className="inline-block mt-4 md:mt-0 text-amber-500 hover:text-amber-400 font-medium transition-colors"
            >
              Vedi Tutti
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(0, displayCount).map((car, index) => (
            <CarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {cars.length > displayCount && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 6)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Carica Altri
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;