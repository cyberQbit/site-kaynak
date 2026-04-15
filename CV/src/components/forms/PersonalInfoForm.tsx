import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, FileText } from 'lucide-react';
import type { PersonalInfo } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (info: Partial<PersonalInfo>) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const inputBase = `w-full px-3 py-2 rounded-lg border text-sm transition-colors outline-none focus:ring-2 ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE]/40 focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc]/30 focus:border-[#0062cc]'
  }`;

  const labelBase = `block text-xs font-medium mb-1 ${isDark ? 'text-[#D1D5DB]' : 'text-[#374151]'}`;

  function Field({
    label, value, onChange: onFieldChange, placeholder, icon: Icon, type = 'text', rows,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; icon?: React.FC<{ className?: string }>;
    type?: string; rows?: number;
  }) {
    return (
      <div>
        <label className={labelBase}>{label}</label>
        <div className="relative">
          {Icon && (
            <Icon className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-[#6B7280]' : 'text-[#A0AEC0]'}`} />
          )}
          {rows ? (
            <textarea
              value={value}
              onChange={e => onFieldChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className={`${inputBase} resize-none`}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={e => onFieldChange(e.target.value)}
              placeholder={placeholder}
              className={`${inputBase} ${Icon ? 'pl-8' : ''}`}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <User className={`w-4 h-4 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
        <h3 className={`font-semibold text-sm ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
          {t('personal_info')}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label={t('full_name')} value={data.fullName} onChange={v => onChange({ fullName: v })}
            placeholder="Aydın Aydemir" icon={User} />
        </div>
        <div className="col-span-2">
          <Field label="Ünvan / Pozisyon" value={data.jobTitle} onChange={v => onChange({ jobTitle: v })}
            placeholder="Senior Software Engineer" />
        </div>
        <Field label={t('email')} value={data.email} onChange={v => onChange({ email: v })}
          placeholder="ornek@mail.com" icon={Mail} type="email" />
        <Field label={t('phone')} value={data.phone} onChange={v => onChange({ phone: v })}
          placeholder="+90 5XX XXX XX XX" icon={Phone} />
        <div className="col-span-2">
          <Field label={t('location')} value={data.location} onChange={v => onChange({ location: v })}
            placeholder="İstanbul, Türkiye" icon={MapPin} />
        </div>
        <Field label="LinkedIn" value={data.linkedin} onChange={v => onChange({ linkedin: v })}
          placeholder="linkedin.com/in/..." icon={Linkedin} />
        <Field label="GitHub" value={data.github} onChange={v => onChange({ github: v })}
          placeholder="github.com/..." icon={Github} />
        <div className="col-span-2">
          <Field label={t('website')} value={data.website} onChange={v => onChange({ website: v })}
            placeholder="aydinaydmr.com.tr" icon={Globe} />
        </div>
      </div>

      <div>
        <label className={labelBase}>
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" /> {t('summary')}
          </span>
        </label>
        <textarea
          value={data.summary}
          onChange={e => onChange({ summary: e.target.value })}
          placeholder="5+ yıllık deneyime sahip, React ve Node.js uzmanı yazılım geliştirici. Ölçeklenebilir uygulamalar tasarlar, ekip liderliği deneyimine sahip."
          rows={4}
          className={`${inputBase} resize-none`}
        />
        <p className={`text-xs mt-1 ${isDark ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
          💡 İş ilanındaki anahtar kelimeleri kullanın — ATS skoru yükselir
        </p>
      </div>
    </div>
  );
}
