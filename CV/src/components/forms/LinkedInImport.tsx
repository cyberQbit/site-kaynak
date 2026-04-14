import { useState } from 'react';
import { Link2, Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { useTheme } from '../../context/ThemeContext';

interface LinkedInImportProps {
  onImport: (data: Partial<CVData>) => void;
}

async function scrapeLinkedInProfile(url: string): Promise<Partial<CVData> | null> {
  try {
    const usernameMatch = url.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
    if (!usernameMatch) return null;
    return null;
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return null;
  }
}

export function LinkedInImport({ onImport }: LinkedInImportProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      setStatus({
        type: 'error',
        message: 'Lutfen LinkedIn profil URL\'nizi girin.',
      });
      return;
    }

    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(linkedinUrl)) {
      setStatus({
        type: 'error',
        message: 'Gecerli bir LinkedIn profil URL\'si girin. Orn: linkedin.com/in/ad-soyad',
      });
      return;
    }

    setIsLoading(true);
    setStatus({
      type: 'info',
      message: 'LinkedIn profili taraniyor...',
    });

    try {
      const profileData = await scrapeLinkedInProfile(linkedinUrl);
      
      if (profileData && profileData.personalInfo) {
        onImport(profileData);
        setStatus({
          type: 'success',
          message: `LinkedIn profili basariyla ice aktarildi!`,
        });
      } else {
        setStatus({
          type: 'error',
          message: 'LinkedIn API entegrasyonu aktif degil. Verileri manuel olarak girebilirsiniz.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'LinkedIn verisi cekilemedi. Lutfen bilgilerinizi manuel olarak girin.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `flex-1 px-4 py-2.5 border rounded-lg focus:ring-2 transition-all text-sm ${
    isDark
      ? 'bg-[#374151] border-[#4B5563] text-[#F3F4F6] placeholder-[#6B7280] focus:ring-[#22D3EE] focus:border-[#22D3EE]'
      : 'bg-white border-[#E2E8F0] text-[#1A202C] placeholder-[#A0AEC0] focus:ring-[#0062cc] focus:border-[#0062cc]'
  }`;

  return (
    <div className={`p-5 rounded-xl border ${
      isDark
        ? 'bg-gradient-to-br from-[#1F2937] to-[#111827] border-[#22D3EE]/30'
        : 'bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] border-[#0062cc]/30'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isDark ? 'bg-[#22D3EE]' : 'bg-[#0062cc]'
        }`}>
          <Link2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className={`font-semibold ${isDark ? 'text-[#F3F4F6]' : 'text-[#1A202C]'}`}>
            LinkedIn'den Ice Aktar
          </h3>
          <p className={`text-sm ${isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'}`}>
            Profil bilgilerinizi otomatik olarak cekin
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/kullaniciadi"
            className={inputClasses}
          />
          <button
            onClick={handleImport}
            disabled={isLoading}
            className={`px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 ${
              isDark
                ? 'bg-[#22D3EE] hover:bg-[#0BC5EA] text-[#111827]'
                : 'bg-[#0062cc] hover:bg-[#004c9e]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Isleniyor...
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                Aktar
              </>
            )}
          </button>
        </div>

        {status && (
          <div
            className={`flex items-start gap-2 p-3 rounded-lg text-sm border ${
              status.type === 'success'
                ? isDark
                  ? 'bg-green-900/20 text-green-400 border-green-800'
                  : 'bg-green-50 text-green-700 border-green-200'
                : status.type === 'error'
                ? isDark
                  ? 'bg-red-900/20 text-red-400 border-red-800'
                  : 'bg-red-50 text-red-700 border-red-200'
                : isDark
                  ? 'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/30'
                  : 'bg-[#0062cc]/10 text-[#0062cc] border-[#0062cc]/30'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : status.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className={`flex items-start gap-2 text-xs p-3 rounded-lg ${
          isDark
            ? 'bg-[#374151]/50 text-[#9CA3AF]'
            : 'bg-white/50 text-[#4A5568]'
        }`}>
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <p>
              <strong>Not:</strong> LinkedIn API entegrasyonu icin RapidAPI veya benzeri bir servis gereklidir.
              Profilinizin herkese acik (public) olmasi gerekir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
