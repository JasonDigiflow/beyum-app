'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  Euro, 
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Download,
  Package,
  AlertCircle,
  Store,
  Sparkles,
  Bell,
  RefreshCw,
  Activity,
  Users,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import useGlobalStore from '@/store/globalStore';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLiveData, setShowLiveData] = useState(true);
  
  const { 
    stats, 
    restaurants, 
    notifications, 
    orders,
    simulateOrder,
    simulateReview,
    addNotification,
    markAllNotificationsAsRead
  } = useGlobalStore();

  // Simulate real-time data
  useEffect(() => {
    if (!showLiveData) return;
    
    const orderInterval = setInterval(() => {
      if (Math.random() > 0.7) simulateOrder();
    }, 8000);
    
    const reviewInterval = setInterval(() => {
      if (Math.random() > 0.8) simulateReview();
    }, 15000);
    
    return () => {
      clearInterval(orderInterval);
      clearInterval(reviewInterval);
    };
  }, [showLiveData, simulateOrder, simulateReview]);

  // Dynamic KPI cards with real data
  const kpiCards = [
    {
      title: "Revenus du jour",
      value: `${stats.totalRevenue.toLocaleString('fr-FR')}€`,
      change: `+${stats.monthlyGrowth}%`,
      trend: "up",
      icon: Euro,
      color: "from-beyum-blue to-beyum-green",
      onClick: () => router.push('/finance')
    },
    {
      title: "Commandes",
      value: stats.totalOrders.toLocaleString('fr-FR'),
      change: "+15%",
      trend: "up",
      icon: ShoppingBag,
      color: "from-beyum-green to-beyum-orange",
      onClick: () => router.push('/orders')
    },
    {
      title: "Panier moyen",
      value: `${stats.averageBasket}€`,
      change: "-2%",
      trend: "down",
      icon: Package,
      color: "from-beyum-orange to-purple-500",
      onClick: () => router.push('/performance')
    },
    {
      title: "Restaurants actifs",
      value: `${stats.activeRestaurants}/${restaurants.length}`,
      change: "stable",
      trend: "stable",
      icon: Store,
      color: "from-purple-500 to-pink-500",
      onClick: () => router.push('/brands')
    }
  ];

  // Chart data
  const revenueData = [
    { time: '00h', revenue: 120, orders: 8 },
    { time: '04h', revenue: 180, orders: 12 },
    { time: '08h', revenue: 450, orders: 35 },
    { time: '12h', revenue: 890, orders: 78 },
    { time: '16h', revenue: 720, orders: 65 },
    { time: '20h', revenue: 1100, orders: 98 },
    { time: 'Maintenant', revenue: stats.totalRevenue / 100, orders: Math.floor(stats.totalOrders / 20) }
  ];

  const platformData = [
    { name: 'Uber Eats', value: 45, color: '#00B4D8' },
    { name: 'Deliveroo', value: 30, color: '#52D726' },
    { name: 'Just Eat', value: 25, color: '#FF6B35' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate data refresh
    simulateOrder();
    addNotification({
      type: 'info',
      message: 'Données actualisées avec succès'
    });
    
    toast.success('Données actualisées');
    setIsRefreshing(false);
  };

  const handleNotificationClick = () => {
    markAllNotificationsAsRead();
    toast('Toutes les notifications marquées comme lues');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gradient-animated">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bienvenue! Voici vos performances en temps réel
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Live data toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLiveData(!showLiveData)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 glass-morphism ${
              showLiveData ? 'glow-green' : ''
            }`}
          >
            <Activity size={20} className={showLiveData ? 'text-green-500' : 'text-gray-500'} />
            <span className="font-medium">{showLiveData ? 'Live' : 'Pause'}</span>
            {showLiveData && (
              <span className="w-2 h-2 bg-green-500 rounded-full pulse"></span>
            )}
          </motion.button>

          {/* Period selector */}
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="glass-input px-4 py-2"
          >
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>

          {/* Notifications */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNotificationClick}
            className="relative p-2 glass-morphism rounded-lg"
          >
            <Bell size={20} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </motion.button>

          {/* Refresh button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 glass-morphism rounded-lg"
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
          >
            <RefreshCw size={20} className={isRefreshing ? 'text-beyum-blue' : ''} />
          </motion.button>

          {/* Export button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2"
            onClick={() => toast('Export disponible dans la version Pro')}
          >
            <Download size={20} />
            Exporter
          </motion.button>
        </div>
      </div>

      {/* KPI Cards with interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={kpi.onClick}
            className="card cursor-pointer group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${kpi.color} group-hover:scale-110 transition-transform`}
                >
                  <kpi.icon size={24} className="text-white" />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast(`Détails ${kpi.title}`);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical size={20} className="text-gray-400" />
                </motion.button>
              </div>
              
              <h3 className="text-gray-600 text-sm mb-1">{kpi.title}</h3>
              <div className="flex items-end justify-between">
                <motion.p 
                  className="text-2xl font-black text-gray-900"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {kpi.value}
                </motion.p>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-500' : 
                  kpi.trend === 'down' ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {kpi.trend === 'up' && <ArrowUp size={16} />}
                  {kpi.trend === 'down' && <ArrowDown size={16} />}
                  <span>{kpi.change}</span>
                </div>
              </div>

              {/* Mini sparkline */}
              <div className="mt-4 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData.slice(-4)}>
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00B4D8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="none"
                      fill={`url(#gradient-${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Orders Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-gray-900">Flux en temps réel</h2>
            {showLiveData && (
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full pulse"></span>
                Live
              </span>
            )}
          </div>
          <button 
            onClick={() => router.push('/orders')}
            className="text-sm text-beyum-blue hover:underline"
          >
            Voir tout →
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {orders.slice(0, 10).map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => toast(`Commande #${order.id} - ${order.restaurantName}`)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-beyum-blue to-beyum-green flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingBag size={20} className="text-white" />
                    </motion.div>
                    <div>
                      <p className="font-semibold">{order.restaurantName}</p>
                      <p className="text-sm text-gray-500">{order.platform} • {order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{order.amount}€</p>
                    <p className="text-xs text-gray-500">Maintenant</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {orders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Package size={48} className="mx-auto mb-2 opacity-30" />
              <p>Aucune commande pour le moment</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Évolution des revenus</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#52D726" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#00B4D8"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#FF6B35"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Platform Distribution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Répartition par plateforme</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {platformData.map((platform) => (
              <motion.div 
                key={platform.name}
                className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                whileHover={{ x: 5 }}
                onClick={() => toast(`${platform.name}: ${platform.value}% des commandes`)}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
                <span className="text-sm font-bold">{platform.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Restaurant Performance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-900">Performance des restaurants</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 glass-gradient rounded-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push(`/brands/${restaurant.id}`)}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-beyum-blue to-beyum-green flex items-center justify-center">
                      <Store size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{restaurant.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          restaurant.status === 'active' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-orange-100 text-orange-600'
                        }`}>
                          {restaurant.status === 'active' ? 'Actif' : 'Maintenance'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-xs font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{restaurant.revenue.toLocaleString('fr-FR')}€</p>
                    <p className="text-xs text-gray-500">{restaurant.orders} commandes</p>
                  </div>
                </div>
                
                {/* Performance bar */}
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${restaurant.performance}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, #00B4D8, #52D726)`
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Performance: {restaurant.performance}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating action button for quick actions */}
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-beyum-blue to-beyum-green shadow-lg flex items-center justify-center text-white"
          onClick={() => {
            simulateOrder();
            toast.success('Nouvelle commande simulée!');
          }}
        >
          <Sparkles size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}