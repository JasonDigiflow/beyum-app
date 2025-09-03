'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';

const orders = [
  {
    id: '#2345',
    platform: 'Uber Eats',
    brand: 'Burger Beast',
    customer: 'Jean Martin',
    items: ['1x Burger Classic', '1x Frites', '1x Coca'],
    amount: 24.90,
    status: 'preparing',
    time: '10:23',
    prepTime: 12
  },
  {
    id: '#2344',
    platform: 'Deliveroo',
    brand: 'Pizza Paradise',
    customer: 'Marie Dupont',
    items: ['1x Pizza Margherita', '1x Tiramisu'],
    amount: 28.50,
    status: 'ready',
    time: '10:18',
    prepTime: 15
  },
  {
    id: '#2343',
    platform: 'Just Eat',
    brand: 'Sushi Express',
    customer: 'Paul Durand',
    items: ['1x Menu Sashimi', '1x Miso'],
    amount: 45.00,
    status: 'delivered',
    time: '10:05',
    prepTime: 20
  },
  {
    id: '#2342',
    platform: 'Uber Eats',
    brand: 'Green Bowl',
    customer: 'Sophie Bernard',
    items: ['1x Buddha Bowl', '1x Smoothie'],
    amount: 18.90,
    status: 'pending',
    time: '10:02',
    prepTime: 8
  }
];

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: AlertCircle },
  preparing: { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  ready: { label: 'Prête', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle }
};

const platformColors = {
  'Uber Eats': 'from-green-500 to-green-600',
  'Deliveroo': 'from-cyan-500 to-cyan-600',
  'Just Eat': 'from-orange-500 to-orange-600'
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPlatform = selectedPlatform === 'all' || order.platform === selectedPlatform;
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const stats = {
    total: orders.length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    avgTime: Math.round(orders.reduce((acc, o) => acc + o.prepTime, 0) / orders.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="section-title">Gestion des commandes</h2>
          <p className="section-subtitle">
            Suivez et gérez toutes vos commandes en temps réel
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="btn-primary">
            Nouvelle commande
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total aujourd'hui</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-beyum-blue/20 rounded-lg flex items-center justify-center">
              <ShoppingBag size={20} className="text-beyum-blue" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">En préparation</p>
              <p className="text-2xl font-black text-yellow-600">{stats.preparing}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Prêtes</p>
              <p className="text-2xl font-black text-blue-600">{stats.ready}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Temps moyen</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{stats.avgTime} min</p>
            </div>
            <div className="w-10 h-10 bg-beyum-green/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-beyum-green" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par numéro ou client..."
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-beyum-blue"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="preparing">En préparation</option>
            <option value="ready">Prêtes</option>
            <option value="delivered">Livrées</option>
          </select>
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-beyum-blue"
          >
            <option value="all">Toutes les plateformes</option>
            <option value="Uber Eats">Uber Eats</option>
            <option value="Deliveroo">Deliveroo</option>
            <option value="Just Eat">Just Eat</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {order.id}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color} flex items-center gap-1`}>
                        <StatusIcon size={14} />
                        {statusInfo.label}
                      </div>
                      <div className={`px-3 py-1 bg-gradient-to-r ${platformColors[order.platform]} text-white rounded-full text-xs font-semibold`}>
                        {order.platform}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Client</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Marque</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Heure</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{order.time}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm text-gray-500 mb-1">Articles</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {order.items.join(' • ')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                      {order.amount.toFixed(2)}€
                    </p>
                    
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                            Accepter
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold">
                            Refuser
                          </button>
                        </>
                      )}
                      {order.status === 'preparing' && (
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold">
                          Marquer comme prête
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                          Confirmer livraison
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-semibold">
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}