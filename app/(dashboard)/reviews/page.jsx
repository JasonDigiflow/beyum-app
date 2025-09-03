'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star,
  MessageCircle,
  ThumbsUp,
  AlertTriangle,
  TrendingUp,
  Filter,
  Reply,
  Clock,
  Heart,
  Frown,
  Smile,
  Meh
} from 'lucide-react';
import toast from 'react-hot-toast';

const reviews = [
  {
    id: 1,
    customer: 'Marie L.',
    rating: 5,
    platform: 'Uber Eats',
    platformColor: '#00B4D8',
    date: 'Il y a 2 heures',
    brand: 'King Burger',
    comment: 'Excellent burger, livraison rapide et frites encore chaudes! Je recommande vivement.',
    replied: false,
    sentiment: 'positive'
  },
  {
    id: 2,
    customer: 'Thomas B.',
    rating: 3,
    platform: 'Deliveroo',
    platformColor: '#52D726',
    date: 'Il y a 5 heures',
    brand: 'Pizza Roma',
    comment: 'Pizza correcte mais un peu froide à la livraison. Le goût était bon cependant.',
    replied: true,
    replyText: 'Merci pour votre retour Thomas. Nous travaillons sur l\'amélioration de nos emballages.',
    sentiment: 'neutral'
  },
  {
    id: 3,
    customer: 'Sophie M.',
    rating: 2,
    platform: 'Just Eat',
    platformColor: '#FF6B35',
    date: 'Il y a 1 jour',
    brand: 'Tacos Fiesta',
    comment: 'Déçue, la commande était incomplète. Il manquait la sauce et les nachos.',
    replied: false,
    sentiment: 'negative'
  },
  {
    id: 4,
    customer: 'Lucas D.',
    rating: 5,
    platform: 'Uber Eats',
    platformColor: '#00B4D8',
    date: 'Il y a 2 jours',
    brand: 'Sushi Master',
    comment: 'Sushis frais et délicieux! Présentation parfaite. Je commande régulièrement.',
    replied: true,
    replyText: 'Merci Lucas pour votre fidélité! À très bientôt!',
    sentiment: 'positive'
  },
  {
    id: 5,
    customer: 'Emma R.',
    rating: 4,
    platform: 'Deliveroo',
    platformColor: '#52D726',
    date: 'Il y a 3 jours',
    brand: 'Pasta Bella',
    comment: 'Très bonnes pâtes, portion généreuse. Un peu trop salé à mon goût.',
    replied: false,
    sentiment: 'positive'
  }
];

const stats = {
  average: 3.8,
  total: 1247,
  distribution: [
    { stars: 5, count: 412, percentage: 33 },
    { stars: 4, count: 387, percentage: 31 },
    { stars: 3, count: 224, percentage: 18 },
    { stars: 2, count: 137, percentage: 11 },
    { stars: 1, count: 87, percentage: 7 }
  ]
};

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleReply = (review) => {
    setSelectedReview(review);
    setShowReplyModal(true);
  };

  const submitReply = () => {
    toast.success('Réponse envoyée avec succès!');
    setShowReplyModal(false);
    setReplyText('');
    setSelectedReview(null);
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive': return <Smile className="text-green-500" size={20} />;
      case 'neutral': return <Meh className="text-yellow-500" size={20} />;
      case 'negative': return <Frown className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Avis clients</h1>
          <p className="text-gray-600 mt-1">Gérez et répondez aux avis de vos clients</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">Tous les avis</option>
            <option value="positive">Positifs</option>
            <option value="negative">Négatifs</option>
            <option value="noreply">Sans réponse</option>
          </select>
          <button className="px-4 py-2 bg-white border rounded-lg flex items-center gap-2 hover:bg-gray-50">
            <Filter size={20} />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 180, 216, 0.1)' }}>
              <Star size={24} style={{ color: '#00B4D8' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+0.2</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Note moyenne</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-gray-900">{stats.average}</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < Math.floor(stats.average) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(82, 215, 38, 0.1)' }}>
              <MessageCircle size={24} style={{ color: '#52D726' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+12%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total avis</h3>
          <p className="text-2xl font-black text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
              <Reply size={24} style={{ color: '#FF6B35' }} />
            </div>
            <span className="text-sm font-semibold text-red-500">-5%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Taux de réponse</h3>
          <p className="text-2xl font-black text-gray-900">72%</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 214, 10, 0.1)' }}>
              <Clock size={24} style={{ color: '#FFD60A' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">-15min</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Temps de réponse</h3>
          <p className="text-2xl font-black text-gray-900">2h30</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900">Derniers avis</h3>
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ scale: 1.01 }}
              className="card p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {review.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.customer}</span>
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: review.platformColor }}
                      >
                        {review.platform}
                      </span>
                      <span className="text-xs text-gray-500">{review.brand}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                      {getSentimentIcon(review.sentiment)}
                    </div>
                  </div>
                </div>
                {!review.replied && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                    En attente
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-4">{review.comment}</p>

              {review.replied ? (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderColor: '#00B4D8' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Reply size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Votre réponse</span>
                  </div>
                  <p className="text-sm text-gray-600">{review.replyText}</p>
                </div>
              ) : (
                <button 
                  onClick={() => handleReply(review)}
                  className="btn-primary text-sm flex items-center gap-2"
                >
                  <Reply size={16} />
                  Répondre
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Rating Distribution */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Distribution des notes</h3>
            <div className="space-y-3">
              {stats.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star size={14} className="text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * item.stars }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: '#00B4D8' }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-10 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-red-600" size={20} />
                  <span className="font-semibold text-red-900">3 avis négatifs</span>
                </div>
                <p className="text-sm text-red-800 mb-3">Nécessitent une réponse urgente</p>
                <button className="text-sm font-semibold text-red-600 hover:underline">
                  Voir et répondre →
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-green-600" size={20} />
                  <span className="font-semibold text-green-900">Performance</span>
                </div>
                <p className="text-sm text-green-800 mb-3">Note en hausse ce mois-ci</p>
                <button className="text-sm font-semibold text-green-600 hover:underline">
                  Voir le rapport →
                </button>
              </div>
            </div>
          </div>

          {/* Response Templates */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 mb-4">Modèles de réponse</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium mb-1">Remerciement positif</p>
                <p className="text-xs text-gray-600">Pour les avis 4-5 étoiles</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium mb-1">Excuses et amélioration</p>
                <p className="text-xs text-gray-600">Pour les avis négatifs</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium mb-1">Invitation à revenir</p>
                <p className="text-xs text-gray-600">Pour fidéliser les clients</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
          >
            <h3 className="font-bold text-gray-900 mb-4">Répondre à {selectedReview.customer}</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < selectedReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{selectedReview.comment}</p>
            </div>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Tapez votre réponse..."
              className="w-full p-3 border rounded-lg resize-none h-32 mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button 
                onClick={submitReply}
                className="btn-primary"
              >
                Envoyer la réponse
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}