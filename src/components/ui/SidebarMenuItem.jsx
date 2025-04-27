import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarMenuItem = ({ item, sidebarExpanded, level = 0 }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const isActive = hasChildren
    ? item.children.some(child =>
        location.pathname === child.path ||
        (child.children && child.children.some(grandchild => location.pathname === grandchild.path))
      )
    : location.pathname === item.path;

  const paddingLeft = sidebarExpanded ? `${level * 16 + 16}px` : '16px';

  const submenuVariants = {
    closed: { opacity: 0, height: 0, overflow: 'hidden', transition: { duration: 0.2, ease: 'easeInOut' } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeInOut' } }
  };

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

  const toggleSubmenu = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  if (hasChildren) {
    return (
      <li className="w-full">
        <button
          onClick={toggleSubmenu}
          className={`flex items-center justify-between w-full rounded-md transition-all duration-200 px-3 py-2
            ${isActive || isOpen ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          style={{ paddingLeft }}
        >
          <div className="flex items-center w-full gap-3">
            {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
            {sidebarExpanded && (
              <span className="text-sm font-medium truncate">{item.label}</span>
            )}
          </div>
          {sidebarExpanded && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          )}
        </button>
        {sidebarExpanded && (
          <motion.ul
            initial={isOpen ? 'open' : 'closed'}
            animate={isOpen ? 'open' : 'closed'}
            variants={submenuVariants}
            className="mt-0.5 space-y-0.5"
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

  return (
    <li className="w-full">
      <NavLink
        to={item.path}
        className={({ isActive }) => `
          flex items-center justify-between w-full rounded-md transition-all duration-200 px-3 py-2
          ${isActive ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
        `}
        style={{ paddingLeft }}
      >
        <div className="flex items-center w-full gap-3">
          {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
          {sidebarExpanded && (
            <span className="text-sm font-medium truncate">{item.label}</span>
          )}
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;