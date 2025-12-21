# Kullanılmayan Dosya Temizleme Sistemi - Implementasyon Dokümantasyonu

## Genel Bakış

Bu dokümantasyon, Electron uygulamasında kullanılmayan dosyaları otomatik olarak temizlemek için geliştirilen sistemin planını ve implementasyon detaylarını içerir.

## Problem

- Uygulama lokal diskte çalışıyor
- Yüklenen içerikler lokal diskte saklanıyor
- Kopya ve kullanılmayan içerikler diski şişiriyor
- Manuel temizlik yapmak pratik değil

## Çözüm Yaklaşımı

### Temel Kararlar

1. **Otomatik Temizlik**: Uygulama açılışlarında otomatik kontrol
2. **Arka Plan İşlemi**: Utility Process kullanarak main process'i bloklamadan çalıştırma
3. **Periyodik Kontrol**: Her N açılışta bir temizlik yapılması
4. **Güvenlik**: Kullanılan dosyaların kesinlikle silinmemesi
5. **Performance**: Uygulama açılışını etkilememesi

## Mimari Tasarım

### Utility Process Kullanımı

Electron'un `utilityProcess` API'si kullanılarak cleanup işlemi ayrı bir process'te çalıştırılıyor. Bu yaklaşımın avantajları:

- Main process'i bloklamaz
- Uygulama kapanırken güvenli şekilde durdurulabilir
- Progress takibi yapılabilir
- Hata durumunda main process etkilenmez

### Kiosk Mod Uyumluluğu

- Uygulama kiosk modunda çalışıyor
- Window minimize/hide edilemiyor
- Uygulama her zaman açık kalıyor
- Bu yüzden temizlik işlemi window durumuna bağlı değil

## Implementasyon Detayları

### 1. Store Schema Güncellemesi

**Dosya**: `store/index.ts`

```typescript
export interface StoreSchema {
  theme: ThemeSchema;
  language: LanguageTypes;
  appLaunchCount: number; // Yeni eklendi
}
```

Açılış sayısını takip etmek için store'a `appLaunchCount` eklendi.

### 2. Cleanup Constants

**Dosya**: `src/workers/cleanup-constants.ts`

Tüm config değerleri bir constants dosyasında toplandı:

- `CLEANUP_LAUNCH_INTERVAL`: Her kaç açılışta bir temizlik yapılacak (varsayılan: 5)
- `CLEANUP_START_DELAY_MS`: Uygulama açıldıktan kaç ms sonra başlatılacak (varsayılan: 60000ms = 60 saniye)
- `CLEANUP_FILE_PROTECTION_SECONDS`: Yeni dosyaları koruma süresi (varsayılan: 3600 saniye = 1 saat)
- `CLEANUP_BATCH_SIZE`: Batch processing için dosya sayısı (varsayılan: 50)
- `CLEANUP_BATCH_DELAY_MS`: Batch'ler arası delay (varsayılan: 100ms)

**Test için önerilen değerler**:
- `CLEANUP_START_DELAY_MS = 1000` (1 saniye)
- `CLEANUP_FILE_PROTECTION_SECONDS = 60` (1 dakika)
- `CLEANUP_LAUNCH_INTERVAL = 1` (her açılışta)

### 3. Cleanup Worker Script

**Dosya**: `src/workers/service-worker.ts` (veya cleanup-unused-files-worker.ts)

Worker script'in görevleri:

1. **Veritabanı Bağlantısı**: Worker kendi veritabanı bağlantısını kurar
2. **Kullanılan Dosyaları Bulma**: 
   - `educationMaterials.contentFileId` kontrolü
   - `educations.coverImageId` kontrolü (null olmayanlar)
3. **Kullanılmayan Dosyaları Tespit Etme**: Kullanılmayan dosyaları filtreler
4. **Race Condition Koruması**: Son N saniye içinde yüklenen dosyaları korur
5. **Batch Processing**: Dosyaları batch'ler halinde siler (performans için)
6. **Progress Reporting**: Main process'e progress bilgisi gönderir

### 4. Cleanup Manager

**Dosya**: `src/workers/cleanup-manager.ts`

Manager'ın görevleri:

1. **Worker Lifecycle Yönetimi**: Worker'ı başlatma ve durdurma
2. **Launch Count Kontrolü**: Store'dan launch count'u kontrol eder
3. **Path Yönetimi**: Development ve production için doğru path'i bulur

### 5. Main Process Entegrasyonu

**Dosya**: `src/main.ts`

```typescript
mainWindow.once('ready-to-show', () => {
  setTimeout(() => {
    if (shouldRunCleanup()) {
      console.log('Starting cleanup worker...');
      startCleanupWorker();
    }
  }, CLEANUP_START_DELAY_MS);
});

app.on('will-quit', () => {
  stopCleanupWorker();
  closeDatabase();
});
```

## Güvenlik Önlemleri

### 1. Kullanılan Dosyaların Korunması

- `educationMaterials.contentFileId` tablosunda kontrol
- `educations.coverImageId` tablosunda kontrol (null değerler hariç)
- Sadece hiçbir yerde referans edilmeyen dosyalar silinir

### 2. Race Condition Koruması

- Son N saniye (varsayılan: 1 saat) içinde yüklenen dosyalar korunur
- Kullanıcı dosya yükledikten sonra henüz ilişkilendirmediği durumlarda dosya korunur

### 3. Hata Yönetimi

- Fiziksel dosya silme hataları loglanır ama işlem devam eder
- Veritabanı hataları loglanır ve worker güvenli şekilde kapanır
- Main process hiçbir zaman worker hatalarından etkilenmez

## Performans Optimizasyonları

### 1. Batch Processing

- Dosyalar batch'ler halinde işlenir (varsayılan: 50 dosya/batch)
- Batch'ler arasında küçük delay vardır (varsayılan: 100ms)
- Disk I/O yükünü azaltır

### 2. Gecikmeli Başlatma

- Uygulama açıldıktan 60 saniye sonra cleanup başlar
- Uygulama açılış performansını etkilemez
- Kullanıcı deneyimini bozmaz

### 3. Periyodik Çalıştırma

- Her 5 açılışta bir çalıştırılır
- Gereksiz işlem yükünden kaçınır
- Yeterli sıklıkta temizlik yapar

## Build Konfigürasyonu

### Electron Forge Config

**Dosya**: `forge.config.ts/index.ts`

Worker dosyası build entry olarak eklendi:

```typescript
{
  entry: 'src/workers/service-worker.ts',
  config: 'vite.worker.config.ts',
  target: 'main',
}
```

### Path Yönetimi

Worker path'i development ve production için dinamik olarak belirlenir:

- **Development**: `__dirname` kullanılır
- **Production**: `app.getAppPath()` kullanılır, farklı lokasyonlar denenir

## Kullanım Senaryoları

### Test Senaryosu

1. Constants dosyasındaki değerleri test için ayarla:
   - `CLEANUP_START_DELAY_MS = 1000`
   - `CLEANUP_FILE_PROTECTION_SECONDS = 60`
   - `CLEANUP_LAUNCH_INTERVAL = 1`

2. Uygulamayı başlat
3. Console'da cleanup loglarını kontrol et
4. Kullanılmayan dosyaların silindiğini doğrula

### Production Senaryosu

1. Constants dosyasındaki değerleri production için ayarla:
   - `CLEANUP_START_DELAY_MS = 60000`
   - `CLEANUP_FILE_PROTECTION_SECONDS = 3600`
   - `CLEANUP_LAUNCH_INTERVAL = 5`

2. Uygulamayı deploy et
3. Her 5 açılışta bir otomatik temizlik yapılır

## Dosya Yapısı

```
src/
  workers/
    cleanup-constants.ts      # Config değerleri
    cleanup-manager.ts         # Worker lifecycle yönetimi
    service-worker.ts          # Cleanup worker script
  main.ts                      # Main process entegrasyonu
  create-window.ts             # Window oluşturma (return eklendi)

store/
  index.ts                     # Store schema (appLaunchCount eklendi)

forge.config.ts/
  index.ts                     # Build config (worker entry eklendi)
```

## Gelecekte Yapılabilecek İyileştirmeler

1. **Soft Delete**: Dosyaları direkt silmek yerine "soft delete" yapıp belirli süre sonra silmek
2. **Disk Kullanım Raporu**: Temizlenen dosyaların toplam boyutunu raporlamak
3. **Kullanıcı Bildirimi**: İsteğe bağlı olarak kullanıcıya temizlik bilgisi vermek
4. **İptal Mekanizması**: Kullanıcı etkileşimi başlarsa cleanup'ı durdurmak (gerekirse)
5. **İstatistikler**: Temizlenen dosya sayısı ve boyutu için loglama

## Notlar

- Cleanup işlemi tamamen arka planda çalışır
- Kullanıcı deneyimini etkilemez
- Uygulama performansını düşürmez
- Güvenli ve güvenilir bir sistemdir

