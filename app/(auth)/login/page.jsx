'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'authentification
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8" style={{backgroundColor: 'white'}}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: 'linear-gradient(to right, #00B4D8, #52D726)'}}>
              <span className="text-white font-black text-2xl">B</span>
            </div>
            <span className="text-3xl font-black" style={{color: '#FF6B35'}}>BEYUM</span>
            <span className="text-sm px-2 py-1 rounded-full font-semibold" style={{backgroundColor: 'rgba(82, 215, 38, 0.2)', color: '#52D726'}}>ERP</span>
          </div>
        </div>

        {/* Welcome message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Bienvenue ! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connectez-vous pour gérer votre restaurant
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="restaurant@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10 pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-beyum-blue rounded focus:ring-beyum-blue" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
            </label>
            <Link href="/forgot-password" className="text-sm font-semibold hover:underline" style={{color: '#00B4D8'}}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Se connecter
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 rounded-xl" style={{backgroundColor: 'rgba(0, 180, 216, 0.1)'}}>
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            <strong>Demo :</strong> Utilisez n'importe quel email/mot de passe
          </p>
        </div>

        {/* Separator */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-dark-card text-gray-500">Nouveau sur BEYUM ?</span>
          </div>
        </div>

        {/* Register CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Rejoignez des centaines de restaurants qui augmentent leurs revenus avec BEYUM
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-semibold hover:underline"
            style={{color: '#00B4D8'}}
          >
            <Sparkles size={16} />
            Créer un compte gratuit
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="text-2xl font-black" style={{color: '#00B4D8'}}>0€</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Investissement</p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-black" style={{color: '#52D726'}}>+40%</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">CA moyen</p>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-black" style={{color: '#FF6B35'}}>24/7</div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Support</p>
        </div>
      </div>
    </motion.div>
  );
}