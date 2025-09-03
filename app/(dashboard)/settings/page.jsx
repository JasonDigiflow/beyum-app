'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User,
  Store,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Key,
  Save,
  Check,
  AlertCircle,
  Camera,
  Mail,
  Phone,
  MapPin,
  Clock,
  Moon,
  Sun
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true,
    reviews: true,
    stock: true,
    marketing: false,
    finance: true
  });

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'Pizza Palace',
    email: 'contact@pizzapalace.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, 75002 Paris',
    siret: '123 456 789 00012',
    tva: 'FR12345678901'
  });

  const [openingHours, setOpeningHours] = useState({
    monday: { open: '11:00', close: '23:00', closed: false },
    tuesday: { open: '11:00', close: '23:00', closed: false },
    wednesday: { open: '11:00', close: '23:00', closed: false },
    thursday: { open: '11:00', close: '23:00', closed: false },
    friday: { open: '11:00', close: '23:30', closed: false },
    saturday: { open: '11:00', close: '23:30', closed: false },
    sunday: { open: '12:00', close: '22:00', closed: false }
  });

  const handleSave = () => {
    toast.success('Paramètres sauvegardés avec succès!');
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'restaurant', label: 'Restaurant', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'billing', label: 'Facturation', icon: CreditCard },
    { id: 'integrations', label: 'Intégrations', icon: Globe }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configurez votre compte et vos préférences</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save size={20} />
          Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'general' && (
            <>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Préférences générales</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue de l'interface
                    </label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuseau horaire
                    </label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>Paris (GMT+1)</option>
                      <option>Londres (GMT+0)</option>
                      <option>New York (GMT-5)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mode d'affichage
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                          !darkMode ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
                        }`}
                      >
                        <Sun size={20} />
                        Clair
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
                        }`}
                      >
                        <Moon size={20} />
                        Sombre
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format de date
                    </label>
                    <select className="w-full p-3 border rounded-lg">
                      <option>JJ/MM/AAAA</option>
                      <option>MM/JJ/AAAA</option>
                      <option>AAAA-MM-JJ</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'restaurant' && (
            <>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Informations du restaurant</h3>
                
                <div className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="text-gray-400" size={32} />
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Changer le logo
                      </button>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG jusqu'à 5MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du restaurant
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.name}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={restaurantInfo.email}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, email: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        value={restaurantInfo.phone}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.address}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SIRET
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.siret}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, siret: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        TVA Intracommunautaire
                      </label>
                      <input
                        type="text"
                        value={restaurantInfo.tva}
                        onChange={(e) => setRestaurantInfo({...restaurantInfo, tva: e.target.value})}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Horaires d'ouverture</h3>
                
                <div className="space-y-4">
                  {Object.entries(openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="w-28 text-sm font-medium capitalize">{day}</span>
                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => setOpeningHours({
                          ...openingHours,
                          [day]: { ...hours, closed: !e.target.checked }
                        })}
                        className="rounded"
                      />
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => setOpeningHours({
                              ...openingHours,
                              [day]: { ...hours, open: e.target.value }
                            })}
                            className="px-3 py-2 border rounded-lg"
                          />
                          <span>à</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => setOpeningHours({
                              ...openingHours,
                              [day]: { ...hours, close: e.target.value }
                            })}
                            className="px-3 py-2 border rounded-lg"
                          />
                        </>
                      )}
                      {hours.closed && (
                        <span className="text-gray-500">Fermé</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 mb-6">Préférences de notifications</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {key === 'orders' && 'Nouvelles commandes'}
                          {key === 'reviews' && 'Nouveaux avis'}
                          {key === 'stock' && 'Alertes de stock'}
                          {key === 'marketing' && 'Campagnes marketing'}
                          {key === 'finance' && 'Notifications financières'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {key === 'orders' && 'Recevez une notification pour chaque nouvelle commande'}
                          {key === 'reviews' && 'Soyez alerté des nouveaux avis clients'}
                          {key === 'stock' && 'Alertes quand le stock est bas'}
                          {key === 'marketing' && 'Mises à jour sur vos campagnes'}
                          {key === 'finance' && 'Paiements et factures'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            [key]: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-4">Canaux de notification</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Notifications dans l'application</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">SMS (frais supplémentaires)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Sécurité du compte</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe actuel
                    </label>
                    <input type="password" className="w-full p-3 border rounded-lg" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <input type="password" className="w-full p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <input type="password" className="w-full p-3 border rounded-lg" />
                    </div>
                  </div>

                  <button className="btn-primary">
                    Changer le mot de passe
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Authentification à deux facteurs</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Vous recevrez un code par SMS lors de chaque connexion
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Activer
                  </button>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Sessions actives</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <Check className="text-green-600" size={20} />
                      <div>
                        <p className="font-medium">Session actuelle</p>
                        <p className="text-sm text-gray-600">Chrome - MacOS · Paris, France</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">Active maintenant</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Informations bancaires</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IBAN
                    </label>
                    <input
                      type="text"
                      placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BIC/SWIFT
                    </label>
                    <input
                      type="text"
                      placeholder="BNPAFRPPXXX"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titulaire du compte
                    </label>
                    <input
                      type="text"
                      placeholder="Nom de l'entreprise"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="text-blue-600" size={20} />
                  <span className="font-semibold text-blue-900">Virements automatiques</span>
                </div>
                <p className="text-sm text-blue-800">
                  Vos revenus sont virés automatiquement chaque début de mois sur ce compte bancaire.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">Plateformes de livraison</h3>
                
                <div className="space-y-4">
                  {['Uber Eats', 'Deliveroo', 'Just Eat', 'Glovo'].map((platform) => (
                    <div key={platform} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                        <div>
                          <p className="font-medium">{platform}</p>
                          <p className="text-sm text-green-600">Connecté</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        Gérer
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-6">API & Webhooks</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clé API
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="sk_live_****************"
                        readOnly
                        className="flex-1 p-3 border rounded-lg bg-gray-50"
                      />
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Régénérer
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://votre-site.com/webhook"
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}