# Troubleshooting Guide

## Error: "Failed to fetch financial data"

### Penyebab Utama

1. **File `.env.local` belum dibuat**
   - Buat file `.env.local` di root project
   - Tambahkan 2 baris ini:
     ```
     GOOGLE_SHEETS_API_KEY=your_api_key_here
     GOOGLE_SHEETS_ID=your_sheet_id_here
     ```
   - **Penting**: Restart development server setelah membuat file ini!

2. **API Key belum dikonfigurasi**
   - Dapatkan API key dari [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Google Sheets API"
   - Create API Key di "Credentials"

3. **Sheet ID salah atau tidak ada**
   - Pastikan Sheet ID benar (string antara `/d/` dan `/edit` di URL)
   - Contoh URL: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`
   - Sheet ID: `ABC123XYZ`

4. **Google Sheet belum dipublish**
   - Buka Google Sheet
   - File > Share > Publish to web
   - Klik "Publish"

## Langkah-Langkah Fix

### Step 1: Buat File .env.local

1. Di root folder project, buat file baru bernama `.env.local`
2. Copy isi berikut:

```env
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_ID=your_sheet_id_here
```

3. Ganti `your_api_key_here` dengan API key Anda
4. Ganti `your_sheet_id_here` dengan Sheet ID Anda

### Step 2: Dapatkan Google Sheets API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Enable API:
   - Klik "APIs & Services" > "Library"
   - Cari "Google Sheets API"
   - Klik dan tekan "Enable"
4. Buat API Key:
   - Klik "APIs & Services" > "Credentials"
   - Klik "Create Credentials" > "API Key"
   - Copy API key yang muncul

### Step 3: Dapatkan Sheet ID

1. Buka Google Sheet Anda
2. Lihat URL di browser
3. Copy bagian antara `/d/` dan `/edit`
   - Contoh: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`
   - Sheet ID: `ABC123XYZ`

### Step 4: Publish Google Sheet

1. Di Google Sheet, klik "File" > "Share" > "Publish to web"
2. Pilih "Entire document" atau pilih sheets yang ingin dipublish
3. Format: "Web page"
4. Klik "Publish"

### Step 5: Restart Server

**Sangat Penting!** Setelah membuat `.env.local`:
1. Stop development server (Ctrl+C)
2. Start lagi dengan `npm run dev`

## Error Messages Lainnya

### "Access denied" atau 403 Error
- **Penyebab**: API key tidak valid atau Google Sheets API tidak di-enable
- **Fix**: 
  - Pastikan API key benar
  - Pastikan Google Sheets API sudah di-enable
  - Pastikan sheet sudah dipublish

### "Sheet not found" atau 404 Error
- **Penyebab**: Sheet ID salah atau sheet tidak dipublish
- **Fix**:
  - Cek Sheet ID di `.env.local`
  - Pastikan sheet sudah dipublish (File > Share > Publish to web)
  - Pastikan nama sheet tabs benar: `Income`, `Expenses`, `Budget Allocation`

### "GOOGLE_SHEETS_API_KEY is not configured"
- **Penyebab**: Variable environment belum di-set
- **Fix**: Pastikan `.env.local` ada dan berisi `GOOGLE_SHEETS_API_KEY`

### "GOOGLE_SHEETS_ID is not configured"
- **Penyebab**: Variable environment belum di-set
- **Fix**: Pastikan `.env.local` ada dan berisi `GOOGLE_SHEETS_ID`

## Checklist Setup

- [ ] Node.js 18+ terinstall
- [ ] Dependencies sudah di-install (`npm install`)
- [ ] File `.env.local` sudah dibuat
- [ ] `GOOGLE_SHEETS_API_KEY` sudah diisi di `.env.local`
- [ ] `GOOGLE_SHEETS_ID` sudah diisi di `.env.local`
- [ ] Google Sheets API sudah di-enable di Google Cloud Console
- [ ] API Key sudah dibuat di Google Cloud Console
- [ ] Google Sheet sudah dipublish (File > Share > Publish to web)
- [ ] Development server sudah di-restart setelah membuat `.env.local`

## Masih Error?

1. Cek console browser (F12) untuk error details
2. Cek terminal/console untuk error dari server
3. Pastikan semua checklist di atas sudah ✅
4. Coba clear cache browser dan restart server
5. Pastikan tidak ada typo di `.env.local` (tidak ada spasi di `=`)

## Tips

- Jangan commit `.env.local` ke git (sudah ada di .gitignore)
- Pastikan tidak ada spasi sebelum/setelah `=` di `.env.local`
- Setiap kali ubah `.env.local`, restart server
- Gunakan Sheet ID dari URL, bukan nama file


