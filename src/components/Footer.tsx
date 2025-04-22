import { Link } from 'react-router-dom';
import { Car, Instagram, Facebook, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-bold">
                Hyper<span className="text-amber-500">Car</span> Hub
              </span>
            </div>
            <p className="text-slate-400 mb-4">
              Scopri le automobili più straordinarie al mondo. 
              La tua destinazione principale per veicoli di lusso e alte prestazioni.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/brand/all" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Brand
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Confronta
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Top Brands</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/brand/lamborghini" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Lamborghini
                </Link>
              </li>
              <li>
                <Link to="/brand/ferrari" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Ferrari
                </Link>
              </li>
              <li>
                <Link to="/brand/bugatti" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Bugatti
                </Link>
              </li>
              <li>
                <Link to="/brand/mclaren" className="text-slate-400 hover:text-amber-500 transition-colors">
                  McLaren
                </Link>
              </li>
              <li>
                <Link to="/brand/porsche" className="text-slate-400 hover:text-amber-500 transition-colors">
                  Porsche
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-slate-400 mb-2">Have questions about a specific model?</p>
            <a href="mailto:info@hypercarhub.com" className="text-amber-500 hover:text-amber-400 transition-colors">
              info@hypercarhub.com
            </a>
            <p className="text-white font-semibold text-lg mt-6 mb-3">Newsletter</p>
            <form 
              className="flex flex-col gap-3"
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
                placeholder="Your email" 
                required
                className="bg-slate-700/50 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-600/50" 
              />
              <button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HyperCar Hub. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy" className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <button 
              onClick={scrollToTop}
              className="bg-slate-800 p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;