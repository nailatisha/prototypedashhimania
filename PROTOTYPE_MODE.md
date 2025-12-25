# Prototype Mode - CSV Data

Dashboard ini sekarang berjalan dalam **mode prototype** yang membaca data dari file CSV lokal, **tanpa perlu koneksi ke Google Sheets API**.

## ✅ Keuntungan Prototype Mode

- ✅ **Tidak perlu setup Google Sheets API** - langsung jalan
- ✅ **Tidak perlu API key** - tidak ada konfigurasi tambahan
- ✅ **Data tersedia langsung** - file CSV sudah ada di folder `dummy-data/`
- ✅ **Mudah di-edit** - edit langsung file CSV untuk mengubah data
- ✅ **Cocok untuk demo/testing** - cepat dan mudah

## 📁 File CSV yang Digunakan

Dashboard membaca data dari folder `dummy-data/`:

- `income.csv` - Data pendapatan
- `expenses.csv` - Data pengeluaran  
- `budget-allocation.csv` - Alokasi budget
- `cash-flow-summary.csv` - Ringkasan cash flow

## 🚀 Cara Menjalankan

1. **Install dependencies** (jika belum):
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Buka browser**: http://localhost:3000

**Selesai!** Dashboard akan langsung menampilkan data dari CSV files.

## 📝 Mengubah Data

Untuk mengubah data, edit langsung file CSV di folder `dummy-data/`:

1. Buka file CSV (misal: `dummy-data/income.csv`)
2. Edit data sesuai kebutuhan
3. Simpan file
4. Refresh browser (data akan otomatis reload dalam 30 detik)

**Format CSV harus tetap sesuai struktur header yang sudah ada.**

## 🔄 Beralih ke Google Sheets (Production)

Jika ingin menggunakan Google Sheets untuk production:

1. Lihat file `lib/sheets.ts` untuk implementasi Google Sheets API
2. Update `app/api/financial-data/route.ts` untuk menggunakan `fetchIncomeData()` dari `lib/sheets.ts`
3. Setup Google Sheets API key (lihat `SETUP_GUIDE.md`)
4. Buat file `.env.local` dengan API key dan Sheet ID

## ⚙️ Technical Details

- **File Reader**: `lib/csv-reader.ts` - membaca dan parse file CSV
- **API Route**: `app/api/financial-data/route.ts` - menggunakan CSV reader
- **Data Source**: Local file system (folder `dummy-data/`)

Data di-parse di server-side (API route) dan dikirim ke client sebagai JSON.


