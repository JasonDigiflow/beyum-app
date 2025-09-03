'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Star, 
  Megaphone,
  DollarSign,
  Settings,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Store
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Store, label: 'Marques digitales', href: '/brands' },
  { icon: ShoppingCart, label: 'Commandes', href: '/orders' },
  { icon: Package, label: 'Approvisionnement', href: '/supplies' },
  { icon: TrendingUp, label: 'Performance', href: '/performance' },
  { icon: Star, label: 'Avis clients', href: '/reviews' },
  { icon: Megaphone, label: 'Marketing', href: '/marketing' },
  { icon: DollarSign, label: 'Finance', href: '/finance' },
  { icon: Settings, label: 'Paramètres', href: '/settings' }
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-40 h-screen w-72 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border"
          >
            <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-beyum-blue to-beyum-green rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-xl">B</span>
                </div>
                <span className="text-2xl font-black text-beyum-orange">BEYUM</span>
                <span className="text-xs bg-beyum-green/20 text-beyum-green px-2 py-1 rounded-full font-semibold">ERP</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="px-4 py-6 space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-item ${
                      isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-2 w-1 h-8 bg-beyum-orange rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Déconnexion</span>
              </button>

              <div className="bg-gradient-to-r from-beyum-blue/10 to-beyum-green/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Plan Gratuit
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Commission: 15% sur les ventes
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Support 24/7</span>
                  <button className="text-beyum-blue text-xs font-semibold hover:underline">
                    Aide
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-border">
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Menu size={24} />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {sidebarItems.find(item => pathname === item.href)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-beyum-orange rounded-full animate-pulse"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-gray-200 dark:border-dark-border p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-beyum-blue/10 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Nouvelle commande</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Commande #2345 reçue il y a 2 min</p>
                    </div>
                    <div className="p-3 bg-beyum-orange/10 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Stock faible</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Pain burger: 12 unités restantes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Restaurant Demo
                </p>
                <p className="text-xs text-gray-500">Pizza Palace</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-beyum-blue to-beyum-green rounded-full flex items-center justify-center text-white font-bold">
                PP
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}