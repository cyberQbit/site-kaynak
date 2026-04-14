import { useState } from 'react';
import { User, Mail, Phone, MapPin, Link2, Globe, FileText } from 'lucide-react';
import type { PersonalInfo } from '../../types/cv';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: Partial<PersonalInfo>) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [localData, setLocalData] = useState(data);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange({ [field]: value });
  };

  const inputClasses = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";
  const iconClasses = "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2";

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        Kişisel Bilgiler
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClasses}>Ad Soyad *</label>
          <div className="relative">
            <User className={iconClasses} />
            <input
              type="text"
              value={localData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="örn: Ahmet Yılmaz"
              className={`${inputClasses} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>E-posta *</label>
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
          <label className={labelClasses}>Telefon *</label>
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
          <label className={labelClasses}>Konum *</label>
          <div className="relative">
            <MapPin className={iconClasses} />
            <input
              type="text"
              value={localData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="örn: İstanbul, Türkiye"
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
          <label className={labelClasses}>Web Sitesi / Portföy</label>
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
          <label className={labelClasses}>Profesyonel Özet *</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <textarea
              value={localData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Kendinizi ve kariyer hedeflerinizi kısaca tanımlayın..."
              rows={4}
              className={`${inputClasses} pl-10 resize-none`}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            ATS sistemlerinin doğru analiz yapabilmesi için anahtar kelimeler içermesi önemlidir.
          </p>
        </div>
      </div>
    </div>
  );
}
