import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Minimum 2.5 saniye göster
    const minLoadTime = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 2500);

    return () => clearTimeout(minLoadTime);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } ${isDark ? 'bg-[#111827]' : 'bg-[#FDFDFD]'}`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animasyonlu Daire */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full border-4 border-t-transparent animate-spin ${
              isDark ? 'border-[#22D3EE]' : 'border-[#0062cc]'
            }`}
            style={{ animationDuration: '1s' }}
          />
          <div
            className={`absolute inset-0 w-20 h-20 rounded-full border-4 border-b-transparent animate-spin ${
              isDark ? 'border-[#22D3EE]/30' : 'border-[#0062cc]/30'
            }`}
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          />
        </div>

        {/* cyberQbit Yazısı */}
        <div className="flex items-center gap-1">
          {'cyberQbit'.split('').map((letter, index) => (
            <span
              key={index}
              className={`text-2xl font-bold animate-pulse ${
                isDark ? 'text-[#22D3EE]' : 'text-[#0062cc]'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1.5s',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Alt Yazı */}
        <p className={`text-sm animate-pulse ${
          isDark ? 'text-[#9CA3AF]' : 'text-[#4A5568]'
        }`}>
          CV Olusturucu Yukleniyor...
        </p>
      </div>
    </div>
  );
}
