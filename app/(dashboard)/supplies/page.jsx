'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus,
  Package,
  Truck,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Pain burger brioché',
    sku: 'PAI-001',
    supplier: 'Metro',
    price: 0.35,
    unit: 'pièce',
    minOrder: 50,
    currentStock: 120,
    minStock: 50,
    stockStatus: 'high',
    category: 'Pains'
  },
  {
    id: 2,
    name: 'Steak haché 150g',
    sku: 'VIA-002',
    supplier: 'Sysco',
    price: 1.20,
    unit: 'pièce',
    minOrder: 30,
    currentStock: 45,
    minStock: 30,
    stockStatus: 'medium',
    category: 'Viandes'
  },
  {
    id: 3,
    name: 'Tomates cerises bio',
    sku: 'LEG-003',
    supplier: 'Biocoop Pro',
    price: 3.50,
    unit: 'kg',
    minOrder: 5,
    currentStock: 8,
    minStock: 10,
    stockStatus: 'low',
    category: 'Légumes'
  },
  {
    id: 4,
    name: 'Mozzarella di Bufala',
    sku: 'FRO-004',
    supplier: 'Metro',
    price: 8.90,
    unit: 'kg',
    minOrder: 2,
    currentStock: 15,
    minStock: 5,
    stockStatus: 'high',
    category: 'Fromages'
  }
];

const suppliers = [
  { id: 1, name: 'Metro', orders: 45, totalAmount: 12350, rating: 4.8 },
  { id: 2, name: 'Sysco', orders: 38, totalAmount: 9870, rating: 4.6 },
  { id: 3, name: 'Biocoop Pro', orders: 22, totalAmount: 5430, rating: 4.9 }
];

export default function SuppliesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState({});

  const categories = ['all', 'Pains', 'Viandes', 'Légumes', 'Fromages', 'Sauces', 'Packaging'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const lowStockCount = products.filter(p => p.stockStatus === 'low').length;
  const cartItemsCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="section-title">Approvisionnement</h2>
          <p className="section-subtitle">
            Gérez vos stocks et commandes fournisseurs
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="btn-primary flex items-center gap-2">
            <ShoppingCart size={20} />
            Panier ({cartItemsCount})
          </button>
        </div>
      </div>

      {/* Alert for low stock */}
      {lowStockCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-beyum-orange/10 to-beyum-orange/20 border border-beyum-orange/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-beyum-orange" size={20} />
            <span className="font-semibold text-beyum-orange">
              {lowStockCount} produit{lowStockCount > 1 ? 's' : ''} en stock faible
            </span>
            <button className="ml-auto text-sm font-semibold text-beyum-orange hover:underline">
              Commander maintenant →
            </button>
          </div>
        </motion.div>
      )}

      {/* Suppliers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <motion.div
            key={supplier.id}
            whileHover={{ scale: 1.02 }}
            className="card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {supplier.name}
              </h3>
              <div className="flex items-center gap-1">
                <span className="text-beyum-yellow">★</span>
                <span className="text-sm font-semibold">{supplier.rating}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Commandes</span>
                <span className="font-semibold">{supplier.orders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold">{supplier.totalAmount.toLocaleString()}€</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-beyum-green">
              <Truck size={16} />
              <span className="text-xs font-semibold">Livraison 24-48h</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Products */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un produit, SKU..."
              className="input-field pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-beyum-blue"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Toutes catégories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Produit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">SKU</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Fournisseur</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Stock</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Prix</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                      {product.sku}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.supplier}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.stockStatus === 'high' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : product.stockStatus === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.currentStock} {product.unit}
                      </span>
                      {product.currentStock < product.minStock && (
                        <span className="text-xs text-red-600 mt-1">Min: {product.minStock}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {product.price.toFixed(2)}€
                    </p>
                    <p className="text-xs text-gray-500">/{product.unit}</p>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {cart[product.id] ? (
                        <>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold">
                            {cart[product.id]}
                          </span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="p-1 bg-beyum-blue text-white rounded hover:bg-beyum-blue/80 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(product.id)}
                          className="px-4 py-2 bg-gradient-to-r from-beyum-blue to-beyum-green text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Commander
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}