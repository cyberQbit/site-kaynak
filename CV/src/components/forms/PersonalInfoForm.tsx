import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, AlignLeft, Briefcase } from 'lucide-react';
import type { PersonalInfo } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (info: Partial<PersonalInfo>) => void;
}

const ACCENT      = '#38BDF8';

function IconInput({
  label, value, onUpdate, placeholder, icon: Icon, type = 'text', tm,
}: {
  label: string; value: string; onUpdate: (v: string) => void;
  placeholder?: string; icon: React.FC<{ size?: number; color?: string }>;
  type?: string;
  tm: string;
}) {
  return (
    <div>
      <label className="cvl">{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: tm, display: 'flex',
        }}>
          <Icon size={14} color={tm} />
        </span>
        <input
          type={type}
          value={value}
          onChange={e => onUpdate(e.target.value)}
          placeholder={placeholder}
          className="cvi"
        />
      </div>
    </div>
  );
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const tm = isDark ? '#94A3B8' : '#64748B';
  const tp = isDark ? '#F1F5F9' : '#0F172A';

  return (
    <div>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <div className="sec-icon"><User size={14} /></div>
        <span style={{ fontSize: '14px', fontWeight: 700, color: tp }}>{t('personal_info')}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Full name - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <IconInput tm={tm} label={t('full_name')} value={data.fullName} onUpdate={v => onChange({ fullName: v })}
            placeholder="Aydın Aydemir" icon={User} />
        </div>

        {/* Job title - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <IconInput tm={tm} label="Ünvan / Pozisyon" value={data.jobTitle || ''} onUpdate={v => onChange({ jobTitle: v })}
            placeholder="Senior Software Engineer" icon={Briefcase} />
        </div>

        {/* Email + Phone */}
        <IconInput tm={tm} label={t('email')} value={data.email} onUpdate={v => onChange({ email: v })}
          placeholder="ornek@mail.com" icon={Mail} type="email" />
        <IconInput tm={tm} label={t('phone')} value={data.phone} onUpdate={v => onChange({ phone: v })}
          placeholder="+90 5XX XXX XX XX" icon={Phone} />

        {/* Location - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <IconInput tm={tm} label={t('location')} value={data.location} onUpdate={v => onChange({ location: v })}
            placeholder="İstanbul, Türkiye" icon={MapPin} />
        </div>

        {/* LinkedIn + GitHub */}
        <IconInput tm={tm} label="LinkedIn" value={data.linkedin} onUpdate={v => onChange({ linkedin: v })}
          placeholder="linkedin.com/in/..." icon={Linkedin} />
        <IconInput tm={tm} label="GitHub" value={data.github} onUpdate={v => onChange({ github: v })}
          placeholder="github.com/..." icon={Github} />

        {/* Website - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <IconInput tm={tm} label={t('website')} value={data.website} onUpdate={v => onChange({ website: v })}
            placeholder="aydinaydmr.com.tr" icon={Globe} />
        </div>

        {/* Summary - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="cvl" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <AlignLeft size={11} /> {t('summary')}
          </label>
          <textarea
            value={data.summary}
            onChange={e => onChange({ summary: e.target.value })}
            placeholder={t('summary_placeholder')}
            rows={4}
            className="cvi"
            style={{ paddingLeft: '12px' }}
          />
          {/* Word count + tip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
            <p style={{ fontSize: '11px', color: tm }}>
              {t('summary_tip')}
            </p>
            <span style={{ fontSize: '11px', color: data.summary.length > 50 ? ACCENT : tm, fontWeight: 600 }}>
              {data.summary.length} {t('chars')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
