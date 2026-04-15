import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { CVData } from '../types/cv';

export async function generatePDF(data: CVData): Promise<void> {
  const element = document.getElementById('cv-preview-root');
  if (!element) {
    throw new Error('Önizleme elemanı bulunamadı.');
  }

  // A4 boyutu 210mm 
  const originalWidth = element.style.width;
  element.style.width = '210mm';
  
  try {
    const canvas = await html2canvas(element, {
      scale: 3, 
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    
    let heightLeft = pdfHeight - pageHeight;
    let position = 0;
    
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    
    let fileName = 'CV.pdf';
    if (data && data.personalInfo && data.personalInfo.fullName) {
        fileName = `CV_${data.personalInfo.fullName.trim().replace(/\\s+/g, '_')}.pdf`;
    }
      
    pdf.save(fileName);
  } finally {
    element.style.width = originalWidth;
  }
}
