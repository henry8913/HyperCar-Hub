
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const { login, register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-slate-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-8">
            {isRegistering ? 'Registrazione' : 'Login'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 text-white px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded font-medium"
            >
              {isRegistering ? 'Registrati' : 'Accedi'}
            </button>
          </form>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-4 text-slate-400 hover:text-amber-500 transition-colors"
          >
            {isRegistering
              ? 'Hai già un account? Accedi'
              : 'Non hai un account? Registrati'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
