'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileText,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 42000, commission: 6300, net: 35700 },
  { month: 'Fév', revenue: 48000, commission: 7200, net: 40800 },
  { month: 'Mar', revenue: 51000, commission: 7650, net: 43350 },
  { month: 'Avr', revenue: 55000, commission: 8250, net: 46750 },
  { month: 'Mai', revenue: 58000, commission: 8700, net: 49300 },
  { month: 'Juin', revenue: 62000, commission: 9300, net: 52700 },
];

const transactions = [
  {
    id: 'INV-2024-001',
    date: '30/06/2024',
    type: 'revenue',
    description: 'Ventes Juin 2024',
    amount: 62000,
    status: 'completed'
  },
  {
    id: 'COMM-2024-006',
    date: '30/06/2024',
    type: 'commission',
    description: 'Commission BEYUM (15%)',
    amount: -9300,
    status: 'completed'
  },
  {
    id: 'PAYOUT-2024-006',
    date: '05/07/2024',
    type: 'payout',
    description: 'Virement bancaire',
    amount: 52700,
    status: 'pending'
  },
  {
    id: 'INV-2024-002',
    date: '31/05/2024',
    type: 'revenue',
    description: 'Ventes Mai 2024',
    amount: 58000,
    status: 'completed'
  },
  {
    id: 'COMM-2024-005',
    date: '31/05/2024',
    type: 'commission',
    description: 'Commission BEYUM (15%)',
    amount: -8700,
    status: 'completed'
  }
];

const invoices = [
  {
    id: 'FACT-2024-006',
    date: '30/06/2024',
    period: 'Juin 2024',
    amount: 52700,
    status: 'pending',
    dueDate: '15/07/2024'
  },
  {
    id: 'FACT-2024-005',
    date: '31/05/2024',
    period: 'Mai 2024',
    amount: 49300,
    status: 'paid',
    paidDate: '05/06/2024'
  },
  {
    id: 'FACT-2024-004',
    date: '30/04/2024',
    period: 'Avril 2024',
    amount: 46750,
    status: 'paid',
    paidDate: '05/05/2024'
  }
];

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'CA Total',
      value: '328 000€',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: '#00B4D8',
      subtitle: 'Cette année'
    },
    {
      title: 'Revenus nets',
      value: '278 800€',
      change: '+13.2%',
      isPositive: true,
      icon: TrendingUp,
      color: '#52D726',
      subtitle: 'Après commission'
    },
    {
      title: 'Commission BEYUM',
      value: '49 200€',
      change: '15%',
      isPositive: null,
      icon: CreditCard,
      color: '#FF6B35',
      subtitle: 'Taux fixe'
    },
    {
      title: 'Prochain paiement',
      value: '52 700€',
      change: '05/07',
      isPositive: null,
      icon: Calendar,
      color: '#FFD60A',
      subtitle: 'Dans 3 jours'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'revenue':
        return <ArrowUpRight className="text-green-500" size={16} />;
      case 'commission':
      case 'payout':
        return <ArrowDownRight className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Gérez vos revenus et commissions BEYUM</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
            <option value="custom">Personnalisé</option>
          </select>
          <button className="btn-primary flex items-center gap-2">
            <Download size={20} />
            Export comptable
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            className="card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              {stat.isPositive !== null && (
                <span className={`text-sm font-semibold ${
                  stat.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              )}
              {stat.isPositive === null && (
                <span className="text-sm font-semibold text-gray-500">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 font-semibold transition-colors ${
            activeTab === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Vue d'ensemble
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 px-1 font-semibold transition-colors ${
            activeTab === 'transactions' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 px-1 font-semibold transition-colors ${
            activeTab === 'invoices' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Factures
        </button>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Évolution des revenus</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#00B4D8" fill="#00B4D8" fillOpacity={0.6} name="CA Total" />
                <Area type="monotone" dataKey="commission" stackId="2" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} name="Commission" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Net Revenue Chart */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Revenus nets mensuels</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="net" fill="#52D726" name="Revenus nets" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Commission Info */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-blue-500" size={20} />
              <h3 className="font-bold text-gray-900">Structure de commission</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Plan Gratuit</p>
                  <p className="text-sm text-gray-600">Votre plan actuel</p>
                </div>
                <span className="text-2xl font-black" style={{ color: '#FF6B35' }}>15%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm">Aucun frais d'installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm">Support 24/7 inclus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm">Toutes les marques disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm">Paiement mensuel automatique</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Payment */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-yellow-500" size={20} />
              <h3 className="font-bold text-gray-900">Prochain paiement</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">Virement en cours</p>
                    <p className="text-sm text-gray-600">Période: Juin 2024</p>
                  </div>
                  <span className="text-2xl font-black" style={{ color: '#52D726' }}>52 700€</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Date prévue: <span className="font-semibold">05/07/2024</span></p>
                  <p>Compte: <span className="font-semibold">****4567</span></p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900 font-medium mb-2">Détail du calcul</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CA Total</span>
                    <span className="font-semibold">62 000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission (15%)</span>
                    <span className="font-semibold text-red-600">- 9 300€</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Net à recevoir</span>
                    <span className="font-black text-green-600">52 700€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Montant</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Statut</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="font-mono text-sm">{transaction.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm">{transaction.date}</td>
                    <td className="py-4 px-6 text-sm">{transaction.description}</td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}€
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                        {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <motion.div
              key={invoice.id}
              whileHover={{ scale: 1.01 }}
              className="card p-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <FileText size={32} className="text-gray-400" />
                  <div>
                    <h3 className="font-bold text-gray-900">{invoice.id}</h3>
                    <p className="text-sm text-gray-600">Période: {invoice.period}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {invoice.status === 'paid' 
                        ? `Payée le ${invoice.paidDate}` 
                        : `Échéance: ${invoice.dueDate}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">{invoice.amount.toLocaleString()}€</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                      {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="card p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-blue-600" size={20} />
              <span className="font-semibold text-blue-900">Facturation automatique</span>
            </div>
            <p className="text-sm text-blue-800">
              Vos factures sont générées automatiquement chaque fin de mois et disponibles dans votre espace.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}