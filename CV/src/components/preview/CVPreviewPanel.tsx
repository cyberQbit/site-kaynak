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

const ACCENT   = '#38BDF8';
const ACCENT_D = '#0EA5E9';

export function CVPreviewPanel({ data, onMobileClose }: CVPreviewPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const tp  = isDark ? '#F1F5F9' : '#0F172A';
  const tm  = isDark ? '#94A3B8' : '#64748B';
  const pbd = isDark ? 'rgba(56,189,248,0.09)' : 'rgba(14,165,233,0.15)';

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try { await generatePDF(data); }
    catch (err) { console.error(err); alert('PDF oluşturulurken hata oluştu.'); }
    finally { setIsGenerating(false); }
  };

  const isEmpty = !data.personalInfo.fullName &&
    data.experience.length === 0 &&
    data.education.length === 0 &&
    data.skills.length === 0;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* ── Panel header ──────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: `1px solid ${pbd}`,
        background: isDark ? 'rgba(8,14,26,0.55)' : 'rgba(241,245,249,0.7)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
            background: `linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.12))`,
            border: `1px solid rgba(56,189,248,0.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT,
          }}>
            <Eye size={13} />
          </span>
          <span style={{ fontSize: '13.5px', fontWeight: 700, color: tp }}>CV Önizleme</span>
          {/* ATS badge */}
          <span style={{
            padding: '2px 8px',
            background: 'rgba(56,189,248,0.1)',
            color: ACCENT,
            fontSize: '10.5px', fontWeight: 700,
            borderRadius: '20px',
            border: `1px solid rgba(56,189,248,0.22)`,
            letterSpacing: '0.04em',
          }}>
            ATS ✓
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Print */}
          <button
            onClick={() => window.print()}
            title="Yazdır"
            style={{
              width: '34px', height: '34px', borderRadius: '9px',
              border: `1px solid ${pbd}`, background: 'transparent',
              color: tm, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.14s',
            }}
            onMouseOver={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = isDark ? 'rgba(148,163,184,0.08)' : 'rgba(100,116,139,0.07)'; b.style.color = tp; }}
            onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = tm; }}
          >
            <Printer size={14} />
          </button>

          {/* PDF download */}
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating || isEmpty}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px',
              background: isEmpty ? (isDark ? 'rgba(56,189,248,0.08)' : 'rgba(14,165,233,0.07)') : `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_D} 100%)`,
              color: isEmpty ? tm : '#06111F',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px', fontWeight: 700,
              border: isEmpty ? `1px solid ${pbd}` : 'none',
              borderRadius: '10px', cursor: isEmpty ? 'not-allowed' : 'pointer',
              boxShadow: isEmpty ? 'none' : '0 2px 14px rgba(56,189,248,0.28)',
              transition: 'all 0.16s',
              opacity: isGenerating ? 0.7 : 1,
            }}
            onMouseOver={e => { if (!isEmpty && !isGenerating) { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(-1px)'; b.style.boxShadow = '0 4px 20px rgba(56,189,248,0.40)'; } }}
            onMouseOut={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = 'translateY(0)'; b.style.boxShadow = isEmpty ? 'none' : '0 2px 14px rgba(56,189,248,0.28)'; }}
          >
            {isGenerating
              ? <><Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> Hazırlanıyor...</>
              : <><Download size={13} /> {t('download_pdf')}</>
            }
          </button>

          {onMobileClose && (
            <button onClick={onMobileClose} style={{ width: '34px', height: '34px', borderRadius: '9px', border: `1px solid ${pbd}`, background: 'transparent', color: tm, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', fontFamily: 'DM Sans, sans-serif' }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Preview area ─────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: 'auto',
        background: isDark ? 'rgba(5,10,20,0.7)' : '#E8EDF5',
      }}>
        {isEmpty ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px', margin: '0 auto 16px',
                background: `linear-gradient(135deg, rgba(56,189,248,0.1), rgba(99,102,241,0.08))`,
                border: `1px solid rgba(56,189,248,0.15)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FileText size={26} color={isDark ? '#334155' : '#CBD5E1'} />
              </div>
              <p style={{ fontWeight: 600, fontSize: '14px', color: isDark ? '#475569' : '#94A3B8' }}>{t('no_data')}</p>
              <p style={{ fontSize: '12.5px', marginTop: '4px', color: isDark ? '#334155' : '#CBD5E1' }}>{t('add_info')}</p>
            </div>
          </div>
        ) : (
          <div style={{ padding: '24px 16px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              transform: 'scale(var(--cv-scale, 0.71))',
              transformOrigin: 'top center',
              marginBottom: 'calc((var(--cv-scale, 0.71) - 1) * 297mm)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
              borderRadius: '2px',
            }}>
              <CVPreview data={data} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          body * { visibility: hidden !important; }
          #cv-preview-root, #cv-preview-root * { visibility: visible !important; }
          #cv-preview-root { position: fixed !important; top: 0 !important; left: 0 !important; width: 210mm !important; margin: 0 !important; padding: 18mm !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

