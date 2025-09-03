'use client';

import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md', color = '#00B4D8' }) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{ width: sizes[size], height: sizes[size] }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
        />
      </svg>
    </motion.div>
  );
}

export function LoadingCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function LoadingTable({ rows = 5 }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="divide-y">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingChart() {
  return (
    <div className="card p-6">
      <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoadingChart />
        <LoadingChart />
      </div>
    </div>
  );
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      {Icon && (
        <div className="p-4 rounded-full bg-gray-100 mb-4">
          <Icon size={32} className="text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center max-w-sm mb-6">
        {description}
      </p>
      {action}
    </motion.div>
  );
}

export function ErrorState({ 
  error, 
  onRetry 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="p-4 rounded-full bg-red-100 mb-4">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Une erreur est survenue
      </h3>
      <p className="text-sm text-gray-600 text-center max-w-sm mb-6">
        {error?.message || 'Impossible de charger les données'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Réessayer
        </button>
      )}
    </motion.div>
  );
}

export function SkeletonText({ width = 'w-full', height = 'h-4' }) {
  return (
    <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`}></div>
  );
}

export function RefreshIndicator({ isRefreshing, lastUpdated }) {
  if (!isRefreshing && !lastUpdated) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      {isRefreshing ? (
        <>
          <LoadingSpinner size="sm" />
          <span>Actualisation...</span>
        </>
      ) : (
        lastUpdated && (
          <span>
            Dernière mise à jour: {new Date(lastUpdated).toLocaleTimeString('fr-FR')}
          </span>
        )
      )}
    </div>
  );
}