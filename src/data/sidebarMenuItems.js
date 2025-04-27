// src/data/menuItems.js
import { 
  FaHome, FaShoppingCart, FaBox, FaUsers, FaCogs, FaChartBar, FaClipboardList, FaTags, FaList, FaUserTie, FaBlog, FaBullhorn, FaHeadset, FaGlobe, FaUserShield, FaTruck, FaGift, FaWpforms 
} from 'react-icons/fa';

const menuItems = [
  {
    path: '/dashboard',
    icon: FaHome,
    label: 'Dashboard'
  },
  {
    label: 'Products',
    icon: FaBox,
    children: [
      { path: '/products/categories', label: 'Category', icon: FaList },
      { path: '/products/brands', label: 'Brand', icon: FaTags },
      { path: '/products/reviews', label: 'Product Reviews', icon: FaClipboardList }
    ]
  },
  {
    label: 'Sales and Order',
    icon: FaShoppingCart,
    children: [
      { path: '/orders/pending', label: 'Pending Orders' },
      { path: '/orders/completed', label: 'Completed Orders' },
      { path: '/orders/cancelled', label: 'Cancelled Orders' }
    ]
  },
  {
    path: '/customers',
    icon: FaUsers,
    label: 'Customers'
  },
  {
    label: 'Partner Vendors',
    icon: FaUserTie,
    path: '/vendors'
  },
  {
    label: 'Reports',
    icon: FaChartBar,
    children: [
      { path: '/reports/sales', label: 'Sales Reports' },
      { path: '/reports/inventory', label: 'Inventory Reports' },
      { path: '/reports/customers', label: 'Customer Reports' },
      { path: '/reports/vendors', label: 'Vendor Reports' }
    ]
  },
  {
    label: 'Blog System',
    icon: FaBlog,
    children: [
      { path: '/blog/posts', label: 'All Posts' },
      { path: '/blog/categories', label: 'Categories' },
      { path: '/blog/comments', label: 'Comments' }
    ]
  },
  {
    label: 'Marketing',
    icon: FaBullhorn,
    children: [
      { path: '/marketing/campaigns', label: 'Campaigns' },
      { path: '/marketing/promotions', label: 'Promotions' },
      { path: '/marketing/coupons', label: 'Coupons' }
    ]
  },
  {
    label: 'Support',
    icon: FaHeadset,
    path: '/support'
  },
  {
    label: 'Homepage Setup',
    icon: FaGlobe,
    path: '/homepage-setup'
  },
  {
    label: 'Staffs/Admin Manager',
    icon: FaUserShield,
    path: '/staff'
  },
  {
    label: 'Delivery',
    icon: FaTruck,
    path: '/delivery'
  },
  {
    label: 'Loyalty and Reward Points',
    icon: FaGift,
    path: '/loyalty'
  },
  {
    label: 'Demo Form',
    icon: FaWpforms,
    path: '/demo/form'
  }
];

export default menuItems;