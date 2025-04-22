
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllCars } from '../api/carService';
import { Car } from '../types/Car';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TestDrivePage = () => {
  const [searchParams] = useSearchParams();
  const initialCarId = searchParams.get('carId');
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<string>(initialCarId || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  useEffect(() => {
    const loadCars = async () => {
      const allCars = await fetchAllCars();
      setCars(allCars);
      setLoading(false);
    };
    loadCars();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime) {
      return;
    }
    // Here you would typically send the data to your backend
    console.log('Form submitted:', { 
      ...formData, 
      carId: selectedCar,
      date: selectedDate,
      time: selectedTime
    });
    setFormSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter available dates (example: only future dates, no weekends)
  const filterDates = (date: Date) => {
    const day = date.getDay();
    return date > new Date() && day !== 0 && day !== 6;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="pt-16 bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-slate-800 rounded-xl p-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Prenotazione Test Drive Confermata!
            </h2>
            <p className="text-slate-300 mb-4">
              La tua richiesta di test drive è stata registrata con successo.
            </p>
            <p className="text-slate-300 mb-8">
              Riceverai una email di conferma con tutti i dettagli.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Torna alla Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="text-amber-500 hover:text-amber-400 flex items-center gap-2 mb-8"
        >
          <ArrowLeft size={20} />
          Torna indietro
        </button>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-8">
              <h1 className="text-3xl font-bold text-white mb-6">
                Prenota il Tuo Test Drive
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Scegli l'Auto e la Data
                  </h2>
                  <select
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none mb-4"
                  >
                    <option value="">Seleziona un'auto</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.brand} {car.name}
                      </option>
                    ))}
                  </select>

                  <div className="mb-4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      filterDate={filterDates}
                      minDate={new Date()}
                      placeholderText="Seleziona una data"
                      className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>

                  <div className="mb-4">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="">Seleziona un orario</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Calendar className="text-amber-500" size={20} />
                      <span>Disponibilità dal lunedì al venerdì</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="text-amber-500" size={20} />
                      <span>Durata: 60 minuti</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="text-amber-500" size={20} />
                      <span>Location: Autodromo di Monza</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    I Tuoi Dati
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nome e Cognome"
                        required
                        className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefono"
                        required
                        className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!selectedCar || !formData.name || !formData.email || !formData.phone || !selectedDate || !selectedTime}
                      className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-6"
                    >
                      Prenota Ora
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestDrivePage;
