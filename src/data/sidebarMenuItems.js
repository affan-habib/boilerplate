import { 
  FaHome, 
  FaShoppingCart, 
  FaBox, 
  FaUsers, 
  FaCog, 
  FaChartBar, 
  FaTags, 
  FaTrademark, 
  FaStar, 
  FaBuilding, 
  FaBlog, 
  FaBullhorn, 
  FaHeadset, 
  FaLayerGroup, 
  FaUsersCog, 
  FaTruck, 
  FaCoins,
  FaWpforms
} from 'react-icons/fa';

const sidebarMenuItems = [
  {
    path: '/dashboard',
    icon: <FaBox />,
    label: 'Dashboard'
  },
  {
    label: 'Products',
    icon: <FaBox />,
    children: [
      { path: '/products', label: 'All Products' },
      {
        label: 'Category',
        icon: <FaTags />,
        path: '/products/categories'
      },
      {
        label: 'Brand',
        icon: <FaTrademark />,
        path: '/products/brands'
      },
      {
        label: 'Product Reviews',
        icon: <FaStar />,
        path: '/products/reviews'
      }
    ]
  },
  {
    label: 'Sales and Order',
    icon: <FaShoppingCart />,
    children: [
      { path: '/orders', label: 'All Orders' },
      { path: '/orders/pending', label: 'Pending Orders' },
      { path: '/orders/completed', label: 'Completed Orders' },
      { path: '/orders/cancelled', label: 'Cancelled Orders' }
    ]
  },
  {
    path: '/customers',
    icon: <FaUsers />,
    label: 'Customers'
  },
  {
    label: 'Partner Vendors',
    icon: <FaBuilding />,
    path: '/vendors'
  },
  {
    label: 'Reports',
    icon: <FaChartBar />,
    children: [
      { path: '/reports/sales', label: 'Sales Reports' },
      { path: '/reports/inventory', label: 'Inventory Reports' },
      { path: '/reports/customers', label: 'Customer Reports' },
      { path: '/reports/vendors', label: 'Vendor Reports' }
    ]
  },
  {
    label: 'Blog System',
    icon: <FaBlog />,
    children: [
      { path: '/blog/posts', label: 'All Posts' },
      { path: '/blog/categories', label: 'Categories' },
      { path: '/blog/comments', label: 'Comments' }
    ]
  },
  {
    label: 'Marketing',
    icon: <FaBullhorn />,
    children: [
      { path: '/marketing/campaigns', label: 'Campaigns' },
      { path: '/marketing/promotions', label: 'Promotions' },
      { path: '/marketing/coupons', label: 'Coupons' }
    ]
  },
  {
    label: 'Support',
    icon: <FaHeadset />,
    path: '/support'
  },
  {
    label: 'Homepage Setup',
    icon: <FaLayerGroup />,
    path: '/homepage-setup'
  },
  {
    label: 'Staffs/Admin Manager',
    icon: <FaUsersCog />,
    path: '/staff'
  },
  {
    label: 'Delivery',
    icon: <FaTruck />,
    path: '/delivery'
  },
  {
    label: 'Loyalty and Reward Points',
    icon: <FaCoins />,
    path: '/loyalty'
  },
  {
    label: 'Demo Form',
    icon: <FaWpforms />,
    path: '/demo/form'
  }
];

export default sidebarMenuItems;
