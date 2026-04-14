import { useState } from 'react';
import { User, Mail, Phone, MapPin, Link2, Globe, FileText } from 'lucide-react';
import type { PersonalInfo } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [localData, setLocalData] = useState(data);
  const { theme } = useTheme();
  const { t } = useLanguage();

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange({ [field]: value });
  };

  const isDark = theme === 'dark';

  const inputClasses = `w-full px-4 py-2.5 border rounded-lg focus:ring-2 transition-all text-sm ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE] focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc] focus:border-[#0062cc]'
  }`;

  const labelClasses = `block text-sm font-medium mb-1.5 ${
    isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
  }`;

  const iconClasses = `w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
    isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'
  }`;

  return (
    <div className="space-y-5">
      <h3 className={`text-lg font-semibold flex items-center gap-2 ${
        isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'
      }`}>
        <User className={`w-5 h-5 ${isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'}`} />
        {t('personal_info')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClasses}>{t('full_name')} *</label>
          <div className="relative">
            <User className={iconClasses} />
            <input
              type="text"
              value={localData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder={t('full_name')}
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>{t('email')} *</label>
          <div className="relative">
            <Mail className={iconClasses} />
            <input
              type="email"
              value={localData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="ornek@email.com"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>{t('phone')} *</label>
          <div className="relative">
            <Phone className={iconClasses} />
            <input
              type="tel"
              value={localData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+90 555 123 45 67"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>{t('location')} *</label>
          <div className="relative">
            <MapPin className={iconClasses} />
            <input
              type="text"
              value={localData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Istanbul, Turkiye"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>LinkedIn</label>
          <div className="relative">
            <Link2 className={iconClasses} />
            <input
              type="url"
              value={localData.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/kullaniciadi"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>GitHub</label>
          <div className="relative">
            <Link2 className={iconClasses} />
            <input
              type="text"
              value={localData.github}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/kullaniciadi"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>{t('website')} / Portfoy</label>
          <div className="relative">
            <Globe className={iconClasses} />
            <input
              type="url"
              value={localData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="www.websiteniz.com"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>{t('summary')} *</label>
          <div className="relative">
            <FileText className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-[#9CA3AF]' : 'text-[#A0AEC0]'}`} />
            <textarea
              value={localData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder={t('summary')}
              rows={4}
              className={`${inputClasses} pl-10 resize-none`}
            />
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#9CA3AF]' : 'text-[#6C757D]'}`}>
            ATS sistemlerinin dogru analiz yapabilmesi icin anahtar kelimeler icermesi onemlidir.
          </p>
        </div>
      </div>
    </div>
  );
}
