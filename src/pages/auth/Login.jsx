import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { login } from '../../services/authService';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [loginError, setLoginError] = useState(null);

  const initialValues = {
    email: 'user@example.com',
    password: 'string',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('validation.email'))
      .required(t('validation.required')),
    password: Yup.string()
      .required(t('validation.required')),
  });

  const handleSubmit = async (values) => {
    try {
      setLoginError(null);
      await dispatch(login(values));
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      {/* Login Container */}
      <motion.div
        className="w-full max-w-5xl flex flex-col md:flex-row rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {/* Left side - Image */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden hidden md:flex">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <img
            src="https://picsum.photos/800/1000"
            alt="UAE Ecommerce"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-bold"
              >
                {import.meta.env.VITE_APP_NAME || 'UAE Ecommerce'}
              </motion.div>
              <LanguageSwitcher />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="max-w-md"
            >
              <h2 className="text-3xl font-bold mb-4">Welcome to the Future of E-commerce in UAE</h2>
              <p className="text-lg opacity-90">Discover a world of premium products and exceptional shopping experiences.</p>
            </motion.div>
          </div>
        </div>

        {/* Divider for desktop */}
        <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

        {/* Right side - Login form */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-10 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="md:hidden flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-indigo-600">
                {import.meta.env.VITE_APP_NAME || 'UAE Ecommerce'}
              </h1>
              <LanguageSwitcher />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('auth.login')}</h1>
                <p className="text-gray-600">
                  {t('auth.noAccount')} <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">{t('auth.signUp')}</Link>
                </p>
              </div>

              {(loginError || error) && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
                  {loginError || error}
                </div>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    <Input
                      name="email"
                      type="email"
                      label={t('auth.email')}
                      placeholder="email@example.com"
                    />

                    <Input
                      name="password"
                      type="password"
                      label={t('auth.password')}
                      placeholder="••••••••"
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800 font-medium">
                          {t('auth.forgotPassword')}
                        </Link>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full py-3 text-base"
                      loading={loading}
                      disabled={isSubmitting}
                    >
                      {t('auth.signIn')}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                        </svg>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
