# Timeline Desember 2026 — Non-Aktif Layanan Media Komunikasi PBNU

Aplikasi Gantt Chart interaktif & kolaboratif berbasis web untuk mengawal proses transisi dan non-aktif layanan media komunikasi PBNU selama bulan **Desember 2026 (21 Hari Kerja)** sesuai dengan regulasi ketenagakerjaan (**PP No. 35 Tahun 2021**) dan peraturan organisasi (**Perkum PBNU**).

---

## 🚀 Fitur Utama

1. **Sinkronisasi Database Real-time (Multi-User Collaboration)**
   - Terintegrasi dengan database cloud **Supabase (PostgreSQL Real-time)**.
   - Perubahan status tugas, rentang tanggal, PIC, hasil deliverable, atau catatan oleh seorang anggota tim langsung tampil secara live di layar anggota tim lainnya tanpa perlu refresh.
   - Dilengkapi fallback penyimpanan otomatis di browser (`localStorage`) jika sedang offline.

2. **Kalkulator Kepatuhan Regulasi Otomatis (PP 35/2021 & Dewan Pers)**
   - Badge kepatuhan otomatis menghitung sisa hari kerja dari tanggal terbitnya Surat Layoff ke 31 Desember 2026.
   - Peringatan dinamis jika jendela waktu kurang dari 14 Hari Kerja efektif.

3. **Gantt Chart Interaktif 31 Hari (Desember 2026)**
   - Pemetaan otomatis hari libur nasional & cuti bersama (24–25 Desember 2026) dan akhir pekan.
   - Klik tanggal langsung pada tabel kalender untuk menggeser durasi tugas.
   - Klik status untuk rotasi cepat: *Belum* → *Proses* → *Selesai*.
   - Edit inline hasil/deliverable langsung di tabel.

4. **Filter Berdasarkan Jalur Kerja (Track)**
   - SK & Tim Transisi
   - Legal & Perkum
   - SDM & Layoff
   - BAST & Exit

5. **Ekspor & Cetak**
   - Ekspor data timeline ke format **CSV** sekali klik.
   - Tampilan ramah cetak (**Print / PDF**) dengan mode landscape rapi.

---

## 🛠️ Cara Memasang Database Kolaborasi (Supabase)

Aplikasi ini dapat langsung dipakai bersama tim menggunakan Supabase (Gratis & Real-time):

### Langkah 1: Buat Tabel di Supabase
1. Masuk ke [Supabase Dashboard](https://supabase.com) dan buat proyek baru (atau gunakan proyek yang ada).
2. Buka menu **SQL Editor** di sidebar kiri.
3. Buka file [`schema.sql`](schema.sql) pada repositori ini, salin seluruh isinya, tempel ke SQL Editor Supabase, lalu klik **Run**.
4. Skrip tersebut akan membuat tabel `pbnu_timeline_tasks`, mengaktifkan publikasi real-time, dan mengisikan 12 tugas default.

### Langkah 2: Hubungkan ke Aplikasi
1. Di Supabase, buka menu **Project Settings** → **API**.
2. Salin **Project URL** dan **anon public key**.
3. Buka timeline di browser, lalu klik tombol **Database Kolaborasi** di pojok kanan atas.
4. Masukkan URL dan anon key Anda, lalu klik **Hubungkan & Sinkronkan**.
5. Indikator di pojok kiri atas akan berubah menjadi **🟢 DB Terhubung (Real-time)**.
6. Bagikan link website kepada tim Anda — sekarang semua orang bisa mengupdate timeline ini bersama!

> 💡 **Tips**: Anda juga bisa mengisi kredensial langsung pada file [`config.js`](config.js) agar tim tidak perlu memasukkan key secara manual saat pertama kali membuka web.

---

## 💻 Menjalankan Server Lokal (Opsional)

Jika ingin menjalankan aplikasi secara mandiri di komputer lokal atau server internal:

```bash
# 1. Jalankan server (Zero-dependency, modul bawaan Node.js)
node server.js

# 2. Buka browser di:
http://localhost:3000
```

Database lokal akan otomatis tersimpan dalam format JSON pada folder `data/tasks.json`.

---

## 🌐 Menjalankan di GitHub Pages

Repositori ini siap di-host langsung secara gratis di GitHub Pages:

1. Buka repositori di GitHub: `https://github.com/masizull/timeline-pbnu-desember2026`
2. Masuk ke tab **Settings** → **Pages**.
3. Pada bagian **Build and deployment**, pilih branch `main` dan folder `/ (root)`.
4. Klik **Save**.
5. Aplikasi akan aktif di:  
   👉 **`https://masizull.github.io/timeline-pbnu-desember2026/`**

---

## 📋 Struktur Berkas Repositori

```
├── index.html       # Antarmuka web utama + Gantt chart + Supabase Real-time client
├── config.js        # Konfigurasi default database Supabase
├── schema.sql       # Skrip SQL tabel, RLS policy, dan data seed untuk Supabase
├── server.js        # Server backend mandiri Node.js (REST API & Local File DB)
├── package.json     # Konfigurasi proyek & skrip npm
├── .gitignore       # Berkas yang diabaikan Git
└── README.md        # Dokumentasi lengkap proyek
```

---

## ⚖️ Acuan Hukum & Regulasi
- **PP No. 35 Tahun 2021**: Pemberitahuan PHK minimal 14 hari kerja sebelum tanggal efektif.
- **Peraturan Dewan Pers No. 03/2019**: Standar perusahaan pers dan verifikasi media.
- **Perkum PBNU No. 07, 08, 16, & 19**: Tata kelola administrasi, perangkat perkumpulan, dan badan usaha NU.
- **SKB 3 Menteri Libur Nasional 2026**: Penetapan libur & cuti bersama Desember 2026.
