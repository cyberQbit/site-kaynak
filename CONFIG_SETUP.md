# Portfolio Website - API Configuration Guide

## 🔧 Setup Talimatları

### Contact Form - Web3Forms API Key

Form'u çalıştırmak için Web3Forms'tan free API key almanız gerekir.

#### Adım 1: API Key Alın
1. https://web3forms.com adresine gidin
2. Ücretsiz hesap açın
3. Yeni form (New Form) oluşturun
4. **Access Key**'inizi kopyalayın

#### Adım 2: config.js Dosyasını Düzenleyin
```js
// config.js
const API_CONFIG = {
    web3forms_access_key: 'YOUR_ACCESS_KEY_HERE' // ← Buraya yapıştırın
};
```

#### Adım 3: Test Edin
- Contact Form'u doldurun
- "Gönder" butonuna tıklayın
- Email'iniz Protonmail'e gelecek

---

## 📧 E-Mail Nereye Gider?

- **Form'daki "E-posta" alanı:** Kişinin email'i (reply için)
- **Mesaj alıcısı:** Web3Forms tarafından belirlenir (dashboard'da set edin)

Web3Forms dashboard'da:
1. Your Forms → Email Settings
2. "To Email" kısmına `aydinaydmr@proton.me` yazın
3. Kaydet

---

## 🔐 Güvenlik

- `config.js` `.gitignore`'da bulunur
- GitHub'a yüklenmez (API key gizli kalır)
- Local'de geliştirme için güvenli

---

## ✅ Troubleshooting

| Sorun | Çözüm |
|-------|-------|
| "API key bulunamadı" | config.js'i oluşturup API key ekleyin |
| Form yanıt vermiyor | API key'in doğru olduğunu kontrol edin |
| Email gelmedi | Web3Forms dashboard'da "To Email" set edin |

---

Generated: 13 Mart 2026
