import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { lazy, Suspense } from 'react';
import store from './store';
import i18n from './i18n/i18n';
import { LanguageProvider } from './contexts/LanguageContext';

// Layouts
import PublicLayout from './layouts/public/PublicLayout';
import PrivateLayout from './layouts/private/PrivateLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy loaded pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const FormDemo = lazy(() => import('./pages/demo/FormDemo'));

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/login" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Login />
                  </Suspense>
                } />
                <Route path="/register" element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Register />
                  </Suspense>
                } />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                  <Route path="/dashboard" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <Dashboard />
                    </Suspense>
                  } />

                  {/* Orders Routes */}
                  <Route path="/orders" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>All Orders Page</div>
                    </Suspense>
                  } />
                  <Route path="/orders/pending" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Pending Orders Page</div>
                    </Suspense>
                  } />
                  <Route path="/orders/completed" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Completed Orders Page</div>
                    </Suspense>
                  } />

                  {/* Products Routes */}
                  <Route path="/products" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>All Products Page</div>
                    </Suspense>
                  } />
                  <Route path="/products/categories" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Product Categories Page</div>
                    </Suspense>
                  } />
                  <Route path="/products/catalog/digital" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Digital Products Page</div>
                    </Suspense>
                  } />
                  <Route path="/products/catalog/physical" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Physical Products Page</div>
                    </Suspense>
                  } />

                  {/* Customers Route */}
                  <Route path="/customers" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Customers Page</div>
                    </Suspense>
                  } />

                  {/* Reports Routes */}
                  <Route path="/reports/sales" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Sales Reports Page</div>
                    </Suspense>
                  } />
                  <Route path="/reports/inventory" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Inventory Reports Page</div>
                    </Suspense>
                  } />

                  {/* Settings Route */}
                  <Route path="/settings" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <div>Settings Page</div>
                    </Suspense>
                  } />

                  {/* Demo Form Route */}
                  <Route path="/demo/form" element={
                    <Suspense fallback={<LoadingScreen />}>
                      <FormDemo />
                    </Suspense>
                  } />
                </Route>
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
