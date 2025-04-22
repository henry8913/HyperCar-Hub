
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="pt-16 min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle size={64} className="text-amber-500 mx-auto mb-6" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Grazie per il tuo acquisto!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 mb-8"
        >
          La tua richiesta è stata elaborata con successo. Riceverai presto una email di conferma.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Torna alla Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYouPage;
