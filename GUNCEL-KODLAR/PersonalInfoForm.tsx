import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, AlignLeft, Briefcase } from 'lucide-react';
import type { PersonalInfo } from '../../types/cv';
import { useLanguage } from '../../context/LanguageContext';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (info: Partial<PersonalInfo>) => void;
}

function Field({ label, value, onUpdate, placeholder, icon: Icon, type = 'text', noIcon = false }: {
  label: string; value: string; onUpdate: (v: string) => void;
  placeholder?: string; icon?: React.FC<{ size?: number }>; type?: string; noIcon?: boolean;
}) {
  return (
    <div>
      <label className="cvl">{label}</label>
      <div className={noIcon ? '' : 'input-wrap'}>
        {!noIcon && Icon && (
          <span className="input-icon"><Icon size={13} /></span>
        )}
        <input
          type={type}
          value={value}
          onChange={e => onUpdate(e.target.value)}
          placeholder={placeholder}
          className={`cvi${noIcon ? ' no-icon' : ''}`}
          autoComplete="off"
          autoCapitalize={type === 'email' ? 'none' : undefined}
        />
      </div>
    </div>
  );
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const { t } = useLanguage();

  return (
    <div>
      {/* Section heading */}
      <div className="sec-head">
        <div className="sec-icon"><User size={14} /></div>
        <span className="sec-title">{t('personal_info')}</span>
      </div>

      <div className="form-grid" style={{ gap: '12px' }}>
        {/* Full name */}
        <Field label={t('full_name')} value={data.fullName}
          onUpdate={v => onChange({ fullName: v })} placeholder="Aydın Aydemir" icon={User} />

        {/* Job title */}
        <Field label="Ünvan / Pozisyon" value={data.jobTitle || ''}
          onUpdate={v => onChange({ jobTitle: v })} placeholder="Senior Software Engineer" icon={Briefcase} />

        {/* Email + Phone — 2 cols on sm+ */}
        <div className="form-grid-2" style={{ gap: '12px' }}>
          <Field label={t('email')} value={data.email}
            onUpdate={v => onChange({ email: v })} placeholder="ornek@mail.com" icon={Mail} type="email" />
          <Field label={t('phone')} value={data.phone}
            onUpdate={v => onChange({ phone: v })} placeholder="+90 5XX XXX XX XX" icon={Phone} type="tel" />
        </div>

        {/* Location */}
        <Field label={t('location')} value={data.location}
          onUpdate={v => onChange({ location: v })} placeholder="İstanbul, Türkiye" icon={MapPin} />

        {/* LinkedIn + GitHub — 2 cols on sm+ */}
        <div className="form-grid-2" style={{ gap: '12px' }}>
          <Field label="LinkedIn" value={data.linkedin}
            onUpdate={v => onChange({ linkedin: v })} placeholder="linkedin.com/in/..." icon={Linkedin} />
          <Field label="GitHub" value={data.github}
            onUpdate={v => onChange({ github: v })} placeholder="github.com/..." icon={Github} />
        </div>

        {/* Website */}
        <Field label={t('website')} value={data.website}
          onUpdate={v => onChange({ website: v })} placeholder="aydinaydmr.com.tr" icon={Globe} />

        {/* Summary */}
        <div>
          <label className="cvl" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlignLeft size={10} /> {t('summary')}
          </label>
          <textarea
            value={data.summary}
            onChange={e => onChange({ summary: e.target.value })}
            placeholder="5+ yıllık deneyime sahip, React ve Node.js uzmanı yazılım geliştirici. Ölçeklenebilir uygulamalar tasarlar, ekip liderliği deneyimine sahip."
            rows={4}
            className="cvi"
            style={{ paddingLeft: '12px', minHeight: '96px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
            <p style={{ fontSize: '11.5px', color: 'var(--tm)' }}>
              💡 İş ilanındaki anahtar kelimeleri kullanın — ATS skoru artar
            </p>
            <span style={{ fontSize: '11px', color: data.summary.length > 50 ? 'var(--accent)' : 'var(--ts)', fontWeight: 600 }}>
              {data.summary.length} kr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
