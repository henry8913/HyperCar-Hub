
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAllCars } from '../api/carService';
import { Car } from '../types/Car';
import { ArrowRight, Heart, Star, ShieldCheck, Zap, Check } from 'lucide-react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [featuredForHero, setFeaturedForHero] = useState<Array<{
    id: string;
    brand: string;
    model: string;
    image: string;
    category: string;
  }>>([]);

  // Helper function to get random cars
  const getRandomCars = (carList: Car[], count: number) => {
    const shuffled = [...carList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(car => ({
      id: car.id,
      brand: car.brand,
      model: car.name.split(' ').slice(1).join(' '),
      image: car.imageUrl,
      category: car.brand
    }));
  };

  useEffect(() => {
    const loadCars = async () => {
      const fetchedCars = await fetchAllCars();
      setCars(fetchedCars);
      setFeaturedForHero(getRandomCars(fetchedCars, 3));
      setLoading(false);
    };
    loadCars();
  }, []);

  useEffect(() => {
    if (!cars.length) return;
    const interval = setInterval(() => {
      setFeaturedForHero(getRandomCars(cars, 3));
    }, 20000);
    return () => clearInterval(interval);
  }, [cars]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const mcLarenCars = cars.filter(car => car.brand.toLowerCase() === 'mclaren');
  const ferrariCars = cars.filter(car => car.brand.toLowerCase() === 'ferrari');
  const lamborghiniCars = cars.filter(car => car.brand.toLowerCase() === 'lamborghini');

  return (
    <div>
      <Hero featuredCars={featuredForHero} />

      {/* Why Choose Us Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perché Scegliere HyperCar Hub
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              La tua destinazione premium per le auto di lusso e supercar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: "Selezione Premium", desc: "Solo i migliori modelli" },
              { icon: ShieldCheck, title: "Garanzia Totale", desc: "Massima sicurezza" },
              { icon: Heart, title: "Passione Automotive", desc: "Esperti del settore" },
              { icon: Zap, title: "Consegna Rapida", desc: "Servizio veloce" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-slate-700 rounded-lg"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedSection 
        title="Collezione McLaren" 
        subtitle="Esplora la nostra collezione delle McLaren più potenti ed esclusive al mondo."
        cars={mcLarenCars}
        viewAllLink="/brand/mclaren"
      />

      {/* About Us Preview Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Chi Siamo
              </h2>
              <p className="text-slate-400 mb-6">
                HyperCar Hub è nato dalla passione per le auto di lusso e le supercar. 
                Il nostro team di esperti seleziona accuratamente ogni veicolo per garantire 
                solo il meglio ai nostri clienti.
              </p>
              <p className="text-slate-400 mb-8">
                Con anni di esperienza nel settore automotive di lusso, offriamo un servizio 
                personalizzato e professionale per soddisfare le esigenze dei nostri clienti più esigenti.
              </p>
              <Link 
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                Scopri di Più <ArrowRight size={20} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src="https://www.wsupercars.com/wallpapers-regular/Pagani/2023-Pagani-Utopia-001-1080.jpg" 
                  alt="Pagani Utopia" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://www.wsupercars.com/wallpapers-wide/Hennessey/2025-Hennessey-Venom-F5-M-Roadster-001-1080w.jpg" 
                  alt="Koenigsegg CC850" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden">
                <img 
                  src="https://www.wsupercars.com/wallpapers-regular/Bugatti/2022-Bugatti-Chiron-Super-Sport-007-2160.jpg" 
                  alt="Bugatti Chiron Super Sport 300+" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-8">
                <img 
                  src="https://www.wsupercars.com/wallpapers-regular/Aston-Martin/2024-Aston-Martin-Valhalla-001-1080.jpg" 
                  alt="Aston Martin Valhalla" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Models Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ultimi Arrivi
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Scopri le ultime aggiunte alla nostra esclusiva collezione
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...cars].sort(() => 0.5 - Math.random()).slice(0, 3).map((car, index) => (
              <div key={car.id} className="relative h-[400px] rounded-lg overflow-hidden group">
                <img 
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{car.name}</h3>
                  <p className="text-slate-300">{car.description.slice(0, 50)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Drive Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prenota il Tuo Test Drive
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Vivi l'emozione di guidare una delle nostre esclusive hypercar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <img 
                src="https://www.wsupercars.com/wallpapers-regular/Ford/2023-Ford-GT-Mk-IV-008-2160.jpg" 
                alt="Test Drive Experience" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="bg-slate-800 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Scegli la Tua Esperienza di Guida
                </h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-slate-300">
                    <Check className="text-amber-500 mr-3" size={20} />
                    Istruttore professionista dedicato
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="text-amber-500 mr-3" size={20} />
                    Percorsi personalizzati
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="text-amber-500 mr-3" size={20} />
                    Sessione fotografica inclusa
                  </li>
                  <li className="flex items-center text-slate-300">
                    <Check className="text-amber-500 mr-3" size={20} />
                    Briefing tecnico completo
                  </li>
                </ul>
                <Link 
                  to="/test-drive"
                  className="block w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center"
                >
                  Prenota Ora
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedSection 
        title="Collezione Ferrari" 
        subtitle="Scopri l'ineguagliabile ingegneria italiana con la nostra collezione Ferrari."
        cars={ferrariCars}
        viewAllLink="/brand/ferrari"
      />

      {/* Hypercar Showcase */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Hypercar in Evidenza
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Le più esclusive hypercar del momento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cars.filter(car => 
              car.brand.toLowerCase() === 'bugatti' || 
              car.brand.toLowerCase() === 'pagani'
            ).slice(0, 2).map((car, index) => (
              <div key={car.id} className="relative h-[500px] rounded-lg overflow-hidden group">
                <img 
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-white font-bold text-2xl mb-2">{car.name}</h3>
                  <p className="text-slate-300 mb-4">{car.description.slice(0, 60)}...</p>
                  <Link 
                    to={`/car/${car.id}`}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg transition-colors inline-block"
                  >
                    Scopri di più
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedSection 
        title="Collezione Lamborghini" 
        subtitle="Esperienza la potenza e il design italiano con la nostra selezione Lamborghini."
        cars={lamborghiniCars}
        viewAllLink="/brand/lamborghini"
      />

      {/* Reviews Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Recensioni dei Clienti
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://www.wsupercars.com/wallpapers-regular/McLaren/2016-McLaren-570S-Coupe-015-1080.jpg",
                text: "Consulenza professionale e servizio post-vendita eccellente per la mia McLaren",
                name: "Roberto",
                delay: 0
              },
              {
                image: "https://www.wsupercars.com/wallpapers-regular/Porsche/2025-Porsche-911-GT3-RS-with-Manthey-Kit-001-1080.jpg",
                text: "Servizio eccezionale! Ho acquistato la mia Porsche dei sogni grazie al team di HyperCar Hub.",
                name: "Marco",
                delay: 0.1
              },
              {
                image: "https://www.wsupercars.com/wallpapers-regular/Aston-Martin/2026-Aston-Martin-Valhalla-005-1080.jpg",
                text: "HyperCar Hub mi ha aiutato a trovare l'Aston Martin perfetta. Assistenza eccezionale!",
                name: "Sofia",
                delay: 0.2
              },
              {
                image: "https://www.wsupercars.com/wallpapers-regular/Lamborghini/2024-Lamborghini-Revuelto-Opera-Unica-006-1080.jpg",
                text: "Professionalità e competenza al top. La mia Lamborghini è sempre in ottime mani.",
                name: "Laura",
                delay: 0.3
              },
              {
                image: "https://www.wsupercars.com/wallpapers-regular/Pagani/2009-Pagani-Zonda-Cinque-Roadster-006-1080.jpg",
                text: "La mia Pagani è sempre stata curata in modo impeccabile. Servizio di altissimo livello.",
                name: "Alessandro",
                delay: 0.4
              },
              {
                image: "https://www.wsupercars.com/wallpapers-regular/Chevrolet/2014-Chevrolet-Camaro-1LE-001-1080.jpg",
                text: "Esperienza d'acquisto impeccabile. Il team mi ha guidato nella scelta perfetta.",
                name: "Giuseppe",
                delay: 0.5
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: review.delay }}
                className="bg-slate-700 rounded-lg overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={review.image}
                    alt={`${review.name}'s review`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">{review.name}</h4>
                    <div className="flex text-amber-500">{"★".repeat(5)}</div>
                  </div>
                  <p className="text-slate-300">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
            >
              Resta Aggiornato
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 mb-8 text-center"
            >
              Iscriviti alla nostra newsletter per ricevere in anteprima news, offerte esclusive e inviti a eventi speciali.
            </motion.p>
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.currentTarget.querySelector('input[type="email"]') as HTMLInputElement;
                if (email.value) {
                  const notification = document.createElement('div');
                  notification.className = 'fixed top-4 right-4 bg-slate-800 text-white px-6 py-4 rounded-lg shadow-xl border border-amber-500/20 backdrop-blur-sm z-50 animate-fade-in-down flex items-center';
                  notification.innerHTML = `
                    <svg class="w-6 h-6 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Grazie per esserti iscritto alla newsletter!
                  `;
                  document.body.appendChild(notification);
                  setTimeout(() => {
                    notification.classList.add('animate-fade-out');
                    setTimeout(() => notification.remove(), 500);
                  }, 3000);
                  email.value = '';
                }
              }}
            >
              <input 
                type="email" 
                placeholder="Il tuo indirizzo email"
                required
                className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit" 
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
              >
                Iscriviti Ora
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Pronto a Vivere l'Eccellenza Automobilistica?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white text-lg mb-8"
            >
              Scopri la nostra collezione esclusiva di veicoli di lusso e ad alte prestazioni.
              Prenota un test drive oggi e vivi l'emozione in prima persona.
            </motion.p>
            <Link to="/search">
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white text-amber-600 hover:bg-slate-100 font-semibold px-8 py-3 rounded-lg inline-flex items-center transition-colors"
              >
                Esplora Tutte le Auto <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
