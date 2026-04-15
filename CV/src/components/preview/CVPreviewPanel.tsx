import { useState } from 'react';
import { Download, FileText, Printer, Loader2, Eye } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { CVPreview } from './CVPreview';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { generatePDF } from '../../utils/pdfGenerator';

interface CVPreviewPanelProps {
  data: CVData;
  onMobileClose?: () => void;
}

export function CVPreviewPanel({ data, onMobileClose }: CVPreviewPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      generatePDF(data);
    } catch (err) {
      console.error('PDF hatası:', err);
      alert('PDF oluşturulurken bir hata oluştu.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isEmpty = !data.personalInfo.fullName &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.skills.length === 0;

  return (
    <div className="h-full flex flex-col">
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b no-print flex-shrink-0"
        style={{
          backgroundColor: isDark ? '#1F2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#E2E8F0',
        }}
      >
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" style={{ color: isDark ? '#22D3EE' : '#0062cc' }} />
          <span className="font-semibold text-sm" style={{ color: isDark ? '#F3F4F6' : '#1A202C' }}>
            {t('preview')}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: isDark ? '#22D3EE20' : '#0062cc15',
              color: isDark ? '#22D3EE' : '#0062cc',
            }}
          >
            ATS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            title="Yazdır"
            className="p-2 rounded-lg transition-colors"
            style={{
              color: isDark ? '#9CA3AF' : '#4A5568',
              backgroundColor: 'transparent',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#F1F3F5')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating || isEmpty}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
            style={{
              backgroundColor: isDark ? '#22D3EE' : '#0062cc',
              color: isDark ? '#111827' : '#ffffff',
            }}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isGenerating ? 'Hazırlanıyor...' : t('download_pdf')}
          </button>

          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-2 rounded-lg text-sm"
              style={{ color: isDark ? '#9CA3AF' : '#4A5568' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div
        className="flex-1 overflow-auto no-print"
        style={{ backgroundColor: isDark ? '#111827' : '#F1F3F5' }}
      >
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <FileText
                className="w-14 h-14 mx-auto mb-3"
                style={{ color: isDark ? '#374151' : '#D1D5DB' }}
              />
              <p className="font-medium" style={{ color: isDark ? '#9CA3AF' : '#4A5568' }}>
                {t('no_data')}
              </p>
              <p className="text-sm mt-1" style={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>
                {t('add_info')}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6 px-2 flex justify-center">
            <div
              className="shadow-xl"
              style={{
                transform: 'scale(0.72)',
                transformOrigin: 'top center',
                marginBottom: 'calc((0.72 - 1) * 297mm)',
              }}
            >
              <CVPreview data={data} />
            </div>
          </div>
        )}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cv-preview-root, #cv-preview-root * { visibility: visible !important; }
          #cv-preview-root {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 18mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
