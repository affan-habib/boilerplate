import { motion } from 'framer-motion';

const Card = ({
  children,
  title,
  className = '',
  icon,
  animate = true,
  ...props
}) => {
  const cardContent = (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-5 py-4 border-b border-gray-50 flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          <h3 className="font-medium text-gray-800 text-lg">{title}</h3>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;
