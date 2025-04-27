import { useField } from 'formik';
import { motion } from 'framer-motion';

const FormRadioGroup = ({ label, options, helperText, className = '', ...props }) => {
  const [field, meta, helpers] = useField(props);
  const hasError = meta.touched && meta.error;

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${props.name}-${option.value}`}
              name={props.name}
              type="radio"
              checked={field.value === option.value}
              onChange={() => handleChange(option.value)}
              onBlur={field.onBlur}
              disabled={props.disabled}
              className={`
                h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500
                ${hasError ? 'border-red-300' : ''}
                ${props.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
              `}
            />
            <label 
              htmlFor={`${props.name}-${option.value}`} 
              className={`ml-3 block text-sm font-medium ${props.disabled ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {option.label}
            </label>
          </div>
        ))}
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

export default FormRadioGroup;
