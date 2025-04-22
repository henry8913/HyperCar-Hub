import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { CreditCard, User, MapPin } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { addToPurchases } = useUser();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@example.com',
    phone: '555-1234',
    address: 'Via Roma 123',
    city: 'Milano',
    zipCode: '20123',
    cardNumber: '4111 1111 1111 1111',
    cardExpiry: '12/25',
    cardCvc: '123'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add items to purchases before clearing cart
    cartItems.forEach(car => addToPurchases(car));
    clearCart();
    navigate('/thank-you');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout - Demo</h1>
        <div className="bg-yellow-200 p-4 rounded mb-4 text-black">
          Questo è un checkout demo. Nessun acquisto reale verrà effettuato.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <User className="text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Informazioni Personali</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    defaultValue="Demo"
                    required
                    className="col-span-1 bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Cognome"
                    defaultValue="User"
                    required
                    className="col-span-1 bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue="demo@example.com"
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg mt-4"
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefono"
                  defaultValue="555-1234"
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg mt-4"
                  onChange={handleInputChange}
                />
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Indirizzo di Spedizione</h2>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Indirizzo"
                  defaultValue="Via Roma 123"
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg"
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="Città"
                    defaultValue="Milano"
                    required
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="CAP"
                    defaultValue="20123"
                    required
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <CreditCard className="text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">Dettagli Pagamento</h2>
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Numero Carta"
                  defaultValue="4111 1111 1111 1111"
                  required
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg"
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    defaultValue="12/25"
                    required
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    placeholder="CVC"
                    defaultValue="123"
                    required
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Conferma Ordine (€{total?.toLocaleString()})
              </button>
            </form>
          </div>

          <div>
            <div className="bg-slate-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Riepilogo Ordine</h2>
              <div className="space-y-4">
                {cartItems.map((car) => (
                  <div key={car.id} className="flex items-center">
                    <img
                      src={car.imageUrl}
                      alt={car.name}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="text-white">{car.name}</h3>
                      <p className="text-amber-500">€{car.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-700 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Subtotale</span>
                  <span className="text-white">€{total?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white font-bold">Totale</span>
                  <span className="text-amber-500 font-bold text-xl">€{total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;