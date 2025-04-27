import { useField } from 'formik';
import { motion } from 'framer-motion';

const FormCheckbox = ({ label, helperText, className = '', ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
  const hasError = meta.touched && meta.error;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            {...field}
            {...props}
            type="checkbox"
            checked={field.value}
            className={`
              h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500
              transition-colors duration-200
              ${hasError ? 'border-red-300' : ''}
              ${props.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
            `}
          />
        </div>
        
        {label && (
          <div className="ml-3 text-sm">
            <label 
              htmlFor={props.id || props.name} 
              className={`font-medium ${props.disabled ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {helperText && !hasError && (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="min-h-[20px] mt-1 ml-7">
        {hasError && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600"
          >
            {meta.error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default FormCheckbox;
