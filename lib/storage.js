// Local storage utilities for data persistence

const STORAGE_KEYS = {
  USER_PREFERENCES: 'beyum_user_preferences',
  DASHBOARD_FILTERS: 'beyum_dashboard_filters',
  NOTIFICATIONS: 'beyum_notifications',
  RECENT_ACTIVITY: 'beyum_recent_activity',
  SAVED_REPORTS: 'beyum_saved_reports'
};

export const storage = {
  // Get item from localStorage with fallback
  get: (key, defaultValue = null) => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    if (typeof window === 'undefined') return false;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    if (typeof window === 'undefined') return false;
    
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Clear all app data
  clearAll: () => {
    if (typeof window === 'undefined') return false;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        window.localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// User preferences
export const preferences = {
  get: () => storage.get(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    language: 'fr',
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30000
  }),
  
  set: (prefs) => storage.set(STORAGE_KEYS.USER_PREFERENCES, prefs),
  
  update: (updates) => {
    const current = preferences.get();
    return preferences.set({ ...current, ...updates });
  }
};

// Dashboard filters
export const filters = {
  get: () => storage.get(STORAGE_KEYS.DASHBOARD_FILTERS, {
    dateRange: 'month',
    brands: 'all',
    platforms: 'all'
  }),
  
  set: (filterData) => storage.set(STORAGE_KEYS.DASHBOARD_FILTERS, filterData)
};

// Notifications
export const notifications = {
  get: () => storage.get(STORAGE_KEYS.NOTIFICATIONS, []),
  
  add: (notification) => {
    const current = notifications.get();
    const updated = [
      { ...notification, id: Date.now(), timestamp: new Date().toISOString() },
      ...current
    ].slice(0, 50); // Keep last 50 notifications
    storage.set(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updated;
  },
  
  markAsRead: (id) => {
    const current = notifications.get();
    const updated = current.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    storage.set(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updated;
  },
  
  clear: () => storage.set(STORAGE_KEYS.NOTIFICATIONS, [])
};

// Recent activity
export const activity = {
  get: () => storage.get(STORAGE_KEYS.RECENT_ACTIVITY, []),
  
  log: (action) => {
    const current = activity.get();
    const updated = [
      { 
        ...action, 
        id: Date.now(), 
        timestamp: new Date().toISOString() 
      },
      ...current
    ].slice(0, 100); // Keep last 100 activities
    storage.set(STORAGE_KEYS.RECENT_ACTIVITY, updated);
    return updated;
  }
};

// Export functionality
export const exportData = {
  toJSON: (data, filename = 'beyum-export') => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },
  
  toCSV: (data, filename = 'beyum-export') => {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};