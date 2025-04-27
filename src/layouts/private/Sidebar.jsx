import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import SidebarMenuItem from '../../components/ui/SidebarMenuItem';
import menuItems from '../../data/sidebarMenuItems';

const Sidebar = () => {
  const { sidebarExpanded } = useSelector((state) => state.ui);

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '64px' }
  };
  
  return (
    <motion.aside
      className="bg-gradient-to-b from-black to-gray-900 text-white h-screen fixed top-0 left-0 overflow-y-auto shadow-lg z-20"
      initial={sidebarExpanded ? 'expanded' : 'collapsed'}
      animate={sidebarExpanded ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-4 flex items-center justify-center border-b border-gray-800">
        {sidebarExpanded ? (
          <h1 className="text-lg font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            {import.meta.env.VITE_APP_NAME || "UAE Ecommerce"}
          </h1>
        ) : (
          <span className="text-xl font-bold bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">UAE</span>
        )}
      </div>

      <nav className="mt-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <SidebarMenuItem
              key={`${item.path || item.label}-${index}`}
              item={item}
              sidebarExpanded={sidebarExpanded}
            />
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
