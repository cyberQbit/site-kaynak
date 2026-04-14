import { useState } from 'react';
import { Link2, Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import type { CVData } from '../../types/cv';

interface LinkedInImportProps {
  onImport: (data: Partial<CVData>) => void;
}

// LinkedIn profil verilerini çekme fonksiyonu
async function scrapeLinkedInProfile(url: string): Promise<Partial<CVData> | null> {
  try {
    // LinkedIn profil URL'sinden kullanıcı adını çıkar
    const usernameMatch = url.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
    if (!usernameMatch) return null;
    
    // Kullanıcı adı çıkarıldı - gerçek API entegrasyonunda kullanılabilir
    // const username = usernameMatch[1];
    
    // Proxy/Scraper API kullanarak LinkedIn verisi çek
    // Seçenek 1: RapidAPI LinkedIn Scraper
    // Seçenek 2: ScrapingBee API
    // Seçenek 3: Kendi proxy sunucunuz
    
    // Şu an için demo amaçlı basit bir simülasyon yapıyoruz
    // Gerçek uygulamada aşağıdaki API'lerden biri kullanılabilir:
    
    /* 
    // Örnek: RapidAPI LinkedIn Data Scraper
    const response = await fetch(`https://linkedin-data-scraper.p.rapidapi.com/profile?username=${username}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'linkedin-data-scraper.p.rapidapi.com'
      }
    });
    const data = await response.json();
    */
    
    // Demo veri döndür (gerçek API entegrasyonu için yukarıdaki kod kullanılabilir)
    return null; // API entegrasyonu yapılana kadar null döndür
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return null;
  }
}

export function LinkedInImport({ onImport }: LinkedInImportProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleImport = async () => {
    if (!linkedinUrl.trim()) {
      setStatus({
        type: 'error',
        message: 'Lütfen LinkedIn profil URL\'nizi girin.',
      });
      return;
    }

    // URL doğrulama
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinRegex.test(linkedinUrl)) {
      setStatus({
        type: 'error',
        message: 'Geçerli bir LinkedIn profil URL\'si girin. Örn: linkedin.com/in/ad-soyad',
      });
      return;
    }

    setIsLoading(true);
    setStatus({
      type: 'info',
      message: 'LinkedIn profili taranıyor... Bu işlem birkaç saniye sürebilir.',
    });

    try {
      // LinkedIn'den veri çekme denemesi
      const profileData = await scrapeLinkedInProfile(linkedinUrl);
      
      if (profileData && profileData.personalInfo) {
        onImport(profileData);
        setStatus({
          type: 'success',
          message: `LinkedIn profili başarıyla içe aktarıldı! Hoş geldin, ${profileData.personalInfo.fullName || 'Kullanıcı'}!`,
        });
      } else {
        // API entegrasyonu olmadığı için kullanıcıya bilgi ver
        setStatus({
          type: 'error',
          message: 'LinkedIn API entegrasyonu aktif değil. Verileri manuel olarak girebilirsiniz.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'LinkedIn verisi çekilemedi. Lütfen bilgilerinizi manuel olarak girin.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Link2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">LinkedIn'den İçe Aktar</h3>
          <p className="text-sm text-gray-600">Profil bilgilerinizi otomatik olarak çekin</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/kullaniciadi"
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          />
          <button
            onClick={handleImport}
            disabled={isLoading}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                İşleniyor...
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
            className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : status.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
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

        <div className="flex items-start gap-2 text-xs text-gray-500 bg-white/50 p-3 rounded-lg">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong>Not:</strong> LinkedIn API entegrasyonu için RapidAPI veya benzeri bir servis gereklidir.
              Profilinizin herkese açık (public) olması gerekir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
