# 💻 Bilgisayar Toplama Web Sitesi

**Bilgisayar Toplama Sitesi**, kullanıcıların kendi bilgisayarlarını kolayca oluşturmalarını sağlayan etkileşimli bir web uygulamasıdır.
Bu projede kullanıcı, işlemci, anakart, RAM, ekran kartı ve diğer parçaları seçerek uyumlu bir sistem toplayabilir.

---

## Amaç

* Bilgisayar bileşenlerini tek sayfada görüntülemek
* Parçaları seçerek sistem oluşturmayı kolaylaştırmak
* Uyumlu parçalar arasında seçim yapılmasını sağlamak
* Kullanıcıya toplam fiyat ve yapı özeti sunmak

---

## Kullanılan Teknolojiler

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

---

## Proje Yapısı

```bash
bilgisayar-toplama/
├── app/
├── components/
├── data/
├── public/
├── types/
├── package.json
├── next.config.ts
└── README.md
```

---

## Kurulum ve Çalıştırma

1. Depoyu klonla:

   ```bash
   git clone https://github.com/utkuilbas/bilgisayar-toplama.git
   cd bilgisayar-toplama
   ```

2. Gerekli bağımlılıkları yükle:

   ```bash
   npm install
   # veya
   yarn install
   ```

3. Geliştirme sunucusunu başlat:

   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. Tarayıcıda aç:

   ```
   http://localhost:3000
   ```

---

## Kullanım

* Sayfa yüklendiğinde tüm bilgisayar bileşenleri listelenir.
* Her kategori (işlemci, anakart, RAM, ekran kartı vb.) tek bir kart şeklinde gösterilir.
* Kullanıcı, istediği bileşenleri seçtikçe toplam sistem fiyatı ve uyumluluk bilgisi güncellenir.
* Tüm seçimler aynı sayfada yapılır (Single Page App).

---

## Lisans

Bu proje eğitim amaçlı olarak geliştirilmiştir. Kod yapısını inceleyebilir ve kendi projelerinizde referans olarak kullanabilirsiniz.
