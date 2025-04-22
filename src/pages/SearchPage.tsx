
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCars, searchCars } from '../api/carService';
import { Car } from '../types/Car';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import FilterBar from '../components/FilterBar';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [loading, setLoading] = useState(true);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [filteredResults, setFilteredResults] = useState<Car[]>([]);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      const cars = await fetchAllCars();
      setAllCars(cars);
      
      if (initialQuery.trim()) {
        const searchResults = await searchCars(initialQuery);
        setFilteredResults(searchResults);
      } else {
        setFilteredResults([]);
      }
      
      setLoading(false);
    };

    loadCars();
  }, [initialQuery]);

  const getUniqueCarBrands = () => {
    const brands = allCars.map(car => car.brand);
    return Array.from(new Set(brands));
  };

  const handleFilterChange = (filters: {
    minPrice: number;
    maxPrice: number;
    brand: string;
    searchQuery: string;
  }) => {
    let results = [...allCars];

    // Apply initial search filter
    if (initialQuery) {
      const query = initialQuery.toLowerCase();
      results = results.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    results = results.filter(car => 
      car.price >= filters.minPrice && 
      car.price <= filters.maxPrice
    );

    // Apply brand filter
    if (filters.brand !== 'all') {
      results = results.filter(car => 
        car.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Apply additional search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query)
      );
    }

    setFilteredResults(results);
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {initialQuery ? `Risultati di ricerca per "${initialQuery}"` : 'Ricerca'}
        </h1>
        <p className="text-slate-400 mb-6">
          {filteredResults.length} veicoli trovati
        </p>

        <FilterBar 
          brands={getUniqueCarBrands()} 
          onFilterChange={handleFilterChange}
          initialSearchQuery={initialQuery}
          onSearch={(query) => {
            if (query.trim()) {
              setSearchParams({ q: query });
            }
          }}
        />

        {!initialQuery ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400">
              Inizia a digitare per cercare le auto
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400 mb-4">
              Nessun risultato trovato per "{initialQuery}"
            </p>
            <p className="text-slate-500">
              Prova a controllare l'ortografia o usa parole chiave diverse.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredResults.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
