'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full animate-pulse" style={{background: 'rgba(0, 180, 216, 0.2)', filter: 'blur(40px)'}}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full animate-pulse" style={{background: 'rgba(255, 107, 53, 0.2)', filter: 'blur(40px)'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full animate-pulse" style={{background: 'rgba(82, 215, 38, 0.2)', filter: 'blur(40px)'}}></div>
      </div>
      
      {children}
    </div>
  );
}