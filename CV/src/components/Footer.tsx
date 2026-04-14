import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#1F2937] border-[#4B5563]' 
        : 'bg-[#F8F9FA] border-[#E2E8F0]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className={`text-sm text-center md:text-left ${
            theme === 'dark' ? 'text-[#9CA3AF]' : 'text-[#6C757D]'
          }`}>
            {t('footer_copyright')}
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/aydinaydmr"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#9CA3AF] hover:text-[#22D3EE]' 
                  : 'text-[#6C757D] hover:text-[#0062cc]'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            
            <a
              href="https://github.com/cyberQbit"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#9CA3AF] hover:text-[#22D3EE]' 
                  : 'text-[#6C757D] hover:text-[#0062cc]'
              }`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <a
              href="mailto:aydinaydmr@proton.me"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 hover:scale-110 ${
                theme === 'dark' 
                  ? 'text-[#9CA3AF] hover:text-[#22D3EE]' 
                  : 'text-[#6C757D] hover:text-[#0062cc]'
              }`}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            
            <span className={theme === 'dark' ? 'text-[#4B5563]' : 'text-[#E2E8F0]'}>|</span>
            
            <a
              href="https://github.com/sponsors/cyberQbit"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#111827] to-[#0369a1] text-white border border-[#22D3EE] hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                  : 'bg-gradient-to-r from-[#0062cc] to-[#004c9e] text-white hover:shadow-[0_0_15px_rgba(0,98,204,0.4)]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span>Sponsor</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
