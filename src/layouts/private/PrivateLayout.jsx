import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../services/authService';
import NewSidebar from './NewSidebar';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const PrivateLayout = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { sidebarExpanded } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleLogout = () => {
    logoutUser(); // Remove cookie
    dispatch(logout()); // Update Redux state
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <NewSidebar />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarExpanded ? 'ml-[240px]' : 'ml-[64px]'}`}>
        <header className="bg-white shadow-sm z-10 border-b border-gray-100 fixed top-0 right-0 left-0 transition-all duration-300" style={{ left: sidebarExpanded ? '240px' : '64px' }}>
          <div className="px-6 py-4 flex justify-between items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center">
              <LanguageSwitcher />

              <div className="relative ml-5" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  aria-label="User menu"
                  aria-expanded={profileMenuOpen}
                >
                  {user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.name || 'User'}
                      className="w-9 h-9 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-800 to-black flex items-center justify-center text-white shadow-md">
                      <span className="text-sm font-medium">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                  )}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    {user && (
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        {user.role && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            {user.role}
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        // Navigate to profile settings
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('dashboard.profile')}
                    </button>

                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('dashboard.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
