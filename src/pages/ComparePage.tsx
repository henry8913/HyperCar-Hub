import { useState, useEffect } from 'react';
import { fetchAllCars } from '../api/carService';
import { Car } from '../types/Car';
import LoadingSpinner from '../components/LoadingSpinner';
import { ChevronDown, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparePage = () => {
  const [loading, setLoading] = useState(true);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      const cars = await fetchAllCars();
      setAllCars(cars);
      setLoading(false);
    };

    loadCars();
  }, []);

  const handleAddCar = (carId: string) => {
    const car = allCars.find(c => c.id === carId);
    if (car && selectedCars.length < 2) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const handleRemoveCar = (index: number) => {
    const newSelectedCars = [...selectedCars];
    newSelectedCars.splice(index, 1);
    setSelectedCars(newSelectedCars);
  };

  const startCompare = () => {
    if (selectedCars.length >= 2) {
      setComparing(true);
    }
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
          Confronta Auto
        </h1>
        <p className="text-slate-400 mb-8">
          Seleziona 2 veicoli per confrontare le specifiche fianco a fianco.
        </p>

        {!comparing ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[0, 1].map((index) => (
                <div key={index} className="bg-slate-800 rounded-lg overflow-hidden">
                  {selectedCars[index] ? (
                    <div className="relative">
                      <img 
                        src={selectedCars[index].imageUrl} 
                        alt={selectedCars[index].name}
                        className="w-full h-48 object-cover"
                      />
                      <button 
                        onClick={() => handleRemoveCar(index)}
                        className="absolute top-2 right-2 bg-slate-900/80 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {selectedCars[index].name}
                        </h3>
                        <p className="text-amber-500 font-medium mb-3">
                          €{selectedCars[index].price.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-400">
                          {selectedCars[index].brand}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 h-64 flex flex-col items-center justify-center">
                      <p className="text-slate-400 text-center mb-4">
                        {index === 0 ? (
                          "Seleziona un'auto da confrontare"
                        ) : (
                          "Aggiungi un'altra auto (opzionale)"
                        )}
                      </p>
                      <div className="relative w-full">
                        <select 
                          onChange={(e) => handleAddCar(e.target.value)}
                          className="w-full bg-slate-700 text-white py-3 px-4 rounded-md appearance-none"
                          value=""
                        >
                          <option value="" disabled>Seleziona un'auto...</option>
                          {allCars
                            .filter(car => !selectedCars.some(sc => sc.id === car.id))
                            .map(car => (
                              <option key={car.id} value={car.id}>
                                {car.name}
                              </option>
                            ))
                          }
                        </select>
                        <ChevronDown size={20} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={startCompare}
                disabled={selectedCars.length < 2}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  selectedCars.length < 2 
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                Confronta Auto
              </button>
              {selectedCars.length < 2 && (
                <p className="mt-2 text-slate-500 text-sm flex justify-center items-center">
                  <AlertCircle size={16} className="mr-1" /> 
                  Seleziona almeno 2 auto per confrontare
                </p>
              )}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setComparing(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Torna alla Selezione
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full border-collapse min-w-[640px]">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-slate-800 text-white font-semibold rounded-tl-lg">
                      Specifiche
                    </th>
                    {selectedCars.map((car, index) => (
                      <th key={index} className={`p-4 text-left bg-slate-800 text-white font-semibold ${
                        index === selectedCars.length - 1 ? 'rounded-tr-lg' : ''
                      }`}>
                        <div className="flex flex-col">
                          <span className="text-amber-500">{car.brand}</span>
                          <span>{car.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="p-4 bg-slate-800/50 font-medium text-white">Immagine</td>
                    {selectedCars.map((car, index) => (
                      <td key={index} className="p-4 bg-slate-800/30">
                        <img 
                          src={car.imageUrl} 
                          alt={car.name} 
                          className="w-40 h-24 object-cover rounded"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="p-4 bg-slate-800/50 font-medium text-white">Marca</td>
                    {selectedCars.map((car, index) => (
                      <td key={index} className="p-4 bg-slate-800/30 text-white">
                        {car.brand}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="p-4 bg-slate-800/50 font-medium text-white">Prezzo</td>
                    {selectedCars.map((car, index) => (
                      <td key={index} className="p-4 bg-slate-800/30 text-amber-500 font-semibold">
                        €{car.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 bg-slate-800/50 font-medium text-white rounded-bl-lg">
                      Descrizione
                    </td>
                    {selectedCars.map((car, index) => (
                      <td key={index} className={`p-4 bg-slate-800/30 text-white text-sm ${
                        index === selectedCars.length - 1 ? 'rounded-br-lg' : ''
                      }`}>
                        {car.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;