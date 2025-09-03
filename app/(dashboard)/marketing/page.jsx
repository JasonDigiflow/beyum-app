'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Gift,
  Percent,
  Timer,
  Play,
  Pause,
  Copy,
  Edit,
  Trash2,
  Plus,
  ChartBar,
  DollarSign,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const campaigns = [
  {
    id: 1,
    name: 'Menu Duo Saint-Valentin',
    type: 'promotion',
    status: 'active',
    platforms: ['Uber Eats', 'Deliveroo'],
    startDate: '14/02/2024',
    endDate: '14/02/2024',
    discount: '20%',
    views: 12420,
    conversions: 854,
    revenue: '8 240€',
    roi: '+245%'
  },
  {
    id: 2,
    name: 'Happy Hour Burgers',
    type: 'recurring',
    status: 'active',
    platforms: ['Just Eat'],
    startDate: 'Tous les jours',
    endDate: '17h-19h',
    discount: '30%',
    views: 8650,
    conversions: 623,
    revenue: '5 120€',
    roi: '+180%'
  },
  {
    id: 3,
    name: 'Nouveau Menu Sushi',
    type: 'launch',
    status: 'scheduled',
    platforms: ['Toutes'],
    startDate: '01/07/2024',
    endDate: '15/07/2024',
    discount: '15%',
    views: 0,
    conversions: 0,
    revenue: '0€',
    roi: '-'
  },
  {
    id: 4,
    name: 'Fidélité 10 commandes',
    type: 'loyalty',
    status: 'paused',
    platforms: ['Uber Eats'],
    startDate: '01/06/2024',
    endDate: '30/06/2024',
    discount: '1 gratuit',
    views: 3200,
    conversions: 156,
    revenue: '2 340€',
    roi: '+120%'
  }
];

const influencers = [
  {
    id: 1,
    name: 'FoodLover_Paris',
    followers: '45K',
    platform: 'Instagram',
    engagement: '4.2%',
    status: 'active',
    lastPost: 'Il y a 3 jours',
    performance: 'excellent'
  },
  {
    id: 2,
    name: 'TikTokFoodie',
    followers: '120K',
    platform: 'TikTok',
    engagement: '8.5%',
    status: 'pending',
    lastPost: '-',
    performance: '-'
  },
  {
    id: 3,
    name: 'BlogGourmand',
    followers: '28K',
    platform: 'Blog',
    engagement: '3.1%',
    status: 'completed',
    lastPost: 'Il y a 2 semaines',
    performance: 'good'
  }
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleToggleCampaign = (campaign) => {
    if (campaign.status === 'active') {
      toast.success(`Campagne "${campaign.name}" mise en pause`);
    } else {
      toast.success(`Campagne "${campaign.name}" activée`);
    }
  };

  const handleDuplicateCampaign = (campaign) => {
    toast.success(`Campagne "${campaign.name}" dupliquée`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Marketing</h1>
          <p className="text-gray-600 mt-1">Gérez vos campagnes et collaborations influenceurs</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle campagne
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 180, 216, 0.1)' }}>
              <Megaphone size={24} style={{ color: '#00B4D8' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+2</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Campagnes actives</h3>
          <p className="text-2xl font-black text-gray-900">8</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(82, 215, 38, 0.1)' }}>
              <Users size={24} style={{ color: '#52D726' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+24%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Portée totale</h3>
          <p className="text-2xl font-black text-gray-900">45.2K</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)' }}>
              <ChartBar size={24} style={{ color: '#FF6B35' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+18%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Taux conversion</h3>
          <p className="text-2xl font-black text-gray-900">6.8%</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 214, 10, 0.1)' }}>
              <DollarSign size={24} style={{ color: '#FFD60A' }} />
            </div>
            <span className="text-sm font-semibold text-green-500">+185%</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">ROI moyen</h3>
          <p className="text-2xl font-black text-gray-900">+215%</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 px-1 font-semibold transition-colors ${
            activeTab === 'campaigns' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Campagnes promotionnelles
        </button>
        <button
          onClick={() => setActiveTab('influencers')}
          className={`pb-3 px-1 font-semibold transition-colors ${
            activeTab === 'influencers' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          BeHype Influenceurs
        </button>
      </div>

      {/* Content */}
      {activeTab === 'campaigns' ? (
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              whileHover={{ scale: 1.01 }}
              className="card p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-gray-900">{campaign.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'active' ? 'Active' : 
                       campaign.status === 'paused' ? 'En pause' :
                       campaign.status === 'scheduled' ? 'Programmée' : campaign.status}
                    </span>
                    <div className="flex gap-2">
                      {campaign.platforms.map((platform) => (
                        <span key={platform} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Période</p>
                      <p className="text-sm font-medium">{campaign.startDate}</p>
                      <p className="text-xs text-gray-500">{campaign.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Réduction</p>
                      <p className="text-sm font-bold" style={{ color: '#FF6B35' }}>{campaign.discount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Vues</p>
                      <p className="text-sm font-medium">{campaign.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Conversions</p>
                      <p className="text-sm font-medium">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ROI</p>
                      <p className="text-sm font-bold" style={{ color: '#52D726' }}>{campaign.roi}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleCampaign(campaign)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                      onClick={() => handleDuplicateCampaign(campaign)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-500">
                      <Trash2 size={16} />
                    </button>
                    <button className="ml-auto text-sm font-semibold" style={{ color: '#00B4D8' }}>
                      Voir détails →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-purple-500" size={24} />
              <h3 className="font-bold text-gray-900">Collaborations BeHype</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                Service Premium
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              BeHype connecte votre restaurant avec des influenceurs locaux pour maximiser votre visibilité.
            </p>
            
            <div className="space-y-4">
              {influencers.map((influencer) => (
                <div key={influencer.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">{influencer.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{influencer.platform}</span>
                          <span className="text-sm font-medium">{influencer.followers} followers</span>
                          <span className="text-sm">
                            Engagement: <span className="font-semibold">{influencer.engagement}</span>
                          </span>
                        </div>
                        {influencer.lastPost && (
                          <p className="text-xs text-gray-500 mt-2">Dernier post: {influencer.lastPost}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(influencer.status)}`}>
                        {influencer.status === 'active' ? 'Actif' :
                         influencer.status === 'pending' ? 'En attente' : 'Terminé'}
                      </span>
                      {influencer.performance && influencer.performance !== '-' && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Performance {influencer.performance}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      Voir profil
                    </button>
                    <button className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Statistiques
                    </button>
                    {influencer.status === 'pending' && (
                      <button className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                        Accepter collaboration
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-purple-600" size={20} />
                <span className="font-semibold text-purple-900">Trouvez plus d\'influenceurs</span>
              </div>
              <p className="text-sm text-purple-800 mb-3">
                BeHype peut vous connecter avec +500 influenceurs food dans votre zone.
              </p>
              <button className="btn-primary">
                Explorer les profils →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4"
          >
            <h3 className="font-bold text-gray-900 text-xl mb-6">Créer une nouvelle campagne</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la campagne</label>
                <input type="text" className="w-full p-3 border rounded-lg" placeholder="Ex: Promo Weekend" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option>Promotion</option>
                    <option>Lancement produit</option>
                    <option>Fidélité</option>
                    <option>Récurrent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Réduction</label>
                  <input type="text" className="w-full p-3 border rounded-lg" placeholder="Ex: 20%" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plateformes</label>
                <div className="flex gap-3">
                  {['Uber Eats', 'Deliveroo', 'Just Eat'].map((platform) => (
                    <label key={platform} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                  <input type="date" className="w-full p-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                  <input type="date" className="w-full p-3 border rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  toast.success('Campagne créée avec succès!');
                }}
                className="btn-primary"
              >
                Créer la campagne
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}