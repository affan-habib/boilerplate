import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { register } from '../../services/authService';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [registerError, setRegisterError] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('validation.required')),
    email: Yup.string()
      .email(t('validation.email'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(8, t('validation.passwordLength'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordMatch'))
      .required(t('validation.required')),
  });

  const handleSubmit = async (values) => {
    try {
      setRegisterError(null);
      await dispatch(register(values));
      navigate('/dashboard');
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('auth.register')}</h1>
            <p className="text-gray-600 mt-1">
              {t('auth.haveAccount')} <Link to="/login" className="text-indigo-600 hover:text-indigo-800">{t('auth.signIn')}</Link>
            </p>
          </div>

          {(registerError || error) && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              {registerError || error}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Input
                  name="name"
                  type="text"
                  label={t('auth.name')}
                  placeholder="John Doe"
                />

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

                <Input
                  name="confirmPassword"
                  type="password"
                  label={t('auth.confirmPassword')}
                  placeholder="••••••••"
                />

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    loading={loading}
                    disabled={isSubmitting}
                  >
                    {t('auth.signUp')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </Card>
    </div>
  );
};

export default Register;
