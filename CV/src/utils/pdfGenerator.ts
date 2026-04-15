import jsPDF from 'jspdf';
import type { CVData } from '../types/cv';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

interface PdfState {
  doc: jsPDF;
  y: number;
}

function checkPage(state: PdfState, needed = 8) {
  if (state.y + needed > PAGE_H - 15) {
    state.doc.addPage();
    state.y = MARGIN;
  }
}

function sectionHeader(state: PdfState, title: string, accentColor: number[]) {
  checkPage(state, 14);
  state.y += 4;
  state.doc.setFont('helvetica', 'bold');
  state.doc.setFontSize(11);
  state.doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  state.doc.text(title.toUpperCase(), MARGIN, state.y);
  state.y += 2;
  state.doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  state.doc.setLineWidth(0.5);
  state.doc.line(MARGIN, state.y, MARGIN + CONTENT_W, state.y);
  state.y += 5;
  state.doc.setTextColor(30, 30, 30);
}

function formatDateStr(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m] = dateStr.split('-');
    const months = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    return `${months[parseInt(m) - 1] || ''} ${y}`;
  } catch { return dateStr; }
}

export function generatePDF(data: CVData): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const state: PdfState = { doc, y: MARGIN };

  const accent = data.template === 'modern' ? [0, 98, 204] :
                 data.template === 'minimal' ? [60, 60, 60] :
                 [15, 40, 80]; // classic navy

  // ─── HEADER ────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(accent[0], accent[1], accent[2]);
  doc.text(data.personalInfo.fullName || 'Ad Soyad', MARGIN, state.y);
  state.y += 7;

  if (data.personalInfo.jobTitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(data.personalInfo.jobTitle, MARGIN, state.y);
    state.y += 5;
  }

  // Contact line
  const contacts: string[] = [];
  if (data.personalInfo.email)    contacts.push(data.personalInfo.email);
  if (data.personalInfo.phone)    contacts.push(data.personalInfo.phone);
  if (data.personalInfo.location) contacts.push(data.personalInfo.location);
  if (data.personalInfo.linkedin) contacts.push(data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (data.personalInfo.github)   contacts.push(data.personalInfo.github.replace(/^https?:\/\/(www\.)?/, ''));
  if (data.personalInfo.website)  contacts.push(data.personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''));

  if (contacts.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const contactLine = contacts.join('  |  ');
    doc.text(contactLine, MARGIN, state.y, { maxWidth: CONTENT_W });
    state.y += 5;
  }

  // Divider
  doc.setDrawColor(accent[0], accent[1], accent[2]);
  doc.setLineWidth(1);
  doc.line(MARGIN, state.y, MARGIN + CONTENT_W, state.y);
  state.y += 6;

  // ─── SUMMARY ───────────────────────────────────────────────────
  if (data.personalInfo.summary) {
    sectionHeader(state, 'Profesyonel Özet', accent);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(data.personalInfo.summary, CONTENT_W);
    lines.forEach((line: string) => {
      checkPage(state, 5);
      doc.text(line, MARGIN, state.y);
      state.y += 4.5;
    });
    state.y += 2;
  }

  // ─── EXPERIENCE ────────────────────────────────────────────────
  if (data.experience.length > 0) {
    sectionHeader(state, 'İş Deneyimi', accent);
    data.experience.forEach((exp, idx) => {
      checkPage(state, 14);
      // Position + Company
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(exp.position || '', MARGIN, state.y);

      const dateStr = [
        exp.startDate ? formatDateStr(exp.startDate) : '',
        exp.current ? 'Günümüz' : (exp.endDate ? formatDateStr(exp.endDate) : ''),
      ].filter(Boolean).join(' – ');

      if (dateStr) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(dateStr, MARGIN + CONTENT_W, state.y, { align: 'right' });
      }
      state.y += 4.5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.text(exp.company || '', MARGIN, state.y);
      state.y += 5;

      if (exp.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(exp.description, CONTENT_W - 4);
        descLines.forEach((line: string) => {
          checkPage(state, 5);
          doc.text(line, MARGIN + 2, state.y);
          state.y += 4.2;
        });
      }

      // Bullets
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.filter(b => b.trim()).forEach(bullet => {
          checkPage(state, 5);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(50, 50, 50);
          const bulletLines = doc.splitTextToSize(`• ${bullet}`, CONTENT_W - 6);
          bulletLines.forEach((line: string) => {
            doc.text(line, MARGIN + 3, state.y);
            state.y += 4.2;
          });
        });
      }

      if (idx < data.experience.length - 1) state.y += 3;
    });
    state.y += 2;
  }

  // ─── EDUCATION ─────────────────────────────────────────────────
  if (data.education.length > 0) {
    sectionHeader(state, 'Eğitim', accent);
    data.education.forEach((edu, idx) => {
      checkPage(state, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      const degreeField = [edu.degree, edu.field].filter(Boolean).join(', ');
      doc.text(degreeField || edu.school || '', MARGIN, state.y);

      const dateStr = [
        edu.startDate ? formatDateStr(edu.startDate) : '',
        edu.current ? 'Günümüz' : (edu.endDate ? formatDateStr(edu.endDate) : ''),
      ].filter(Boolean).join(' – ');

      if (dateStr) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(dateStr, MARGIN + CONTENT_W, state.y, { align: 'right' });
      }
      state.y += 4.5;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.text(edu.school || '', MARGIN, state.y);
      state.y += 4.5;

      if (edu.gpa) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        doc.text(`GPA: ${edu.gpa}`, MARGIN, state.y);
        state.y += 4;
      }

      if (idx < data.education.length - 1) state.y += 2;
    });
    state.y += 2;
  }

  // ─── SKILLS ────────────────────────────────────────────────────
  if (data.skills.length > 0) {
    sectionHeader(state, 'Yetenekler', accent);
    checkPage(state, 8);

    // Group by category
    const grouped: Record<string, string[]> = {};
    data.skills.forEach(s => {
      const cat = s.category || 'Genel';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s.name);
    });

    Object.entries(grouped).forEach(([cat, names]) => {
      checkPage(state, 6);
      if (Object.keys(grouped).length > 1) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(accent[0], accent[1], accent[2]);
        doc.text(`${cat}: `, MARGIN, state.y);
        const catWidth = doc.getTextWidth(`${cat}: `);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        const skillLine = names.join(' • ');
        const skillLines = doc.splitTextToSize(skillLine, CONTENT_W - catWidth);
        doc.text(skillLines[0] || '', MARGIN + catWidth, state.y);
        if (skillLines.length > 1) {
          state.y += 4.2;
          skillLines.slice(1).forEach((l: string) => {
            doc.text(l, MARGIN, state.y);
            state.y += 4.2;
          });
        } else {
          state.y += 4.5;
        }
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(40, 40, 40);
        const skillLine = names.join(' • ');
        const skillLines = doc.splitTextToSize(skillLine, CONTENT_W);
        skillLines.forEach((line: string) => {
          doc.text(line, MARGIN, state.y);
          state.y += 4.5;
        });
      }
    });
    state.y += 2;
  }

  // ─── GITHUB PROJECTS ───────────────────────────────────────────
  if (data.githubProjects.length > 0) {
    sectionHeader(state, 'Projeler', accent);
    data.githubProjects.forEach((proj, idx) => {
      checkPage(state, 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(proj.repoName || '', MARGIN, state.y);
      if (proj.language) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(proj.language, MARGIN + CONTENT_W, state.y, { align: 'right' });
      }
      state.y += 4.5;

      if (proj.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(proj.description, CONTENT_W - 4);
        descLines.forEach((line: string) => {
          checkPage(state, 5);
          doc.text(line, MARGIN + 2, state.y);
          state.y += 4.2;
        });
      }

      if (proj.repoUrl) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(accent[0], accent[1], accent[2]);
        doc.text(proj.repoUrl.replace(/^https?:\/\//, ''), MARGIN + 2, state.y);
        state.y += 4;
      }

      if (idx < data.githubProjects.length - 1) state.y += 2;
    });
    state.y += 2;
  }

  // ─── CERTIFICATES ──────────────────────────────────────────────
  if (data.certificates && data.certificates.length > 0) {
    sectionHeader(state, 'Sertifikalar', accent);
    data.certificates.forEach((cert, idx) => {
      checkPage(state, 8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(cert.name || '', MARGIN, state.y);
      if (cert.date) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text(formatDateStr(cert.date), MARGIN + CONTENT_W, state.y, { align: 'right' });
      }
      state.y += 4.5;
      if (cert.issuer) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(accent[0], accent[1], accent[2]);
        doc.text(cert.issuer, MARGIN, state.y);
        state.y += 4.5;
      }
      if (idx < data.certificates.length - 1) state.y += 1;
    });
    state.y += 2;
  }

  // ─── LANGUAGES ─────────────────────────────────────────────────
  if (data.languages && data.languages.length > 0) {
    sectionHeader(state, 'Diller', accent);
    checkPage(state, 8);
    const langLine = data.languages.map(l => `${l.name} (${l.level})`).join('  •  ');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const langLines = doc.splitTextToSize(langLine, CONTENT_W);
    langLines.forEach((line: string) => {
      doc.text(line, MARGIN, state.y);
      state.y += 4.5;
    });
  }

  // ─── SAVE ──────────────────────────────────────────────────────
  const name = data.personalInfo.fullName?.replace(/\s+/g, '_') || 'CV';
  const date = new Date().toISOString().split('T')[0];
  doc.save(`${name}_${date}.pdf`);
}
