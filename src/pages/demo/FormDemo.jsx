import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import {
  FormInput,
  FormCheckbox,
  FormRadioGroup,
  FormSelect,
  FormDatePicker,
  FormTextarea,
  FormSwitch
} from '../../components/ui/form';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';

const FormDemo = () => {
  const [formData, setFormData] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    birthDate: '',
    gender: '',
    country: '',
    agreeTerms: false,
    receiveNotifications: true,
    employmentStatus: '',
    interests: [],
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    bio: Yup.string().max(200, 'Bio must be at most 200 characters'),
    birthDate: Yup.date().nullable(),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    employmentStatus: Yup.string().required('Employment status is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setFormData(values);
      setSubmitting(false);
      // resetForm();
    }, 1000);
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'ae', label: 'United Arab Emirates' },
  ];

  const employmentOptions = [
    { value: 'full_time', label: 'Full-time' },
    { value: 'part_time', label: 'Part-time' },
    { value: 'self_employed', label: 'Self-employed' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
  ];

  const tabs = [
    {
      label: 'Form Components',
      content: (
        <div className="py-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  
                  <FormInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    required
                  />
                </div>
                
                <FormInput
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  helperText="We'll never share your email with anyone else."
                  required
                />
                
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  helperText="Your password must be at least 8 characters long."
                  required
                />
                
                <FormTextarea
                  name="bio"
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  helperText="Maximum 200 characters"
                  rows={4}
                />
                
                <FormDatePicker
                  name="birthDate"
                  label="Birth Date"
                  helperText="Optional: Select your date of birth"
                />
                
                <FormRadioGroup
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  required
                />
                
                <FormSelect
                  name="country"
                  label="Country"
                  options={countryOptions}
                  placeholder="Select your country"
                  required
                />
                
                <FormRadioGroup
                  name="employmentStatus"
                  label="Employment Status"
                  options={employmentOptions}
                  required
                />
                
                <FormSwitch
                  name="receiveNotifications"
                  label="Receive Notifications"
                  helperText="We'll send you updates about our services."
                />
                
                <FormCheckbox
                  name="agreeTerms"
                  label="I agree to the terms and conditions"
                  required
                />
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => console.log('Cancel clicked')}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ),
    },
    {
      label: 'Form Data',
      content: (
        <div className="py-4">
          {formData ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submitted Form Data:</h3>
              <pre className="bg-white p-4 rounded border overflow-auto max-h-96">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No form data submitted yet. Fill out and submit the form to see the data here.</p>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card title="Shadcn-Inspired Form Components">
          <Tabs tabs={tabs} />
        </Card>
      </motion.div>
    </div>
  );
};

export default FormDemo;
