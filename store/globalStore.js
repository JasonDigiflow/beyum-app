import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set, get) => ({
      // User data
      user: {
        id: 1,
        name: 'Pierre Admin',
        email: 'pierre@beyum.com',
        role: 'admin',
        company: 'Groupe Beyum',
        avatar: null
      },

      // Restaurant data
      restaurants: [
        { 
          id: 1, 
          name: 'King Burger', 
          status: 'active',
          revenue: 42000,
          orders: 580,
          rating: 4.5,
          platforms: ['Uber Eats', 'Deliveroo'],
          performance: 85
        },
        { 
          id: 2, 
          name: 'Pizza Roma', 
          status: 'active',
          revenue: 38000,
          orders: 490,
          rating: 4.3,
          platforms: ['Just Eat', 'Deliveroo'],
          performance: 78
        },
        { 
          id: 3, 
          name: 'Tacos Fiesta', 
          status: 'active',
          revenue: 28000,
          orders: 380,
          rating: 4.1,
          platforms: ['Uber Eats'],
          performance: 72
        },
        { 
          id: 4, 
          name: 'Sushi Master', 
          status: 'maintenance',
          revenue: 45000,
          orders: 420,
          rating: 4.8,
          platforms: ['Uber Eats', 'Deliveroo', 'Just Eat'],
          performance: 91
        },
      ],

      // Orders data
      orders: [],
      
      // Products data
      products: [],

      // Team members
      teamMembers: [
        { id: 1, name: 'Marie Laurent', role: 'Manager', restaurant: 'King Burger', status: 'online' },
        { id: 2, name: 'Thomas Bernard', role: 'Chef', restaurant: 'Pizza Roma', status: 'offline' },
        { id: 3, name: 'Sophie Martin', role: 'Manager', restaurant: 'Tacos Fiesta', status: 'online' },
        { id: 4, name: 'Lucas Dubois', role: 'Chef', restaurant: 'Sushi Master', status: 'busy' },
      ],

      // Reviews
      reviews: [],

      // Marketing campaigns
      campaigns: [],

      // Notifications
      notifications: [
        { id: 1, type: 'order', message: 'Nouvelle commande #1234', time: 'Il y a 5 min', read: false },
        { id: 2, type: 'review', message: 'Nouvel avis 5 étoiles', time: 'Il y a 15 min', read: false },
        { id: 3, type: 'alert', message: 'Stock faible - King Burger', time: 'Il y a 1h', read: true },
      ],

      // Dashboard stats
      stats: {
        totalRevenue: 153000,
        totalOrders: 1870,
        averageBasket: 82,
        conversionRate: 4.2,
        monthlyGrowth: 12,
        activeRestaurants: 3,
        totalProducts: 156,
        totalReviews: 342
      },

      // Actions
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders].slice(0, 100), // Keep last 100 orders
        stats: {
          ...state.stats,
          totalOrders: state.stats.totalOrders + 1,
          totalRevenue: state.stats.totalRevenue + order.amount
        }
      })),

      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Date.now() }],
        stats: {
          ...state.stats,
          totalProducts: state.stats.totalProducts + 1
        }
      })),

      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map(p => 
          p.id === id ? { ...p, ...updates } : p
        )
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id),
        stats: {
          ...state.stats,
          totalProducts: state.stats.totalProducts - 1
        }
      })),

      addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, { ...member, id: Date.now() }]
      })),

      updateTeamMember: (id, updates) => set((state) => ({
        teamMembers: state.teamMembers.map(m => 
          m.id === id ? { ...m, ...updates } : m
        )
      })),

      removeTeamMember: (id) => set((state) => ({
        teamMembers: state.teamMembers.filter(m => m.id !== id)
      })),

      addReview: (review) => set((state) => ({
        reviews: [{ ...review, id: Date.now(), replied: false }, ...state.reviews],
        stats: {
          ...state.stats,
          totalReviews: state.stats.totalReviews + 1
        }
      })),

      replyToReview: (id, reply) => set((state) => ({
        reviews: state.reviews.map(r => 
          r.id === id ? { ...r, replied: true, replyText: reply } : r
        )
      })),

      addCampaign: (campaign) => set((state) => ({
        campaigns: [...state.campaigns, { 
          ...campaign, 
          id: Date.now(),
          status: 'draft',
          createdAt: new Date().toISOString()
        }]
      })),

      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map(c => 
          c.id === id ? { ...c, ...updates } : c
        )
      })),

      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(c => c.id !== id)
      })),

      addNotification: (notification) => set((state) => ({
        notifications: [
          { 
            ...notification, 
            id: Date.now(), 
            time: 'Maintenant',
            read: false 
          },
          ...state.notifications
        ].slice(0, 50) // Keep last 50 notifications
      })),

      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),

      markAllNotificationsAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),

      clearNotifications: () => set({ notifications: [] }),

      updateRestaurant: (id, updates) => set((state) => ({
        restaurants: state.restaurants.map(r => 
          r.id === id ? { ...r, ...updates } : r
        )
      })),

      updateStats: (updates) => set((state) => ({
        stats: { ...state.stats, ...updates }
      })),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      // Simulate real-time order
      simulateOrder: () => {
        const restaurants = get().restaurants.filter(r => r.status === 'active');
        if (restaurants.length === 0) return;
        
        const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        const amount = Math.floor(Math.random() * 80) + 20;
        const platforms = ['Uber Eats', 'Deliveroo', 'Just Eat'];
        
        const order = {
          id: Date.now(),
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          amount,
          customer: `Client ${Math.floor(Math.random() * 1000)}`,
          status: 'new',
          time: new Date().toISOString()
        };
        
        get().addOrder(order);
        get().addNotification({
          type: 'order',
          message: `Nouvelle commande de ${amount}€ - ${restaurant.name}`
        });
      },

      // Simulate real-time review
      simulateReview: () => {
        const restaurants = get().restaurants;
        const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        const ratings = [1, 2, 3, 4, 4, 5, 5, 5]; // Weighted towards positive
        const rating = ratings[Math.floor(Math.random() * ratings.length)];
        
        const comments = {
          5: ['Excellent!', 'Parfait, je recommande', 'Service au top!'],
          4: ['Très bien, quelques améliorations possibles', 'Bon dans l\'ensemble'],
          3: ['Correct, sans plus', 'Moyen, peut mieux faire'],
          2: ['Déçu de ma commande', 'Problème de qualité'],
          1: ['Très mauvaise expérience', 'À éviter']
        };
        
        const review = {
          customer: `Client ${Math.floor(Math.random() * 1000)}`,
          rating,
          platform: ['Uber Eats', 'Deliveroo', 'Just Eat'][Math.floor(Math.random() * 3)],
          restaurantName: restaurant.name,
          comment: comments[rating][Math.floor(Math.random() * comments[rating].length)],
          date: 'Maintenant'
        };
        
        get().addReview(review);
        get().addNotification({
          type: 'review',
          message: `Nouvel avis ${rating}★ - ${restaurant.name}`
        });
      }
    }),
    {
      name: 'beyum-store',
      partialize: (state) => ({
        user: state.user,
        notifications: state.notifications,
        stats: state.stats
      })
    }
  )
);

export default useGlobalStore;