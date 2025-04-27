import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color = 'indigo', change, changeType = 'neutral' }) => {
  const colorClasses = {
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600',
    green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-600',
    red: 'bg-gradient-to-br from-red-50 to-red-100 text-red-600',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600',
  };

  const changeClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>

          {change && (
            <div className={`mt-2 flex items-center text-sm ${changeClasses[changeType]}`}>
              {changeType === 'positive' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {changeType === 'negative' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span className="font-medium">{change}</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-full shadow-sm ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
