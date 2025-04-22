
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FilterBar from '../components/FilterBar';
import { fetchAllCars } from '../api/carService';
import { Car } from '../types/Car';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BrandPage = () => {
  const { brand } = useParams<{ brand: string }>();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedBrand, setSelectedBrand] = useState(brand || 'all');

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      const allCars = await fetchAllCars();
      setCars(allCars);
      setFilteredCars(allCars);
      setLoading(false);
    };

    loadCars();
  }, []);

  useEffect(() => {
    if (brand) {
      setSelectedBrand(brand);
      const filtered = cars.filter(car => 
        car.brand.toLowerCase() === brand.toLowerCase()
      );
      setFilteredCars(filtered);
    }
  }, [brand, cars]);

  const getUniqueCarBrands = () => {
    const brands = cars.map(car => car.brand);
    return Array.from(new Set(brands));
  };

  const handleFilterChange = (filters: {
    minPrice: number;
    maxPrice: number;
    brand: string;
    searchQuery: string;
  }) => {
    let filtered = [...cars];

    // Apply price filter
    filtered = filtered.filter(car => 
      car.price >= filters.minPrice && 
      car.price <= filters.maxPrice
    );

    // Apply brand filter
    if (filters.brand !== 'all') {
      filtered = filtered.filter(car => 
        car.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query)
      );
    }

    setFilteredCars(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="pt-16 bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {selectedBrand === 'all' ? 'Tutte le Auto' : `Collezione ${selectedBrand}`}
          </h1>
          <p className="text-slate-400 mb-6">
            {filteredCars.length} veicoli trovati
          </p>

          <FilterBar 
            brands={getUniqueCarBrands()} 
            onFilterChange={handleFilterChange}
          />
        </div>

        {filteredCars.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              Nessuna Auto Trovata
            </h3>
            <p className="text-slate-400 mb-6">
              Non ci sono auto disponibili per questa marca.
            </p>
            <button 
              onClick={() => setSelectedBrand('all')}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Mostra Tutte le Auto
            </button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
