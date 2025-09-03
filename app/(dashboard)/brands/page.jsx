'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  TrendingUp,
  Users,
  Clock,
  Euro,
  Star,
  ChefHat,
  Package,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const digitalBrands = [
  {
    id: 1,
    name: 'Burger Beast',
    category: 'Burgers Premium',
    description: 'Burgers gourmets avec des ingrédients premium qui cartonnent sur les plateformes',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909125/fgqzt6kyztnuf7my0s3z.webp',
    revenue: '+45%',
    avgPrice: '15€',
    avgTime: '12 min',
    rating: 4.8,
    ordersPerDay: 35,
    isInstalled: true,
    recipes: [
      {
        name: 'Beast Classic',
        ingredients: ['Pain brioché', 'Steak haché 180g', 'Cheddar', 'Bacon', 'Sauce maison'],
        prepTime: '10 min',
        price: '14.90€'
      },
      {
        name: 'Beast Deluxe',
        ingredients: ['Pain brioché', 'Double steak 360g', 'Cheddar', 'Bacon', 'Oignons caramélisés', 'Sauce BBQ'],
        prepTime: '12 min',
        price: '19.90€'
      }
    ]
  },
  {
    id: 2,
    name: 'Pizza Paradise',
    category: 'Pizzas Artisanales',
    description: 'Pizzas authentiques italiennes avec des ingrédients frais importés',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909126/tyx6jnbfqyxzrkauabuk.webp',
    revenue: '+38%',
    avgPrice: '18€',
    avgTime: '15 min',
    rating: 4.9,
    ordersPerDay: 42,
    isInstalled: true,
    recipes: [
      {
        name: 'Margherita DOP',
        ingredients: ['Pâte fraîche', 'Sauce tomate San Marzano', 'Mozzarella di Bufala', 'Basilic frais'],
        prepTime: '12 min',
        price: '16.90€'
      },
      {
        name: '4 Formaggi',
        ingredients: ['Pâte fraîche', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Chèvre'],
        prepTime: '12 min',
        price: '18.90€'
      }
    ]
  },
  {
    id: 3,
    name: 'Croque Master',
    category: 'Croques Français',
    description: 'Croques monsieur revisités avec des recettes gourmandes',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909124/jeungrhstkgoqjnwhoqr.webp',
    revenue: '+52%',
    avgPrice: '12€',
    avgTime: '8 min',
    rating: 4.7,
    ordersPerDay: 28,
    isInstalled: false,
    recipes: [
      {
        name: 'Croque Truffe',
        ingredients: ['Pain de mie artisanal', 'Jambon blanc', 'Emmental', 'Crème de truffe', 'Béchamel maison'],
        prepTime: '8 min',
        price: '13.90€'
      },
      {
        name: 'Croque Montagnard',
        ingredients: ['Pain de campagne', 'Jambon cru', 'Reblochon', 'Pommes de terre', 'Oignons'],
        prepTime: '10 min',
        price: '14.90€'
      }
    ]
  },
  {
    id: 4,
    name: 'Sushi Express',
    category: 'Cuisine Japonaise',
    description: 'Sushis et makis frais préparés à la commande avec du poisson de qualité',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909126/ubwdjyp5pduozeeeeqkw.webp',
    revenue: '+58%',
    avgPrice: '25€',
    avgTime: '20 min',
    rating: 4.9,
    ordersPerDay: 22,
    isInstalled: false,
    recipes: [
      {
        name: 'California Roll',
        ingredients: ['Riz sushi', 'Avocat', 'Concombre', 'Surimi', 'Tobiko', 'Nori'],
        prepTime: '15 min',
        price: '12.90€'
      },
      {
        name: 'Sashimi Mix',
        ingredients: ['Saumon frais', 'Thon rouge', 'Daurade', 'Wasabi', 'Gingembre mariné'],
        prepTime: '5 min',
        price: '24.90€'
      }
    ]
  },
  {
    id: 5,
    name: 'Hot Dog Factory',
    category: 'Street Food US',
    description: 'Hot dogs américains authentiques avec des toppings originaux',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909125/la9sgiefdqoal6x1objm.webp',
    revenue: '+42%',
    avgPrice: '10€',
    avgTime: '7 min',
    rating: 4.6,
    ordersPerDay: 45,
    isInstalled: false,
    recipes: [
      {
        name: 'New York Classic',
        ingredients: ['Pain hot dog', 'Saucisse de bœuf', 'Oignons grillés', 'Moutarde', 'Ketchup'],
        prepTime: '5 min',
        price: '8.90€'
      },
      {
        name: 'Chicago Style',
        ingredients: ['Pain pavot', 'Saucisse bœuf', 'Tomate', 'Cornichon', 'Oignon', 'Piment', 'Moutarde'],
        prepTime: '7 min',
        price: '10.90€'
      }
    ]
  },
  {
    id: 6,
    name: 'Green Bowl',
    category: 'Salades & Bowls',
    description: 'Bowls healthy et équilibrés pour une clientèle soucieuse de sa santé',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909124/ux5nkwdvfnc9llhml0my.webp',
    revenue: '+35%',
    avgPrice: '14€',
    avgTime: '10 min',
    rating: 4.8,
    ordersPerDay: 31,
    isInstalled: false,
    recipes: [
      {
        name: 'Buddha Bowl',
        ingredients: ['Quinoa', 'Avocat', 'Edamame', 'Carotte', 'Chou rouge', 'Sauce tahini'],
        prepTime: '8 min',
        price: '13.90€'
      },
      {
        name: 'Protein Power',
        ingredients: ['Riz complet', 'Poulet grillé', 'Brocoli', 'Patate douce', 'Amandes', 'Sauce yaourt'],
        prepTime: '10 min',
        price: '14.90€'
      }
    ]
  },
  {
    id: 7,
    name: 'Poke Paradise',
    category: 'Poke Bowls',
    description: 'Poke bowls hawaïens avec du poisson frais et des fruits exotiques',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909123/zehmhff4ezgrshuwaczh.webp',
    revenue: '+48%',
    avgPrice: '16€',
    avgTime: '12 min',
    rating: 4.9,
    ordersPerDay: 26,
    isInstalled: false,
    recipes: [
      {
        name: 'Aloha Classic',
        ingredients: ['Riz sushi', 'Saumon mariné', 'Mangue', 'Avocat', 'Edamame', 'Sauce soja sucrée'],
        prepTime: '10 min',
        price: '15.90€'
      },
      {
        name: 'Tropical Tuna',
        ingredients: ['Riz noir', 'Thon rouge', 'Ananas', 'Concombre', 'Algues wakame', 'Sauce spicy mayo'],
        prepTime: '12 min',
        price: '17.90€'
      }
    ]
  },
  {
    id: 8,
    name: 'Pasta Lovers',
    category: 'Pâtes Italiennes',
    description: 'Pâtes fraîches maison avec des sauces authentiques italiennes',
    image: 'https://res.cloudinary.com/dnpbzxerj/image/upload/v1756909123/boafsl6falmsjsicbvxz.webp',
    revenue: '+42%',
    avgPrice: '13€',
    avgTime: '14 min',
    rating: 4.7,
    ordersPerDay: 38,
    isInstalled: false,
    recipes: [
      {
        name: 'Carbonara Romana',
        ingredients: ['Spaghetti frais', 'Guanciale', 'Pecorino Romano', 'Œufs', 'Poivre noir'],
        prepTime: '12 min',
        price: '12.90€'
      },
      {
        name: 'Truffle Alfredo',
        ingredients: ['Fettuccine', 'Crème', 'Parmesan', 'Truffe noire', 'Beurre', 'Ail'],
        prepTime: '14 min',
        price: '16.90€'
      }
    ]
  }
];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [interestedBrand, setInterestedBrand] = useState(null);

  const categories = ['all', 'Burgers Premium', 'Pizzas Artisanales', 'Cuisine Japonaise', 'Street Food US', 'Salades & Bowls', 'Poke Bowls', 'Pâtes Italiennes', 'Croques Français'];

  const filteredBrands = digitalBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brand.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedCount = digitalBrands.filter(b => b.isInstalled).length;
  const availableCount = digitalBrands.filter(b => !b.isInstalled).length;

  const handleInterest = (brand) => {
    setInterestedBrand(brand);
    setShowInterestModal(true);
  };

  const confirmInterest = () => {
    toast.success(
      <div>
        <p className="font-bold">Demande envoyée !</p>
        <p className="text-sm">Notre équipe vous contactera sous 24h pour installer {interestedBrand.name}</p>
      </div>,
      {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: 'white',
        },
      }
    );
    setShowInterestModal(false);
    setSelectedBrand(null);
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="section-title">Catalogue des marques digitales</h2>
          <p className="section-subtitle">
            Découvrez et installez de nouvelles marques dans votre restaurant
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-black text-beyum-green">{installedCount}</p>
            <p className="text-xs text-gray-500">Installées</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-beyum-blue">{availableCount}</p>
            <p className="text-xs text-gray-500">Disponibles</p>
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
              placeholder="Rechercher une marque..."
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
                {cat === 'all' ? 'Toutes les catégories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedBrand(brand)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                {brand.isInstalled && (
                  <div className="absolute top-4 right-4 bg-beyum-green text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle size={14} />
                    Installée
                  </div>
                )}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                  <p className="text-sm text-white/80">{brand.category}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">CA moyen</p>
                    <p className="text-lg font-black text-beyum-orange">{brand.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Panier moyen</p>
                    <p className="text-lg font-black text-gray-900 dark:text-white">{brand.avgPrice}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="text-beyum-yellow fill-current" size={16} />
                    <span className="text-sm font-semibold">{brand.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    <span className="text-xs">{brand.avgTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users size={14} />
                    <span className="text-xs">{brand.ordersPerDay}/jour</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand Detail Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedBrand(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header with image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedBrand.image} 
                  alt={selectedBrand.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{selectedBrand.name}</h3>
                  <p className="text-lg text-white/90">{selectedBrand.category}</p>
                </div>
                {selectedBrand.isInstalled && (
                  <div className="absolute top-6 left-6 bg-beyum-green text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                    <CheckCircle size={20} />
                    Marque installée
                  </div>
                )}
              </div>

              <div className="p-8">
                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {selectedBrand.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-beyum-orange/10 to-beyum-orange/20 rounded-xl p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-beyum-orange mx-auto mb-2" />
                    <p className="text-2xl font-black text-beyum-orange">{selectedBrand.revenue}</p>
                    <p className="text-xs text-gray-600">CA moyen</p>
                  </div>
                  <div className="bg-gradient-to-r from-beyum-blue/10 to-beyum-blue/20 rounded-xl p-4 text-center">
                    <Euro className="w-8 h-8 text-beyum-blue mx-auto mb-2" />
                    <p className="text-2xl font-black text-beyum-blue">{selectedBrand.avgPrice}</p>
                    <p className="text-xs text-gray-600">Panier moyen</p>
                  </div>
                  <div className="bg-gradient-to-r from-beyum-green/10 to-beyum-green/20 rounded-xl p-4 text-center">
                    <Clock className="w-8 h-8 text-beyum-green mx-auto mb-2" />
                    <p className="text-2xl font-black text-beyum-green">{selectedBrand.avgTime}</p>
                    <p className="text-xs text-gray-600">Temps moyen</p>
                  </div>
                  <div className="bg-gradient-to-r from-beyum-yellow/10 to-beyum-yellow/20 rounded-xl p-4 text-center">
                    <Star className="w-8 h-8 text-beyum-yellow mx-auto mb-2" />
                    <p className="text-2xl font-black text-beyum-yellow">{selectedBrand.rating}</p>
                    <p className="text-xs text-gray-600">Note moyenne</p>
                  </div>
                </div>

                {/* Recipes */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ChefHat className="text-beyum-blue" />
                    Recettes populaires
                  </h4>
                  <div className="space-y-4">
                    {selectedBrand.recipes.map((recipe, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h5 className="font-bold text-lg">{recipe.name}</h5>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock size={14} />
                              {recipe.prepTime}
                            </span>
                            <span className="font-bold text-beyum-blue">{recipe.price}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm flex items-center gap-1">
                              <Package size={12} className="text-gray-400" />
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {!selectedBrand.isInstalled && (
                  <div className="bg-gradient-to-r from-beyum-blue/10 to-beyum-green/10 rounded-xl p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className="text-beyum-blue flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                          Intéressé par cette marque ?
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Notre équipe BEYUM vous accompagne dans l'installation et la mise en place de cette marque dans votre restaurant. Formation et support inclus.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInterest(selectedBrand)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Sparkles size={20} />
                      Je suis intéressé
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {selectedBrand.isInstalled && (
                  <div className="bg-beyum-green/10 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-beyum-green flex-shrink-0" size={24} />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Cette marque est déjà installée dans votre restaurant
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Vous pouvez gérer vos commandes depuis le module Commandes
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interest Confirmation Modal */}
      <AnimatePresence>
        {showInterestModal && interestedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowInterestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-card rounded-3xl max-w-md w-full p-8"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-beyum-blue to-beyum-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Confirmer votre intérêt</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vous souhaitez installer <span className="font-semibold text-beyum-blue">{interestedBrand.name}</span> dans votre restaurant ?
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                <h4 className="font-semibold mb-2">Ce qui est inclus :</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-beyum-green" />
                    Formation complète de votre équipe
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-beyum-green" />
                    Recettes et processus optimisés
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-beyum-green" />
                    Support marketing pour le lancement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-beyum-green" />
                    Assistance technique 24/7
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowInterestModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmInterest}
                  className="flex-1 btn-primary"
                >
                  Confirmer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}