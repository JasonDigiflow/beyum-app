import { useState, useEffect, useCallback } from 'react';
import { preferences } from '@/lib/storage';

export function useRealTimeData(fetchFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const {
    interval = 30000, // Default 30 seconds
    enabled = true,
    retryOnError = true,
    maxRetries = 3
  } = options;

  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFunction();
      setData(result);
      setError(null);
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (err) {
      setError(err);
      
      if (retryOnError && retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchData(), 5000 * (retryCount + 1)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, retryOnError, retryCount, maxRetries]);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Get user preferences for auto-refresh
    const userPrefs = preferences.get();
    if (!userPrefs.autoRefresh) return;

    // Set up interval
    const intervalId = setInterval(fetchData, userPrefs.refreshInterval || interval);

    return () => clearInterval(intervalId);
  }, [...dependencies, enabled]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh,
    isRefreshing: loading && lastUpdated !== null
  };
}

// Simulated API functions for demonstration
export const api = {
  getDashboardStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate random variations for real-time feel
    const baseStats = {
      revenue: 156000,
      orders: 2340,
      avgBasket: 67,
      activeRestaurants: 45
    };

    return {
      revenue: baseStats.revenue + Math.floor(Math.random() * 5000),
      orders: baseStats.orders + Math.floor(Math.random() * 50),
      avgBasket: baseStats.avgBasket + Math.floor(Math.random() * 5),
      activeRestaurants: baseStats.activeRestaurants,
      timestamp: new Date().toISOString()
    };
  },

  getRecentOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const restaurants = ['King Burger', 'Pizza Roma', 'Sushi Master', 'Tacos Fiesta'];
    const platforms = ['Uber Eats', 'Deliveroo', 'Just Eat'];
    
    return Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      restaurant: restaurants[Math.floor(Math.random() * restaurants.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      amount: 20 + Math.floor(Math.random() * 80),
      time: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      status: Math.random() > 0.8 ? 'pending' : 'completed'
    }));
  },

  getPerformanceMetrics: async (period = 'day') => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const metrics = {
      day: {
        revenue: 5600,
        orders: 78,
        conversionRate: 4.2,
        avgDeliveryTime: 28
      },
      week: {
        revenue: 38500,
        orders: 542,
        conversionRate: 4.5,
        avgDeliveryTime: 31
      },
      month: {
        revenue: 156000,
        orders: 2340,
        conversionRate: 4.3,
        avgDeliveryTime: 30
      }
    };

    return {
      ...metrics[period],
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change: Math.floor(Math.random() * 20) - 10
    };
  },

  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const types = ['order', 'review', 'alert', 'info'];
    const messages = [
      'Nouvelle commande reçue',
      'Avis client à modérer',
      'Stock faible détecté',
      'Rapport hebdomadaire disponible'
    ];

    return Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      type: types[Math.floor(Math.random() * types.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      read: Math.random() > 0.5
    }));
  }
};

// WebSocket simulation for real-time events
export function useWebSocketEvents(eventType, onEvent) {
  useEffect(() => {
    // Simulate WebSocket events
    const events = {
      'new-order': () => ({
        type: 'new-order',
        data: {
          id: Date.now(),
          restaurant: 'King Burger',
          amount: Math.floor(Math.random() * 100) + 20,
          platform: 'Uber Eats'
        }
      }),
      'new-review': () => ({
        type: 'new-review',
        data: {
          id: Date.now(),
          rating: Math.floor(Math.random() * 5) + 1,
          restaurant: 'Pizza Roma',
          customer: 'Client ' + Math.floor(Math.random() * 1000)
        }
      }),
      'stock-alert': () => ({
        type: 'stock-alert',
        data: {
          restaurant: 'Sushi Master',
          item: 'Saumon',
          level: 'critical'
        }
      })
    };

    if (!events[eventType]) return;

    // Simulate random events
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of event
        const event = events[eventType]();
        onEvent(event);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [eventType, onEvent]);
}