import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarMenuItem = ({ item, sidebarExpanded, level = 0 }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  // Check if current path matches this item or any of its children
  const isActive = hasChildren 
    ? item.children.some(child => 
        location.pathname === child.path || 
        (child.children && child.children.some(grandchild => location.pathname === grandchild.path))
      )
    : location.pathname === item.path;
  
  // Indentation for nested items - only apply when sidebar is expanded
  const paddingLeft = sidebarExpanded && level > 0 ? `${level * 10 + 10}px` : '10px';
  
  // Animation variants for submenu
  const submenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      overflow: 'hidden',
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };
  
  // Open submenu if current path is within this menu's children
  useEffect(() => {
    if (hasChildren) {
      const shouldBeOpen = item.children.some(child => 
        location.pathname === child.path || 
        (child.children && child.children.some(grandchild => location.pathname === grandchild.path))
      );
      
      if (shouldBeOpen) {
        setIsOpen(true);
      }
    }
  }, [location.pathname, hasChildren, item.children]);
  
  // Handle toggle for submenu
  const toggleSubmenu = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };
  
  // Render a menu item with children (dropdown)
  if (hasChildren) {
    return (
      <li>
        <button
          onClick={toggleSubmenu}
          className={`w-full flex items-center rounded-md transition-all duration-200
            ${isActive || isOpen
              ? level === 0
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white'
                : 'bg-indigo-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }
            ${level === 0 ? 'py-2 px-2.5 text-sm' : 'py-1.5 px-2 text-xs'}`}
          style={{
            paddingLeft,
            width: sidebarExpanded ? 'auto' : '100%'
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className={`flex items-center ${!sidebarExpanded ? 'justify-center w-full' : ''}`}>
              {item.icon && (
                <span className={`flex-shrink-0 ${level > 0 ? 'scale-90' : ''}`}>
                  {item.icon}
                </span>
              )}
              
              {sidebarExpanded && (
                <span className={`ms-3 ${level === 0 ? 'font-medium text-sm' : 'font-normal text-xs'}`}>
                  {item.label}
                </span>
              )}
            </div>
            
            {sidebarExpanded && (
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <svg 
                  className="w-3.5 h-3.5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </motion.div>
            )}
          </div>
        </button>
        
        {sidebarExpanded && (
          <motion.ul
            initial={isOpen ? "open" : "closed"}
            animate={isOpen ? "open" : "closed"}
            variants={submenuVariants}
            className="ml-2 mt-0.5 space-y-0.5 bg-gray-900 rounded-md py-1 px-0.5 border-l border-gray-700"
          >
            {item.children.map((child, index) => (
              <SidebarMenuItem
                key={`${child.path || child.label}-${index}`}
                item={child}
                sidebarExpanded={sidebarExpanded}
                level={level + 1}
              />
            ))}
          </motion.ul>
        )}
      </li>
    );
  }
  
  // Render a regular menu item (link)
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) => {
          // Base classes for all menu items
          let baseClasses = `flex items-center rounded-md transition-all duration-200 ${!sidebarExpanded ? 'justify-center' : ''}`;
          
          // Different styling for parent vs child menu items
          if (level === 0) {
            baseClasses += " py-2 px-2.5 text-sm";
          } else {
            baseClasses += " py-1.5 px-2 text-xs"; // Smaller padding and font for submenu items
          }
          
          // Active and inactive states
          if (isActive) {
            return `${baseClasses} ${level === 0
              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm'
              : 'bg-indigo-800 text-white'}`;
          } else {
            return `${baseClasses} ${level === 0
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`;
          }
        }}
        style={{
          paddingLeft,
          width: sidebarExpanded ? 'auto' : '100%'
        }}
      >
        <div className={`flex items-center ${!sidebarExpanded ? 'justify-center w-full' : ''}`}>
          {item.icon && (
            <span className={`flex-shrink-0 ${level > 0 ? 'scale-90' : ''}`}>
              {item.icon}
            </span>
          )}
          
          {sidebarExpanded && (
            <span className={`ms-3 ${level === 0 ? 'font-medium text-sm' : 'font-normal text-xs'}`}>
              {item.label}
            </span>
          )}
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;
