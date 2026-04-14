import { useRef } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CVData } from '../../types/cv';
import { CVPreview } from './CVPreview';

interface CVPreviewPanelProps {
  data: CVData;
}

export function CVPreviewPanel({ data }: CVPreviewPanelProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      // html2canvas için elementi hazırla
      const element = previewRef.current;
      
      // Canvas oluştur - daha yüksek kalite için scale: 2
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
      
      // A4 boyutları (mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Görüntü boyutları
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Oran hesapla - A4'e sığacak şekilde
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
      
      // Ortala
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5; // Üstten biraz boşluk
      
      // PDF'e ekle
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Dosya adını oluştur
      const fileName = `${data.personalInfo.fullName || 'CV'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin. Hata: ' + (error as Error).message);
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
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 no-print">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">CV Önizleme</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            disabled={isEmpty}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="w-4 h-4" />
            Yazdır
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isEmpty}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF İndir
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 md:p-8">
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">Henüz bir bilgi girilmedi</p>
              <p className="text-sm text-gray-400">Sol panelden bilgilerinizi ekleyin</p>
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
