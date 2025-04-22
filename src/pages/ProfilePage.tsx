
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CarCard from '../components/CarCard';

const ProfilePage = () => {
  const { user, logout } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Area Personale</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Profilo</h2>
            <p className="text-slate-400">Nome: {user.name}</p>
            <p className="text-slate-400">Email: {user.email}</p>
            <button
              onClick={logout}
              className="mt-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Auto Preferite</h2>
            {user.favorites.length === 0 ? (
              <p className="text-slate-400">Nessuna auto preferita</p>
            ) : (
              <div className="grid gap-4">
                {user.favorites.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Storico Acquisti</h2>
            {user.purchases.length === 0 ? (
              <p className="text-slate-400">Nessun acquisto effettuato</p>
            ) : (
              <div className="grid gap-4">
                {user.purchases.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
