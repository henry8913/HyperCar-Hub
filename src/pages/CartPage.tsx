
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, total } = useCart();
  const { user, addToPurchases } = useUser();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={48} className="text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Il tuo carrello è vuoto</h2>
          <p className="text-slate-400 mb-8">Esplora la nostra collezione di auto di lusso</p>
          <Link
            to="/brand/all"
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Sfoglia le Auto
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Il Tuo Carrello</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-lg p-4 mb-4 flex items-center"
              >
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-32 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-white font-semibold">{car.name}</h3>
                  <p className="text-amber-500 font-bold">€{car.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => removeFromCart(car.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Riepilogo Ordine</h3>
              <div className="mb-4">
                <div className="flex justify-between text-white mb-2">
                  <span>Subtotale</span>
                  <span>€{total.toLocaleString()}</span>
                </div>
              </div>
              {user ? (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Procedi al Checkout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white text-center py-3 rounded-lg font-semibold transition-colors block"
                >
                  Accedi per Acquistare
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
