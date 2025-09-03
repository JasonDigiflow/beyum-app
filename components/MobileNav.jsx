'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X,
  LayoutGrid,
  ShoppingBag,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Star,
  Megaphone,
  DollarSign,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingBag, label: 'Marques', href: '/brands' },
    { icon: Package, label: 'Produits', href: '/products' },
    { icon: Users, label: 'Équipe', href: '/team' },
    { icon: ShoppingCart, label: 'Commandes', href: '/orders' },
    { icon: TrendingUp, label: 'Performance', href: '/performance' },
    { icon: Star, label: 'Avis', href: '/reviews' },
    { icon: Megaphone, label: 'Marketing', href: '/marketing' },
    { icon: DollarSign, label: 'Finance', href: '/finance' },
    { icon: Settings, label: 'Paramètres', href: '/settings' }
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-beyum-blue to-beyum-green flex items-center justify-center">
              <span className="text-white font-black text-lg">B</span>
            </div>
            <span className="font-black text-xl">BEYUM</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="md:hidden fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 flex flex-col"
            >
              {/* Menu Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Menu</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beyum-blue to-beyum-green flex items-center justify-center">
                    <span className="text-white font-bold">PA</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Pierre Admin</p>
                    <p className="text-xs text-gray-600">Groupe Beyum</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${isActive(item.href) 
                          ? 'bg-gradient-to-r from-beyum-blue to-beyum-green text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                      {isActive(item.href) && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700">
                  <Settings size={20} />
                  <span className="font-medium">Paramètres</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600">
                  <LogOut size={20} />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation (Alternative) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-30">
        <div className="flex items-center justify-around py-2">
          {menuItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-lg
                ${isActive(item.href) 
                  ? 'text-beyum-blue' 
                  : 'text-gray-500'
                }
              `}
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}