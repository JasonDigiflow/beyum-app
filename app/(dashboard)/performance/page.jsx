'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  Target,
  Award,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const performanceData = [
  { month: 'Jan', ca: 42000, commandes: 580, panier: 72, marge: 18 },
  { month: 'Fév', ca: 48000, commandes: 650, panier: 74, marge: 19 },
  { month: 'Mar', ca: 51000, commandes: 690, panier: 74, marge: 20 },
  { month: 'Avr', ca: 55000, commandes: 720, panier: 76, marge: 21 },
  { month: 'Mai', ca: 58000, commandes: 780, panier: 74, marge: 20 },
  { month: 'Juin', ca: 62000, commandes: 850, panier: 73, marge: 22 },
];

const brandPerformance = [
  { name: 'King Burger', value: 35, color: '#00B4D8' },
  { name: 'Pizza Roma', value: 25, color: '#52D726' },
  { name: 'Tacos Fiesta', value: 20, color: '#FF6B35' },
  { name: 'Sushi Master', value: 12, color: '#FFD60A' },
  { name: 'Pasta Bella', value: 8, color: '#9333EA' },
];

const platformPerformance = [
  { platform: 'Uber Eats', performance: 85, commandes: 420 },
  { platform: 'Deliveroo', performance: 78, commandes: 380 },
  { platform: 'Just Eat', performance: 72, commandes: 340 },
  { platform: 'Glovo', performance: 65, commandes: 280 },
];

const radarData = [
  { metric: 'Qualité', A: 88, B: 75, fullMark: 100 },
  { metric: 'Rapidité', A: 92, B: 85, fullMark: 100 },
  { metric: 'Service', A: 85, B: 80, fullMark: 100 },
  { metric: 'Prix', A: 78, B: 90, fullMark: 100 },
  { metric: 'Variété', A: 95, B: 70, fullMark: 100 },
  { metric: 'Fidélité', A: 82, B: 75, fullMark: 100 },
];

export default function PerformancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBrand, setSelectedBrand] = useState('all');

  const kpis = [
    {
      title: 'CA Total',
      value: '62 000€',
      change: '+12%',
      isPositive: true,
      icon: DollarSign,
      color: '#00B4D8'
    },
    {
      title: 'Commandes',
      value: '850',
      change: '+8.9%',
      isPositive: true,
      icon: ShoppingCart,
      color: '#52D726'
    },
    {
      title: 'Panier Moyen',
      value: '73€',
      change: '-1.4%',
      isPositive: false,
      icon: TrendingDown,
      color: '#FF6B35'
    },
    {
      title: 'Taux de conversion',
      value: '4.2%',
      change: '+0.3%',
      isPositive: true,
      icon: Target,
      color: '#FFD60A'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Performance</h1>
          <p className="text-gray-600 mt-1">Analysez vos métriques et optimisez votre business</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
          <button className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter size={20} />
            Filtrer
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Exporter
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.title}
            whileHover={{ scale: 1.02 }}
            className="card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${kpi.color}20` }}
              >
                <kpi.icon size={24} style={{ color: kpi.color }} />
              </div>
              <span className={`text-sm font-semibold ${
                kpi.isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{kpi.title}</h3>
            <p className="text-2xl font-black text-gray-900">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution CA */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Évolution du CA</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ca" stroke="#00B4D8" strokeWidth={2} name="CA (€)" />
              <Line type="monotone" dataKey="commandes" stroke="#52D726" strokeWidth={2} name="Commandes" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par marque */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Performance par marque</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandPerformance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {brandPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {brandPerformance.map((brand) => (
              <div key={brand.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  <span className="text-sm text-gray-600">{brand.name}</span>
                </div>
                <span className="text-sm font-semibold">{brand.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance par plateforme */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Performance par plateforme</h3>
          <div className="space-y-4">
            {platformPerformance.map((platform) => (
              <div key={platform.platform}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{platform.platform}</span>
                  <span className="text-sm text-gray-600">{platform.commandes} commandes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${platform.performance}%` }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="h-2 rounded-full"
                    style={{
                      background: `linear-gradient(to right, #00B4D8, #52D726)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analyse comparative */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 mb-4">Analyse comparative</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Votre restaurant" dataKey="A" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.6} />
              <Radar name="Moyenne secteur" dataKey="B" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="text-blue-500" size={24} />
          <h3 className="font-bold text-gray-900">Insights & Recommandations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-green-600" size={20} />
              <span className="font-semibold text-green-900">Opportunité</span>
            </div>
            <p className="text-sm text-green-800">
              King Burger performe 25% au-dessus de la moyenne. Augmentez sa visibilité pour maximiser les ventes.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-orange-600" size={20} />
              <span className="font-semibold text-orange-900">Amélioration</span>
            </div>
            <p className="text-sm text-orange-800">
              Le panier moyen baisse le weekend. Proposez des menus famille pour augmenter la valeur.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="text-blue-600" size={20} />
              <span className="font-semibold text-blue-900">Action</span>
            </div>
            <p className="text-sm text-blue-800">
              Activez une promotion sur Just Eat pour améliorer votre taux de conversion (-15% vs moyenne).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}