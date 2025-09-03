'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Sparkles
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

const kpiCards = [
  {
    title: "Revenus aujourd'hui",
    value: "2,847€",
    change: "+23%",
    trend: "up",
    icon: Euro,
    color: "from-beyum-blue to-beyum-green"
  },
  {
    title: "Commandes",
    value: "124",
    change: "+15%",
    trend: "up",
    icon: ShoppingBag,
    color: "from-beyum-green to-beyum-orange"
  },
  {
    title: "Panier moyen",
    value: "23€",
    change: "-2%",
    trend: "down",
    icon: TrendingUp,
    color: "from-beyum-orange to-beyum-blue"
  },
  {
    title: "Temps moyen",
    value: "12 min",
    change: "-18%",
    trend: "up",
    icon: Clock,
    color: "from-beyum-blue to-beyum-green"
  }
];

const revenueData = [
  { time: '00h', revenue: 120 },
  { time: '04h', revenue: 80 },
  { time: '08h', revenue: 240 },
  { time: '12h', revenue: 680 },
  { time: '16h', revenue: 420 },
  { time: '20h', revenue: 890 },
  { time: '23h', revenue: 417 }
];

const brandPerformance = [
  { name: 'Burger Beast', value: 35, revenue: 998 },
  { name: 'Pizza Paradise', value: 28, revenue: 798 },
  { name: 'Sushi Express', value: 22, revenue: 627 },
  { name: 'Green Bowl', value: 15, revenue: 424 }
];

const COLORS = ['#00B4D8', '#52D726', '#FF6B35', '#FFA05C'];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [liveOrdersCount, setLiveOrdersCount] = useState(3);

  useEffect(() => {
    // Simulation de données en temps réel
    const interval = setInterval(() => {
      setLiveOrdersCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="section-title">
            Bonjour, Pierre 👋
          </h2>
          <p className="section-subtitle">
            Voici un aperçu de votre activité BEYUM
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-beyum-blue"
          >
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
          
          <button className="p-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Live Orders Alert */}
      {liveOrdersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-beyum-orange/10 to-beyum-orange/20 border border-beyum-orange/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-beyum-orange rounded-full animate-pulse"></div>
              <span className="font-semibold text-beyum-orange">
                {liveOrdersCount} commande{liveOrdersCount > 1 ? 's' : ''} en cours
              </span>
            </div>
            <button className="text-sm font-semibold text-beyum-orange hover:underline">
              Voir les détails →
            </button>
          </div>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="kpi-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-xl flex items-center justify-center text-white`}>
                <kpi.icon size={24} />
              </div>
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <MoreVertical size={16} className="text-gray-400" />
              </button>
            </div>
            
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              {kpi.title}
            </h3>
            
            <div className="flex items-end justify-between">
              <span className="text-3xl font-black text-gray-900 dark:text-white">
                {kpi.value}
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                kpi.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600'
              }`}>
                {kpi.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="text-xs font-semibold">{kpi.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Evolution des revenus
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-beyum-blue rounded-full"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Revenus</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00B4D8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#00B4D8"
                strokeWidth={3}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Brand Performance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Performance par marque
          </h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={brandPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {brandPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-3 mt-6">
            {brandPerformance.map((brand, index) => (
              <div key={brand.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {brand.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {brand.revenue}€
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Dernières commandes
          </h3>
          
          <div className="space-y-4">
            {[
              { id: '#2341', brand: 'Burger Beast', amount: '24.90€', status: 'delivered', time: 'il y a 5 min' },
              { id: '#2340', brand: 'Pizza Paradise', amount: '32.50€', status: 'preparing', time: 'il y a 12 min' },
              { id: '#2339', brand: 'Green Bowl', amount: '18.00€', status: 'delivered', time: 'il y a 18 min' },
              { id: '#2338', brand: 'Sushi Express', amount: '45.80€', status: 'pending', time: 'il y a 25 min' }
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-beyum-blue/20 to-beyum-green/20 rounded-lg flex items-center justify-center">
                    <ShoppingBag size={20} className="text-beyum-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.brand} • {order.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : order.status === 'preparing'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {order.status === 'delivered' ? 'Livrée' : order.status === 'preparing' ? 'En préparation' : 'En attente'}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {order.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 text-center text-beyum-blue font-semibold hover:underline">
            Voir toutes les commandes →
          </button>
        </motion.div>

        {/* Quick Actions & AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Insights & Actions rapides
          </h3>
          
          <div className="space-y-4">
            {/* AI Insight */}
            <div className="bg-gradient-to-r from-beyum-blue/10 to-beyum-green/10 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-beyum-blue rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Opportunité détectée
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Les commandes de burgers augmentent de 35% le mercredi soir. Préparez plus de stock.
                  </p>
                  <button className="text-sm font-semibold text-beyum-blue hover:underline">
                    Configurer une alerte →
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Alert */}
            <div className="bg-gradient-to-r from-beyum-orange/10 to-beyum-orange/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-beyum-orange rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Package size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Stock faible
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Pains burger: 12 unités restantes. Commandez avant demain.
                  </p>
                  <button className="text-sm font-semibold text-beyum-orange hover:underline">
                    Commander maintenant →
                  </button>
                </div>
              </div>
            </div>

            {/* New Brand Alert */}
            <div className="bg-gradient-to-r from-beyum-green/10 to-beyum-blue/10 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-beyum-green rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Nouvelles marques disponibles
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    6 nouvelles marques digitales sont disponibles pour votre restaurant.
                  </p>
                  <button 
                    onClick={() => router.push('/brands')}
                    className="text-sm font-semibold text-beyum-green hover:underline"
                  >
                    Découvrir les marques →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="btn-primary">
                Nouvelle commande
              </button>
              <button className="btn-secondary">
                Voir les stocks
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}