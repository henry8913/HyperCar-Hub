
import { motion } from 'framer-motion';
import { Shield, Star, Clock, Users, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-16 bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src="https://www.wsupercars.com/wallpapers-regular/McLaren/2024-McLaren-750S-001-2160.jpg" 
          alt="Luxury car showroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                La Nostra Storia
              </h1>
              <p className="text-xl text-slate-300">
                Passione per l'eccellenza automobilistica dal 2023
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission and Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">La Nostra Missione</h3>
            <p className="text-slate-400">
              Rendere accessibile il mondo delle auto di lusso attraverso 
              un'esperienza digitale unica e coinvolgente.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">La Nostra Visione</h3>
            <p className="text-slate-400">
              Diventare il punto di riferimento digitale per gli appassionati 
              di supercar e hypercar in Italia.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">I Nostri Valori</h3>
            <p className="text-slate-400">
              Eccellenza, trasparenza e passione guidano ogni aspetto 
              del nostro lavoro.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Shield, title: "Affidabilità", value: "100%" },
            { icon: Star, title: "Recensioni", value: "5.0" },
            { icon: Clock, title: "Supporto", value: "24/7" },
            { icon: Users, title: "Clienti", value: "1000+" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-800 p-6 rounded-xl text-center"
            >
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[300px] rounded-xl overflow-hidden"
          >
            <img 
              src="https://www.wsupercars.com/wallpapers-wide/Ferrari/2020-Ferrari-SF90-Stradale-005-1080w.jpg" 
              alt="Ferrari SF90" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[300px] rounded-xl overflow-hidden"
          >
            <img 
              src="https://www.wsupercars.com/wallpapers-regular/Lamborghini/2024-Lamborghini-Revuelto-001-2100.jpg" 
              alt="Lamborghini Revuelto" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Il Nostro Team</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Il nostro team di esperti appassionati lavora instancabilmente per 
            portarti le migliori auto di lusso e le informazioni più accurate.
          </p>
        </motion.div>

        {/* Test Drive Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 py-16 rounded-xl">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
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
                  onClick={() => window.scrollTo(0, 0)}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center w-full justify-center"
                >
                  Prenota Ora <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
