import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Tabs from '../../components/ui/Tabs';

// Mock data for charts
const areaData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const barData = [
  { name: 'Mon', orders: 12, preorders: 5 },
  { name: 'Tue', orders: 19, preorders: 7 },
  { name: 'Wed', orders: 15, preorders: 9 },
  { name: 'Thu', orders: 21, preorders: 12 },
  { name: 'Fri', orders: 25, preorders: 15 },
  { name: 'Sat', orders: 18, preorders: 10 },
  { name: 'Sun', orders: 15, preorders: 8 },
];

const Dashboard = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      label: t('dashboard.orders'),
      content: (
        <div className="mt-4">
          <Card title={t('dashboard.orders')}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#6366F1" />
                  <Bar dataKey="preorders" fill="#A5B4FC" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: t('dashboard.earnings'),
      content: (
        <div className="mt-4">
          <Card title={t('dashboard.earnings')}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#6366F1" fill="#A5B4FC" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: t('dashboard.customers'),
      content: (
        <div className="mt-4">
          <Card title={t('dashboard.customers')}>
            <p className="text-gray-500">Customer data will be displayed here.</p>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('dashboard.welcome')}</h1>
        <p className="text-gray-600 text-lg">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={t('dashboard.stats.totalSales')}
          value="$24,780"
          change="+12.5% from last month"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="indigo"
        />

        <StatCard
          title={t('dashboard.stats.totalOrders')}
          value="125"
          change="+8.2% from last month"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          color="blue"
        />

        <StatCard
          title={t('dashboard.stats.averageOrder')}
          value="$198.24"
          change="+3.1% from last month"
          changeType="positive"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          color="green"
        />

        <StatCard
          title={t('dashboard.stats.conversionRate')}
          value="3.24%"
          change="-0.5% from last month"
          changeType="negative"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          color="red"
        />
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
};

export default Dashboard;
