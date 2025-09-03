'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Upload, 
  Plus, 
  Minus,
  Check,
  AlertCircle,
  Package,
  Euro,
  Tag,
  Image as ImageIcon,
  Loader
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import useGlobalStore from '@/store/globalStore';
import toast from 'react-hot-toast';

export default function ProductForm({ onClose, product = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(product?.image || null);
  const [variants, setVariants] = useState(product?.variants || [{ name: '', price: '' }]);
  const { addProduct, updateProduct, restaurants } = useGlobalStore();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: product || {
      name: '',
      description: '',
      price: '',
      category: '',
      restaurant: '',
      stock: 100,
      active: true
    }
  });

  const watchActive = watch('active');
  const watchStock = watch('stock');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        toast.success('Image téléchargée!');
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', price: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const productData = {
      ...data,
      image: imagePreview,
      variants: variants.filter(v => v.name && v.price),
      createdAt: new Date().toISOString()
    };

    if (product) {
      updateProduct(product.id, productData);
      toast.success('Produit mis à jour avec succès!');
    } else {
      addProduct(productData);
      toast.success('Produit ajouté avec succès!');
    }

    setIsSubmitting(false);
    onClose();
  };

  const categories = [
    'Burgers', 'Pizzas', 'Tacos', 'Sushis', 
    'Salades', 'Desserts', 'Boissons', 'Accompagnements'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-morphism"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/20 sticky top-0 bg-white/80 backdrop-blur-xl z-10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 rounded-lg bg-gradient-to-br from-beyum-blue to-beyum-green"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Package size={24} className="text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {product ? 'Modifier le produit' : 'Nouveau produit'}
                  </h2>
                  <p className="text-sm text-gray-600">Remplissez les informations du produit</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image du produit
              </label>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-beyum-blue transition-colors overflow-hidden glass-gradient"
                >
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Upload size={32} className="text-gray-400" />
                      </motion.div>
                      <p className="mt-2 text-sm text-gray-500">Cliquez pour télécharger</p>
                    </div>
                  )}
                </label>
                {imagePreview && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit *
                </label>
                <input
                  {...register('name', { 
                    required: 'Le nom est requis',
                    minLength: { value: 3, message: 'Minimum 3 caractères' }
                  })}
                  className="glass-input w-full"
                  placeholder="Ex: Burger Classic"
                />
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix de base (€) *
                </label>
                <div className="relative">
                  <Euro size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('price', { 
                      required: 'Le prix est requis',
                      min: { value: 0.01, message: 'Prix minimum: 0.01€' }
                    })}
                    type="number"
                    step="0.01"
                    className="glass-input w-full pl-9"
                    placeholder="9.99"
                  />
                </div>
                {errors.price && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.price.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Category & Restaurant */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  {...register('category', { required: 'La catégorie est requise' })}
                  className="glass-input w-full"
                >
                  <option value="">Sélectionner...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.category.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Restaurant *
                </label>
                <select
                  {...register('restaurant', { required: 'Le restaurant est requis' })}
                  className="glass-input w-full"
                >
                  <option value="">Sélectionner...</option>
                  {restaurants.map(rest => (
                    <option key={rest.id} value={rest.id}>{rest.name}</option>
                  ))}
                </select>
                {errors.restaurant && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-xs mt-1 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    {errors.restaurant.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="glass-input w-full resize-none"
                placeholder="Décrivez votre produit..."
              />
            </div>

            {/* Variants */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Variantes (optionnel)
                </label>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addVariant}
                  className="text-beyum-blue hover:text-beyum-green flex items-center gap-1 text-sm"
                >
                  <Plus size={16} />
                  Ajouter
                </motion.button>
              </div>
              <AnimatePresence>
                {variants.map((variant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2 mb-2"
                  >
                    <input
                      value={variant.name}
                      onChange={(e) => updateVariant(index, 'name', e.target.value)}
                      className="glass-input flex-1"
                      placeholder="Nom (ex: Grande)"
                    />
                    <input
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      type="number"
                      step="0.01"
                      className="glass-input w-24"
                      placeholder="Prix"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeVariant(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Minus size={16} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stock & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock disponible
                </label>
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setValue('stock', Math.max(0, watchStock - 10))}
                    className="p-2 glass-morphism rounded-lg"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <input
                    {...register('stock', { min: 0 })}
                    type="number"
                    className="glass-input w-24 text-center"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setValue('stock', watchStock + 10)}
                    className="p-2 glass-morphism rounded-lg"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <motion.button
                  type="button"
                  onClick={() => setValue('active', !watchActive)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    watchActive 
                      ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {watchActive ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check size={16} />
                      Actif
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <X size={16} />
                      Inactif
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {product ? 'Mettre à jour' : 'Créer le produit'}
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}