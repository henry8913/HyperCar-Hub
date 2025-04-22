
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../types/Car';
import { CarIcon, Check, X, Info } from 'lucide-react';

interface CarDetailProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetail = ({ car, isOpen, onClose }: CarDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(car?.imageUrl || '');

  if (!car) return null;

  const images = car.images && car.images.length > 0 
    ? car.images 
    : [car.imageUrl];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[90vw] md:max-w-4xl bg-slate-900/95 rounded-2xl z-50 overflow-y-auto shadow-xl border border-slate-800 max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white p-2 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Images */}
                <div>
                  <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-4 shadow-lg">
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
                        } transition-all duration-200 shadow-md`}
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

                {/* Right Column - Details */}
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
                    <button className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                      <span className="flex items-center justify-center gap-2">
                        <CarIcon size={18} />
                        Prenota Test Drive
                      </span>
                    </button>
                    <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                      <span className="flex items-center justify-center gap-2">
                        <Check size={18} />
                        Richiedi Info
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CarDetail;
