'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Printer,
  Mail,
  Calendar,
  Filter,
  Check,
  X
} from 'lucide-react';
import { exportData } from '@/lib/storage';
import toast from 'react-hot-toast';

export default function ExportModule({ data, filename = 'beyum-export', onClose }) {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedData, setSelectedData] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    { id: 'pdf', label: 'PDF', icon: FileText, description: 'Document formaté avec graphiques' },
    { id: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Tableur avec formules' },
    { id: 'csv', label: 'CSV', icon: FileText, description: 'Données brutes séparées' },
    { id: 'json', label: 'JSON', icon: FileJson, description: 'Format développeur' }
  ];

  const dataOptions = [
    { id: 'all', label: 'Toutes les données' },
    { id: 'summary', label: 'Résumé exécutif' },
    { id: 'detailed', label: 'Rapport détaillé' },
    { id: 'custom', label: 'Personnalisé' }
  ];

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Process data based on selections
      const exportPayload = {
        data: processData(data, selectedData, dateRange),
        metadata: {
          exportDate: new Date().toISOString(),
          format: selectedFormat,
          includeCharts,
          dateRange
        }
      };

      // Export based on format
      switch (selectedFormat) {
        case 'csv':
          if (Array.isArray(exportPayload.data)) {
            exportData.toCSV(exportPayload.data, filename);
          }
          break;
        case 'json':
          exportData.toJSON(exportPayload, filename);
          break;
        case 'pdf':
        case 'excel':
          // These would require additional libraries in production
          simulateDownload(selectedFormat, filename);
          break;
      }

      if (sendEmail && email) {
        // Simulate email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(`Rapport envoyé à ${email}`);
      } else {
        toast.success('Export réussi!');
      }

      onClose();
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    } finally {
      setIsExporting(false);
    }
  };

  const processData = (rawData, dataType, range) => {
    // Process data based on selections
    // This is a simplified version
    if (dataType === 'summary') {
      return Object.entries(rawData).slice(0, 5).map(([key, value]) => ({
        metric: key,
        value: value
      }));
    }
    return rawData;
  };

  const simulateDownload = (format, filename) => {
    // Simulate file download
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = '#';
    link.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Exporter les données</h2>
              <p className="text-gray-600 mt-1">Configurez et téléchargez votre rapport</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Format Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Format d'export</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${selectedFormat === format.id
                      ? 'border-beyum-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <format.icon size={24} className={
                    selectedFormat === format.id ? 'text-beyum-blue' : 'text-gray-600'
                  } />
                  <p className="font-semibold mt-2">{format.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{format.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Data Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Type de données</h3>
            <div className="space-y-2">
              {dataOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="dataType"
                    value={option.id}
                    checked={selectedData === option.id}
                    onChange={(e) => setSelectedData(e.target.value)}
                    className="text-beyum-blue"
                  />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Période</h3>
            <div className="flex gap-2">
              {['day', 'week', 'month', 'year', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${dateRange === range
                      ? 'bg-beyum-blue text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }
                  `}
                >
                  {range === 'day' && 'Jour'}
                  {range === 'week' && 'Semaine'}
                  {range === 'month' && 'Mois'}
                  {range === 'year' && 'Année'}
                  {range === 'custom' && 'Personnalisé'}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="mb-6 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">Options</h3>
            
            {(selectedFormat === 'pdf' || selectedFormat === 'excel') && (
              <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={includeCharts}
                  onChange={(e) => setIncludeCharts(e.target.checked)}
                  className="text-beyum-blue"
                />
                <div className="flex-1">
                  <span className="font-medium">Inclure les graphiques</span>
                  <p className="text-xs text-gray-500">Ajoute des visualisations au rapport</p>
                </div>
              </label>
            )}

            <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="text-beyum-blue"
              />
              <div className="flex-1">
                <span className="font-medium">Envoyer par email</span>
                <p className="text-xs text-gray-500">Recevoir le rapport par courrier</p>
              </div>
              <Mail size={20} className="text-gray-400" />
            </label>

            {sendEmail && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="ml-9"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t">
            <div className="text-sm text-gray-600">
              <Calendar size={16} className="inline mr-1" />
              Export du {new Date().toLocaleDateString('fr-FR')}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting || (sendEmail && !email)}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Export en cours...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Exporter
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Quick Export Button Component
export function QuickExportButton({ data, filename }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Download size={20} />
        Exporter
      </button>

      {showModal && (
        <ExportModule
          data={data}
          filename={filename}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}