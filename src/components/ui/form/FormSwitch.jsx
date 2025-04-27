import { useField } from 'formik';
import { motion } from 'framer-motion';

const FormSwitch = ({ label, helperText, className = '', ...props }) => {
  const [field, meta, helpers] = useField({ ...props, type: 'checkbox' });
  const hasError = meta.touched && meta.error;

  const handleToggle = () => {
    if (!props.disabled) {
      helpers.setValue(!field.value);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label 
            htmlFor={props.id || props.name} 
            className={`text-sm font-medium ${props.disabled ? 'text-gray-400' : 'text-gray-700'}`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <button
          type="button"
          role="switch"
          aria-checked={field.value}
          onClick={handleToggle}
          className={`
            relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full 
            transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${field.value ? 'bg-indigo-600' : 'bg-gray-200'}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={props.disabled}
          {...props}
        >
          <span className="sr-only">Toggle</span>
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
              transition ease-in-out duration-200
              ${field.value ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
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

export default FormSwitch;
