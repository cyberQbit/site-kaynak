import type { CVData } from '../../types/cv';

interface CVPreviewProps {
  data: CVData;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const [y, m] = dateString.split('-');
    const months = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
    return `${months[parseInt(m) - 1] || ''} ${y}`;
  } catch { return dateString; }
}

export function CVPreview({ data }: CVPreviewProps) {
  const { personalInfo, experience, education, skills, githubProjects, certificates, languages, template } = data;

  const isClassic = template === 'classic' || !template;
  const isModern = template === 'modern';
  // const isMinimal = template === 'minimal';

  const accentColor = isModern ? '#0062cc' : isClassic ? '#0f2850' : '#333';
  const accentLight = isModern ? '#e8f0fe' : isClassic ? '#eef2f9' : '#f5f5f5';

  const contacts: { label: string; value: string }[] = [];
  if (personalInfo.email) contacts.push({ label: 'email', value: personalInfo.email });
  if (personalInfo.phone) contacts.push({ label: 'phone', value: personalInfo.phone });
  if (personalInfo.location) contacts.push({ label: 'location', value: personalInfo.location });
  if (personalInfo.linkedin) contacts.push({ label: 'linkedin', value: personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '') });
  if (personalInfo.github) contacts.push({ label: 'github', value: personalInfo.github.replace(/^https?:\/\/(www\.)?/, '') });
  if (personalInfo.website) contacts.push({ label: 'web', value: personalInfo.website.replace(/^https?:\/\/(www\.)?/, '') });

  // Group skills by category
  const skillGroups: Record<string, string[]> = {};
  skills.forEach(s => {
    const cat = s.category || 'Genel';
    if (!skillGroups[cat]) skillGroups[cat] = [];
    skillGroups[cat].push(s.name);
  });

  return (
    <div
      id="cv-preview-root"
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        fontSize: '10pt',
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '18mm',
        boxSizing: 'border-box',
        lineHeight: '1.4',
      }}
    >
      {/* ── HEADER ─────────────────────────────────────────── */}
      <header style={{ marginBottom: '10px' }}>
        <h1 style={{
          fontSize: '22pt',
          fontWeight: 700,
          color: accentColor,
          margin: '0 0 2px 0',
          letterSpacing: '-0.3px',
        }}>
          {personalInfo.fullName || 'Ad Soyad'}
        </h1>
        {personalInfo.jobTitle && (
          <p style={{ fontSize: '11pt', color: '#555', margin: '0 0 6px 0', fontWeight: 400 }}>
            {personalInfo.jobTitle}
          </p>
        )}
        {contacts.length > 0 && (
          <p style={{ fontSize: '8.5pt', color: '#444', margin: '4px 0 0 0', lineHeight: '1.6' }}>
            {contacts.map((c, i) => (
              <span key={c.label}>
                {i > 0 && <span style={{ color: accentColor, margin: '0 5px' }}>|</span>}
                {c.value}
              </span>
            ))}
          </p>
        )}
        <div style={{
          borderBottom: `2px solid ${accentColor}`,
          marginTop: '8px',
        }} />
      </header>

      {/* ── SUMMARY ─────────────────────────────────────────── */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>Profesyonel Özet</SectionTitle>
          <p style={{ fontSize: '9.5pt', color: '#333', lineHeight: '1.6', margin: '0' }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* ── EXPERIENCE ─────────────────────────────────────── */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>İş Deneyimi</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '8px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: '10pt', color: '#111' }}>{exp.position}</strong>
                <span style={{ fontSize: '8.5pt', color: '#666', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {exp.startDate && formatDate(exp.startDate)}
                  {(exp.startDate || exp.endDate || exp.current) && ' – '}
                  {exp.current ? 'Günümüz' : (exp.endDate && formatDate(exp.endDate))}
                </span>
              </div>
              <div style={{ fontSize: '9pt', color: accentColor, fontStyle: 'italic', marginBottom: '3px' }}>
                {exp.company}
              </div>
              {exp.description && (
                <p style={{ fontSize: '9pt', color: '#444', margin: '0 0 3px 0', lineHeight: '1.5' }}>
                  {exp.description}
                </p>
              )}
              {exp.bullets && exp.bullets.filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '2px 0 0 0', paddingLeft: '14px' }}>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <li key={i} style={{ fontSize: '9pt', color: '#444', lineHeight: '1.5', marginBottom: '1px' }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── EDUCATION ─────────────────────────────────────── */}
      {education.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>Eğitim</SectionTitle>
          {education.map((edu, idx) => (
            <div key={edu.id} style={{ marginBottom: idx < education.length - 1 ? '6px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: '10pt', color: '#111' }}>
                  {[edu.degree, edu.field].filter(Boolean).join(', ') || edu.school}
                </strong>
                <span style={{ fontSize: '8.5pt', color: '#666', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                  {edu.startDate && formatDate(edu.startDate)}
                  {(edu.startDate || edu.endDate || edu.current) && ' – '}
                  {edu.current ? 'Günümüz' : (edu.endDate && formatDate(edu.endDate))}
                </span>
              </div>
              <div style={{ fontSize: '9pt', color: accentColor, fontStyle: 'italic' }}>{edu.school}</div>
              {edu.gpa && <div style={{ fontSize: '8.5pt', color: '#666' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {/* ── SKILLS ────────────────────────────────────────── */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>Yetenekler</SectionTitle>
          {Object.keys(skillGroups).length > 1 ? (
            Object.entries(skillGroups).map(([cat, names]) => (
              <div key={cat} style={{ marginBottom: '3px', fontSize: '9pt' }}>
                <strong style={{ color: accentColor }}>{cat}: </strong>
                <span style={{ color: '#333' }}>{names.join(' • ')}</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '9pt', color: '#333', margin: '0', lineHeight: '1.6' }}>
              {skills.map(s => s.name).join(' • ')}
            </p>
          )}
        </section>
      )}

      {/* ── PROJECTS ─────────────────────────────────────── */}
      {githubProjects.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>Projeler</SectionTitle>
          {githubProjects.map((proj, idx) => (
            <div key={proj.id} style={{ marginBottom: idx < githubProjects.length - 1 ? '6px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '10pt', color: '#111' }}>{proj.repoName}</strong>
                {proj.language && (
                  <span style={{ fontSize: '8.5pt', color: '#666' }}>{proj.language}</span>
                )}
              </div>
              {proj.description && (
                <p style={{ fontSize: '9pt', color: '#444', margin: '1px 0 1px 0', lineHeight: '1.5' }}>
                  {proj.description}
                </p>
              )}
              {proj.repoUrl && (
                <div style={{ fontSize: '8pt', color: accentColor }}>
                  {proj.repoUrl.replace(/^https?:\/\//, '')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── CERTIFICATES ────────────────────────────────── */}
      {certificates && certificates.length > 0 && (
        <section style={{ marginBottom: '10px' }}>
          <SectionTitle color={accentColor} light={accentLight}>Sertifikalar</SectionTitle>
          {certificates.map((cert, idx) => (
            <div key={cert.id} style={{ marginBottom: idx < certificates.length - 1 ? '5px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '10pt', color: '#111' }}>{cert.name}</strong>
                {cert.date && (
                  <span style={{ fontSize: '8.5pt', color: '#666' }}>{formatDate(cert.date)}</span>
                )}
              </div>
              {cert.issuer && (
                <div style={{ fontSize: '9pt', color: accentColor, fontStyle: 'italic' }}>{cert.issuer}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ── LANGUAGES ────────────────────────────────────── */}
      {languages && languages.length > 0 && (
        <section>
          <SectionTitle color={accentColor} light={accentLight}>Diller</SectionTitle>
          <p style={{ fontSize: '9.5pt', color: '#333', margin: '0' }}>
            {languages.map(l => `${l.name} (${l.level})`).join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children, color, light }: { children: React.ReactNode; color: string; light: string }) {
  return (
    <div style={{ marginBottom: '5px' }}>
      <h2 style={{
        fontSize: '10pt',
        fontWeight: 700,
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        margin: '0 0 2px 0',
        padding: '2px 6px',
        backgroundColor: light,
        display: 'inline-block',
      }}>
        {children}
      </h2>
      <div style={{ borderBottom: `1px solid ${color}`, opacity: 0.3 }} />
    </div>
  );
}
