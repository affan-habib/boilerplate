import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';

const PublicLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`min-h-screen ${isLoginPage ? '' : 'bg-gray-50'} flex flex-col`}>
      {!isLoginPage && (
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-xl font-bold text-indigo-600">{import.meta.env.VITE_APP_NAME || 'UAE Ecommerce'}</h1>
            </motion.div>
            <LanguageSwitcher />
          </div>
        </header>
      )}

      <main className={`flex-grow ${isLoginPage ? '' : 'container mx-auto px-4 py-8'}`}>
        <Outlet />
      </main>

      {!isLoginPage && (
        <footer className="bg-white py-4 border-t">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME || 'UAE Ecommerce'}. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
