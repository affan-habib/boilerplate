import { useField } from 'formik';
import { useState } from 'react';
import { motion } from 'framer-motion';

const FormDatePicker = ({ label, helperText, className = '', ...props }) => {
  const [field, meta, helpers] = useField(props);
  const hasError = meta.touched && meta.error;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={props.id || props.name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          {...field}
          {...props}
          type="date"
          className={`
            w-full px-3 py-2 bg-white border rounded-md shadow-sm text-sm
            transition-all duration-200 ease-in-out
            ${hasError 
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            }
            ${isFocused ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}
            ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            field.onBlur(e);
            setIsFocused(false);
          }}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      
      <div className="min-h-[20px] mt-1">
        {hasError ? (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {meta.error}
          </motion.p>
        ) : helperText ? (
          <p className="text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
};

export default FormDatePicker;
