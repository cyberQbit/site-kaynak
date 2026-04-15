<div align="center">

# 🌐 aydinaydmr.com.tr

**Aydın 'cyberQbit' Aydemir** — Kişisel Portfolyo & CV Oluşturucu

[![Canlı Site](https://img.shields.io/badge/🌍%20Canlı%20Site-aydinaydmr.com.tr-22D3EE?style=for-the-badge)](https://aydinaydmr.com.tr)
[![GitHub Pages](https://img.shields.io/badge/Barındırma-GitHub%20Pages-181717?style=for-the-badge&logo=github)](https://github.com/cyberQbit/site-kaynak)
[![PWA](https://img.shields.io/badge/PWA-Destekleniyor-5A0FC8?style=for-the-badge&logo=pwa)](https://aydinaydmr.com.tr)
[![Lisans](https://img.shields.io/badge/Lisans-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Yığını](#️-teknoloji-yığını)
- [Dosya Yapısı](#-dosya-yapısı)
- [CV Oluşturucu](#-cv-oluşturucu)
- [Yerel Geliştirme](#️-yerel-geliştirme)
- [Dağıtım](#-dağıtım)
- [Projeler](#-projeler)

---

## 🚀 Proje Hakkında

Bu depo, **[aydinaydmr.com.tr](https://aydinaydmr.com.tr)** adresindeki kişisel portfolyo sitesinin tüm kaynak kodlarını barındırmaktadır. Site; projelerimi sergilemek, iş deneyimimi ve teknik becerilerimi paylaşmak amacıyla geliştirilmiştir.

| Alan | Detay |
|------|-------|
| 🌍 Canlı Adres | [aydinaydmr.com.tr](https://aydinaydmr.com.tr) |
| ☁️ Barındırma | GitHub Pages |
| 🔗 Alan Adı | Custom CNAME + DNS A Records |
| 📱 PWA | Service Worker ile çevrimdışı destek |
| 🌐 Çoklu Dil | Türkçe, İngilizce, İspanyolca |

---

## ✨ Özellikler

### Ana Site
- **Responsive Tasarım** — Tüm ekran boyutlarına uyumlu, mobil öncelikli yapı
- **Karanlık / Aydınlık Tema** — Kullanıcı tercihi localStorage'da saklanır
- **Çoklu Dil Desteği** — TR / EN / ES geçişi, tüm metinler `data-key` ile yönetilir
- **PWA Desteği** — Service Worker (`sw.js`) ile önbellekleme ve çevrimdışı çalışma
- **Typing Animasyonu** — İsim animasyonu ile dinamik giriş
- **İnteraktif Terminal** — `help`, `about`, `projects`, `skills` komutlarını destekleyen tarayıcı içi terminal
- **Beceri Radar Grafiği** — SVG tabanlı animasyonlu radar chart
- **Scroll İlerleme Çubuğu** — Sayfa üstünde ilerleyen çubuk + scroll-to-top butonu
- **İletişim Formu** — reCAPTCHA doğrulamalı, e-posta gönderme entegrasyonu
- **Open Graph & Twitter Card** — Sosyal medya paylaşımları için meta tag desteği
- **SEO Optimizasyonu** — Structured meta description, title tag yönetimi

### CV Oluşturucu (`/CV-olustur/`)
> Tam özellik listesi için [CV Oluşturucu](#-cv-oluşturucu) bölümüne bakın.

---

## 🛠️ Teknoloji Yığını

### Ana Site
| Katman | Teknoloji |
|--------|-----------|
| İşaretleme | HTML5 (semantic) |
| Stil | CSS3, CSS Variables, Flexbox, Grid |
| Davranış | Vanilla JavaScript (ES6+) |
| İkonlar | Lucide Icons, Font Awesome 6 |
| Fontlar | Google Fonts |
| PWA | Service Worker API, Web App Manifest |
| Barındırma | GitHub Pages |

### CV Oluşturucu
| Katman | Teknoloji |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| PDF Üretimi | jsPDF (gerçek metin tabanlı, ATS uyumlu) |
| İkonlar | Lucide React |
| Stil | Tailwind CSS |
| Veri Kalıcılığı | localStorage |

---

## 📁 Dosya Yapısı

```
site-kaynak/
│
├── index.html                  # Ana sayfa
├── privacypolicy.html          # Gizlilik politikası (CepteKabin)
├── offline.html                # PWA çevrimdışı yedek sayfası
├── sw.js                       # Service Worker (cache-v4)
├── manifest.json               # PWA manifest
├── CNAME                       # GitHub Pages özel alan adı
├── A.ico                       # Favicon
│
├── css/
│   ├── style.css               # Ana stil dosyası
│   └── _responsive.css         # Medya sorguları (480px → 1200px)
│
├── js/
│   └── script.js               # Tüm etkileşimler, i18n, animasyonlar
│
├── images/
│   ├── profile_placeholder.webp
│   └── icons/
│       ├── icon-192x192.png
│       └── icon-512x512.png
│
└── CV-olustur/                 # ATS Uyumlu CV Oluşturucu (React SPA)
    ├── index.html
    ├── manifest.json
    ├── sw.js
    ├── favicon.svg
    └── assets/
        ├── index-*.js          # Bundle (Vite çıktısı)
        └── index-*.css
```

### CV Kaynak Kodu (`CV/` dizini)

```
CV/
├── index.html
├── package.json
└── src/
    ├── App.tsx                             # Ana uygulama, sekme navigasyonu
    ├── main.tsx
    ├── index.css
    │
    ├── types/
    │   └── cv.ts                           # CVData, Experience, Skill vb. tipler
    │
    ├── hooks/
    │   └── useCV.ts                        # Tüm CRUD + localStorage kalıcılığı
    │
    ├── utils/
    │   ├── pdfGenerator.ts                 # jsPDF tabanlı ATS uyumlu PDF üretici
    │   └── atsScore.ts                     # ATS uyum skoru hesaplama (100 puan)
    │
    ├── context/
    │   ├── ThemeContext.tsx
    │   └── LanguageContext.tsx             # TR / EN / ES çeviri sistemi
    │
    └── components/
        ├── ATSScorePanel.tsx               # Canlı ATS skor göstergesi
        │
        ├── forms/
        │   ├── PersonalInfoForm.tsx        # Kişisel bilgiler + ünvan
        │   ├── ExperienceForm.tsx          # İş deneyimi (tam düzenlenebilir + bullet)
        │   ├── EducationForm.tsx           # Eğitim (tam düzenlenebilir + GPA)
        │   ├── SkillsForm.tsx             # Yetenekler (kategoriler + hızlı öneriler)
        │   ├── CertificatesAndLanguages.tsx # Sertifikalar + Dil seviyeleri
        │   ├── GitHubProjectsForm.tsx      # GitHub API repo seçici
        │   └── TemplateSelector.tsx        # CV şablon seçimi
        │
        └── preview/
            ├── CVPreview.tsx               # A4 önizleme bileşeni (tüm şablonlar)
            └── CVPreviewPanel.tsx          # Panel: PDF indir, yazdır, önizle
```

---

## 📄 CV Oluşturucu

`/CV-olustur/` altında çalışan, **React + TypeScript** ile geliştirilmiş tam işlevli bir SPA.

### Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| ✅ **Gerçek ATS Uyumlu PDF** | `jsPDF` ile saf metin PDF — ATS tarayıcıları içeriği doğrudan okur |
| ✅ **Canlı Önizleme** | Değiştikçe A4 formatında anlık güncellenen önizleme |
| ✅ **3 CV Şablonu** | Classic (lacivert), Modern (mavi), Minimal (sade) |
| ✅ **ATS Skor Paneli** | 100 üzerinden 5 kategoride canlı uyum skoru + ipuçları |
| ✅ **localStorage Kalıcılığı** | Sayfa yenilemede veriler korunur |
| ✅ **Tam Düzenlenebilir Formlar** | Tüm iş/eğitim kayıtları kalem butonuyla inline düzenlenebilir |
| ✅ **Bullet Point Sistemi** | Her iş deneyimine madde listesi eklenebilir |
| ✅ **Yetenek Kategorileri** | Teknik / Programlama / Soft Skills + hızlı öneri butonları |
| ✅ **Sertifikalar** | Kurum, tarih bilgisiyle sertifika ekleme |
| ✅ **Dil Seviyeleri** | A1–C2 ve Anadil desteği |
| ✅ **GitHub Entegrasyonu** | GitHub API ile repo listesi, seçim ve özel açıklama |
| ✅ **Mobil Önizleme** | Mobilde "Önizle" butonu ile tam ekran overlay |
| ✅ **Çoklu Dil** | TR / EN / ES arayüz desteği |
| ✅ **Sıfırlama Butonu** | Tüm verileri ve önbelleği temizler |

### CV Bölümleri

```
Kişisel → Deneyim → Eğitim → Yetenekler → Ekstralar → GitHub → ATS
```

### PDF Neden Gerçekten ATS Uyumlu?

Eski `html2canvas` yaklaşımı sayfayı **görüntüye** dönüştürüyordu — ATS sistemleri bu PDF'lerdeki metni okuyamazken yeni sistem `jsPDF` ile **gerçek metin nesneleri** gömer. İşe başvuru tarayıcıları içeriği doğrudan parse edebilir.

### CV Oluşturucu — Yerel Geliştirme

```bash
cd CV
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ klasörüne derle
```

> Derlenen çıktı `CV-olustur/assets/` klasörüne kopyalanarak siteyle birlikte deploy edilir.

---

## ⚙️ Yerel Geliştirme

### Ana Site

```bash
# Repoyu klonla
git clone https://github.com/cyberQbit/site-kaynak.git
cd site-kaynak

# index.html'i doğrudan tarayıcıda aç
# veya VS Code Live Server ile çalıştır
```

> Ana site saf HTML/CSS/JS ile yazıldığından herhangi bir build adımı gerektirmez.

### CV Oluşturucu

```bash
cd CV
npm install
npm run dev
```

---

## 🚀 Dağıtım

Bu repo **GitHub Pages** üzerinde barındırılmaktadır. `main` branch'ına yapılan her `push` otomatik olarak canlıya alınır.

```
main branch'a push
       ↓
GitHub Pages otomatik deploy
       ↓
aydinaydmr.com.tr canlıya alınır
```

**Alan adı yapılandırması:**
- `CNAME` dosyası → `aydinaydmr.com.tr`
- DNS: GitHub'ın IP adresleri ile A kaydı
- HTTPS: GitHub Pages üzerinden otomatik SSL

**Service Worker Cache Güncelleme:**

`sw.js` içindeki `CACHE_NAME` değişkenindeki sürüm numarasını artırmak yeni içeriklerin kullanıcılara ulaşmasını sağlar:

```js
const CACHE_NAME = 'aydin-portfolio-cache-v5'; // v4 → v5
```

---

## 🗂️ Projeler

Sitede sergilenen projeler:

| Proje | Teknoloji | Link |
|-------|-----------|------|
| **CepteKabin** | Kotlin, C#, Mobile | [github.com/cyberQbit/CepteKabin](https://github.com/cyberQbit/CepteKabin) |
| **MooWeather-Mobile** | Flutter, Dart | [github.com/cyberQbit/MooWeather-Mobile](https://github.com/cyberQbit/MooWeather-Mobile) |
| **MooWeather-BackEnd** | C#, .NET Core, JWT REST API | [github.com/cyberQbit/MooWeather-BackEnd](https://github.com/cyberQbit/MooWeather-BackEnd) |
| **SwiftHub** | Batchfile, PowerShell | [github.com/cyberQbit/SwiftHub](https://github.com/cyberQbit/SwiftHub) |
| **CV Oluşturucu** | React, TypeScript, jsPDF | [aydinaydmr.com.tr/CV-olustur](https://aydinaydmr.com.tr/CV-olustur/) |

---

## 📬 İletişim

- 🌐 Website: [aydinaydmr.com.tr](https://aydinaydmr.com.tr)
- 💼 LinkedIn: [linkedin.com/in/aydinaydmr](https://linkedin.com/in/aydinaydmr)
- 🐙 GitHub: [github.com/cyberQbit](https://github.com/cyberQbit)

---

<div align="center">
  <sub>© 2026 <strong>Aydın 'cyberQbit' Aydemir</strong> — Tüm hakları saklıdır.</sub>
</div>
