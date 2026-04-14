import { useRef, useState } from 'react';
import { Download, FileText, Printer, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CVData } from '../../types/cv';
import { CVPreview } from './CVPreview';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface CVPreviewPanelProps {
  data: CVData;
}

export function CVPreviewPanel({ data }: CVPreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    
    try {
      const element = previewRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `${data.personalInfo.fullName || 'CV'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF olusturma hatasi:', error);
      alert('PDF olusturulurken bir hata olustu.');
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
      <div className={`flex items-center justify-between p-4 border-b no-print transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#1F2937] border-[#4B5563]' 
          : 'bg-white border-[#E2E8F0]'
      }`}>
        <div className="flex items-center gap-2">
          <FileText className={`w-5 h-5 ${
            theme === 'dark' ? 'text-[#22D3EE]' : 'text-[#0062cc]'
          }`} />
          <h2 className={`font-semibold ${
            theme === 'dark' ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
          }`}>
            {t('preview')}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            disabled={isEmpty}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark'
                ? 'text-[#F3F4F6] bg-[#374151] border border-[#4B5563] hover:bg-[#4B5563]'
                : 'text-[#1A202C] bg-white border border-[#E2E8F0] hover:bg-[#F8F9FA]'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{t('print')}</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isEmpty || isGenerating}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              theme === 'dark'
                ? 'text-[#111827] bg-[#22D3EE] hover:bg-[#0BC5EA] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'text-white bg-[#0062cc] hover:bg-[#004c9e] hover:shadow-[0_0_15px_rgba(0,98,204,0.4)]'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>...{t('download_pdf')}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t('download_pdf')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-auto p-4 md:p-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#111827]' : 'bg-[#F1F3F5]'
      }`}>
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileText className={`w-16 h-16 mx-auto mb-4 ${
                theme === 'dark' ? 'text-[#374151]' : 'text-[#E2E8F0]'
              }`} />
              <p className={theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}>
                {t('no_data')}
              </p>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-[#6B7280]' : 'text-[#A0AEC0]'
              }`}
              >
                {t('add_info')}
              </p>
            </div>
          </div>
        ) : (
          <div ref={previewRef} className="print-only">
            <CVPreview data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
