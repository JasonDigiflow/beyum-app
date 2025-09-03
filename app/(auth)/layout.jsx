'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-dark-bg dark:to-slate-900 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-beyum-blue/20 rounded-full blur-gradient animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-beyum-orange/20 rounded-full blur-gradient animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-beyum-green/20 rounded-full blur-gradient animate-pulse"></div>
      </div>
      
      {children}
    </div>
  );
}