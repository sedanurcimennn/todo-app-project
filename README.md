# ✨ Todo App

Modern, responsive ve kullanıcı dostu bir Todo uygulaması. React, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

### Temel Özellikler
- ✅ **Todo Ekleme**: Yeni görevler ekleyebilirsiniz
- ✅ **Todo Silme**: İstediğiniz görevleri silebilirsiniz
- ✅ **Tamamlandı İşaretleme**: Görevleri tamamlandı olarak işaretleyebilirsiniz
- 🏷️ **Kategori Sistemi**: Görevleri kategorilere ayırabilirsiniz
  - 🏠 Ev
  - 💼 İş
  - 👤 Kişisel
  - 🛒 Alışveriş
  - 🏥 Sağlık
  - 📚 Eğitim
  - 📝 Diğer
- 📅 **Deadline (Son Tarih)**: Görevlere son tarih ekleyebilirsiniz
  - Akıllı tarih gösterimi (Bugün, Yarın, X gün kaldı, Geçti)
  - Renkli uyarılar (kırmızı: geçti, turuncu: bugün, sarı: yakında)
- 🔍 **Gelişmiş Filtreleme**: 
  - Durum: Tümü / Aktif / Tamamlanan
  - Kategori: Tümü / Ev / İş / Kişisel / Alışveriş / Sağlık / Eğitim / Diğer
- 💾 **LocalStorage**: Tüm görevleriniz tarayıcıda kalıcı olarak saklanır
- 📱 **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlarda mükemmel görünüm
- 🌙 **Dark Mode**: Otomatik karanlık tema desteği

### Teknik Özellikler
- ⚛️ **React 18** - Modern React hooks kullanımı
- 📘 **TypeScript** - Tip güvenliği ve geliştirici deneyimi
- 🎨 **Tailwind CSS 4.x** - Utility-first CSS framework
- 🏗️ **Clean Component Yapısı** - Modüler ve bakımı kolay kod
- 🪝 **Custom Hooks** - `useLocalStorage` ile state yönetimi
- 🎯 **useMemo** - Performans optimizasyonu

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Build'i önizle
npm run preview
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── TodoForm.tsx    # Todo ekleme formu (kategori + deadline)
│   ├── TodoItem.tsx    # Tek bir todo öğesi (kategori + deadline gösterimi)
│   ├── TodoList.tsx    # Todo listesi
│   └── FilterButtons.tsx # Durum filtre butonları
├── hooks/              # Custom hooks
│   └── useLocalStorage.ts # LocalStorage hook'u
├── types/               # TypeScript tip tanımları
│   └── todo.ts         # Todo, Category, FilterType tipleri
├── App.tsx              # Ana uygulama bileşeni
├── main.tsx             # Uygulama giriş noktası
└── index.css            # Global stiller (Tailwind)
```

## 🎨 Kullanılan Teknolojiler

- **React 18.2.0** - UI kütüphanesi
- **TypeScript 5.2.2** - Tip güvenliği
- **Vite 5.0.8** - Build tool ve dev server
- **Tailwind CSS 4.x** - CSS framework
- **@tailwindcss/vite** - Tailwind Vite eklentisi

## 💡 Kullanım

### Todo Ekleme
1. Üstteki input alanına görevinizi yazın
2. Kategori seçin (Ev, İş, Kişisel, vb.)
3. İsterseniz son tarih (deadline) seçin
4. "Ekle" butonuna tıklayın

### Todo Yönetimi
- **Todo Tamamlama**: Görevin yanındaki daireye tıklayarak tamamlandı olarak işaretleyin
- **Todo Silme**: Görevin üzerine geldiğinizde görünen çöp kutusu ikonuna tıklayın

### Filtreleme
- **Durum Filtresi**: Üstteki filtre butonlarını kullanarak görevleri duruma göre filtreleyin
- **Kategori Filtresi**: Kategori butonlarını kullanarak belirli bir kategorideki görevleri görüntüleyin

### Deadline Özellikleri
- Deadline eklenen görevlerde tarih bilgisi görüntülenir
- **Renk Kodlaması**:
  - 🔴 Kırmızı: Geçmiş tarihli görevler
  - 🟠 Turuncu: Bugün son günü olan görevler
  - 🟡 Sarı: 3 gün içinde sona erecek görevler
  - ⚪ Gri: Daha uzun süreli görevler

## 🔧 Geliştirme

### Component Yapısı
- Her component kendi sorumluluğuna sahip (Single Responsibility Principle)
- Props interface'leri ile tip güvenliği sağlanmış
- Reusable ve modüler yapı

### State Yönetimi
- `useState` ile local state yönetimi
- `useLocalStorage` custom hook'u ile kalıcılık
- `useMemo` ile performans optimizasyonu

### Stil
- Tailwind CSS utility classes
- Dark mode desteği
- Responsive design
- Gradient ve shadow efektleri
- Kategori bazlı renk kodlaması

## 📸 Özellikler

### Kategori Sistemi
- Her kategori için özel renk ve ikon
- Kategori bazlı filtreleme
- Kategori istatistikleri

### Deadline Yönetimi
- Akıllı tarih formatlaması
- Görsel uyarılar
- Geçmiş tarihli görevler için özel gösterim

### Filtreleme
- Çoklu filtre desteği (durum + kategori)
- Gerçek zamanlı filtreleme
- İstatistik gösterimi

## 🚀 Deployment

### Vercel ile Deployment

Bu proje Vercel'de kolayca deploy edilebilir:

#### Yöntem 1: Vercel CLI ile
```bash
# Vercel CLI'yi global olarak yükleyin
npm i -g vercel

# Proje dizininde
vercel

# Production'a deploy etmek için
vercel --prod
```

#### Yöntem 2: GitHub ile (Önerilen)
1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. "Add New Project" butonuna tıklayın
4. GitHub repository'nizi seçin
5. Vercel otomatik olarak Vite projesini algılayacak
6. "Deploy" butonuna tıklayın

Vercel otomatik olarak:
- Build komutunu çalıştıracak (`npm run build`)
- Output directory'yi algılayacak (`dist/`)
- Her push'ta otomatik deploy yapacak

#### Yöntem 3: Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "Add New Project" → "Import Git Repository"
3. Repository'nizi seçin ve import edin
4. Build ayarları otomatik algılanacak
5. Deploy edin

### Diğer Platformlar

Bu projeyi GitHub Pages, Netlify veya herhangi bir static hosting servisine de deploy edebilirsiniz:

```bash
npm run build
```

Build çıktısı `dist/` klasöründe olacaktır.

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

React, TypeScript ve Tailwind CSS ile modern web geliştirme pratikleri kullanılarak geliştirilmiştir.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
