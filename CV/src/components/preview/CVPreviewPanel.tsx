import { useState } from 'react';
import { Download, FileText, Printer, Loader2, Eye, X } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { CVPreview } from './CVPreview';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { generatePDF } from '../../utils/pdfGenerator';

interface CVPreviewPanelProps {
  data: CVData;
  onMobileClose?: () => void;
  /** render only the action buttons row (for mobile overlay header) */
  headerOnly?: boolean;
  /** render only the preview body (for mobile overlay body) */
  bodyOnly?: boolean;
}

export function CVPreviewPanel({ data, onMobileClose, headerOnly, bodyOnly }: CVPreviewPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try { generatePDF(data); }
    catch (err) { console.error(err); alert('PDF oluşturulurken hata oluştu.'); }
    finally { setIsGenerating(false); }
  };

  const isEmpty =
    !data.personalInfo.fullName &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.skills.length === 0;

  /* ── Actions strip (reused in both full and overlay header) ─ */
  const Actions = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <button
        onClick={() => window.print()}
        title="Yazdır"
        className="btn-icon"
      >
        <Printer size={14} />
      </button>

      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating || isEmpty}
        className="btn-p"
        style={{
          padding: '8px 14px',
          fontSize: '13px',
          opacity: isEmpty ? 0.45 : 1,
          background: isEmpty
            ? 'var(--card-bg)'
            : 'linear-gradient(135deg, var(--accent) 0%, var(--accent-d) 100%)',
          color: isEmpty ? 'var(--tm)' : '#06111F',
          border: isEmpty ? '1px solid var(--panel-bd)' : 'none',
          boxShadow: isEmpty ? 'none' : '0 2px 14px var(--accent-glow)',
          cursor: isEmpty ? 'not-allowed' : 'pointer',
        }}
      >
        {isGenerating
          ? <><Loader2 size={13} className="spin" /> Hazırlanıyor...</>
          : <><Download size={13} /> {t('download_pdf')}</>
        }
      </button>

      {onMobileClose && (
        <button className="btn-icon" onClick={onMobileClose} title="Kapat">
          <X size={15} />
        </button>
      )}
    </div>
  );

  /* ── headerOnly: just the actions (used inside mobile overlay header) */
  if (headerOnly) return <Actions />;

  /* ── bodyOnly: just the scrollable preview area */
  if (bodyOnly) return (
    <>
      <PreviewArea data={data} isEmpty={isEmpty} isDark={isDark} />
      <style>{printStyles}</style>
    </>
  );

  /* ── Full panel (desktop) ─────────────────────────────────── */
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid var(--panel-bd)',
        background: 'var(--nav-bg)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="sec-icon"><Eye size={13} /></div>
          <span style={{ fontSize: '13.5px', fontWeight: 700 }}>CV Önizleme</span>
          <span style={{
            padding: '2px 8px',
            background: 'var(--accent-glow)',
            color: 'var(--accent)',
            fontSize: '10.5px', fontWeight: 700,
            borderRadius: '20px',
            border: '1px solid var(--accent-ring)',
          }}>ATS ✓</span>
        </div>
        <Actions />
      </div>

      {/* Preview area */}
      <PreviewArea data={data} isEmpty={isEmpty} isDark={isDark} />

      <style>{printStyles}</style>
    </div>
  );
}

/* ── Preview body component ───────────────────────────────── */
function PreviewArea({ data, isEmpty, isDark }: { data: CVData; isEmpty: boolean; isDark: boolean }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch' as any,
      background: isDark ? 'rgba(5,10,20,.7)' : '#E4EAF3',
    }}>
      {isEmpty ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '14px', margin: '0 auto 14px',
              background: 'var(--accent-glow)',
              border: '1px solid var(--accent-ring)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FileText size={24} color={isDark ? '#334155' : '#CBD5E1'} />
            </div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: isDark ? '#475569' : '#94A3B8' }}>
              Henüz bilgi girilmedi
            </p>
            <p style={{ fontSize: '12.5px', marginTop: '4px', color: isDark ? '#334155' : '#CBD5E1' }}>
              Sol panelden bilgilerinizi ekleyin
            </p>
          </div>
        </div>
      ) : (
        <ScaledPreview data={data} />
      )}
    </div>
  );
}

/* ── Auto-scaling preview ─────────────────────────────────── */
function ScaledPreview({ data }: { data: CVData }) {
  // A4 width in px at 96dpi: 210mm ≈ 794px
  // We scale to fit the container width
  const A4_PX = 794;

  return (
    <div className="print-wrapper" style={{ padding: "20px 12px 32px", display: "flex", justifyContent: "center" }}>
      <div className="print-scale-wrapper" style={{ width: `${A4_PX}px`, transform: `scale(var(--cv-scale, 0.68))`,
        transformOrigin: 'top center',
        // collapse the extra space after scaling down
        marginBottom: `calc((var(--cv-scale, 0.68) - 1) * 297mm)`,
        boxShadow: '0 6px 36px rgba(0,0,0,.22)',
        borderRadius: '2px',
      }}>
        <style>{`
          /* Dynamically compute scale based on container width */
          @media (max-width: 479px)  { :root { --cv-scale: 0.36; } }
          @media (min-width: 480px)  { :root { --cv-scale: 0.44; } }
          @media (min-width: 600px)  { :root { --cv-scale: 0.56; } }
          @media (min-width: 768px)  { :root { --cv-scale: 0.64; } }
          @media (min-width: 1024px) { :root { --cv-scale: 0.68; } }
          @media (min-width: 1200px) { :root { --cv-scale: 0.72; } }
          @media (min-width: 1400px) { :root { --cv-scale: 0.76; } }
        `}</style>
        <CVPreview data={data} />
      </div>
    </div>
  );
}

const printStyles = `
  @media print {
    .cv-app, body * { visibility: hidden !important; }
    #cv-preview-root, #cv-preview-root * { visibility: visible !important; }
    #cv-preview-root {
      position: fixed !important;
      top: 0 !important; left: 0 !important;
      width: 210mm !important;
      margin: 0 !important; padding: 18mm !important;
      box-shadow: none !important;
    }
  }
`;

