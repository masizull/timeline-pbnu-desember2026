-- ====================================================================
-- SKRIP DATABASE SUPABASE / POSTGRESQL
-- Proyek: Timeline Desember 2026 — Non-Aktif Layanan Media Komunikasi PBNU
-- ====================================================================

-- 1. Buat Tabel pbnu_timeline_tasks
CREATE TABLE IF NOT EXISTS pbnu_timeline_tasks (
  id TEXT PRIMARY KEY,
  track TEXT NOT NULL,
  title TEXT NOT NULL,
  result TEXT,
  pic TEXT,
  start INT NOT NULL CHECK (start >= 1 AND start <= 31),
  end_day INT NOT NULL CHECK (end_day >= 1 AND end_day <= 31),
  status TEXT NOT NULL DEFAULT 'Belum' CHECK (status IN ('Belum', 'Proses', 'Selesai')),
  note TEXT,
  is_layoff_gate BOOLEAN DEFAULT FALSE,
  order_idx INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Aktifkan Real-time Subscription untuk Kolaborasi Live
-- (Agar perubahan yang dilakukan satu pengguna langsung tampil di layar pengguna lain)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'pbnu_timeline_tasks'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE pbnu_timeline_tasks;
  END IF;
END $$;

-- 3. Konfigurasi Row Level Security (RLS)
-- Mengizinkan pembacaan dan pembaruan bersama untuk tim
ALTER TABLE pbnu_timeline_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public select pbnu_timeline_tasks" ON pbnu_timeline_tasks;
CREATE POLICY "Public select pbnu_timeline_tasks" 
ON pbnu_timeline_tasks FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Public insert pbnu_timeline_tasks" ON pbnu_timeline_tasks;
CREATE POLICY "Public insert pbnu_timeline_tasks" 
ON pbnu_timeline_tasks FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Public update pbnu_timeline_tasks" ON pbnu_timeline_tasks;
CREATE POLICY "Public update pbnu_timeline_tasks" 
ON pbnu_timeline_tasks FOR UPDATE 
USING (true);

DROP POLICY IF EXISTS "Public delete pbnu_timeline_tasks" ON pbnu_timeline_tasks;
CREATE POLICY "Public delete pbnu_timeline_tasks" 
ON pbnu_timeline_tasks FOR DELETE 
USING (true);

-- 4. Masukkan Data Default 12 Tugas Desember 2026 (Jika tabel masih kosong)
INSERT INTO pbnu_timeline_tasks (id, track, title, result, pic, start, end_day, status, note, is_layoff_gate, order_idx)
VALUES
  ('t1', 'SK & Tim Transisi', 'Draft SK Non-Aktif & Ajuan Ketua PBNU', 'Draft SK', 'Sekretariat PBNU', 1, 3, 'Belum', 'Sesuai Perkum 16 Pedoman Administrasi', false, 1),
  ('t2', 'SK & Tim Transisi', 'Pengesahan SK & SK Turunan Tim Transisi', 'SK & SK Tim Transisi', 'Ketua & Wasekjen', 4, 7, 'Belum', 'Mandat resmi Ketua & Wasekjen membidangi', false, 2),
  ('t3', 'Legal & Perkum', 'Mapping Legal Kepemilikan PT. Visi Berkah Bangsa', 'Dokumen Mapping Legal', 'Tim Legal', 1, 4, 'Belum', 'Audit akta, RUPS, pemegang saham & KBLI', false, 3),
  ('t4', 'Legal & Perkum', 'Validasi Uji Sertifikasi Dewan Pers', 'BA Validasi Dewan Pers', 'Tim Legal', 4, 8, 'Belum', 'Cek verifikasi admin/faktual & risiko dorman 6 bln', false, 4),
  ('t5', 'Legal & Perkum', 'Legal Opini Perkum / Jam''iyyah NU', 'Legal Opini', 'Tim Legal', 7, 14, 'Belum', 'Kajian Perkum 7, 8, & 19 terkait status PT', false, 5),
  ('t6', 'SDM & Layoff', 'Mapping SDM & Hitung Hak (UU Cipta Kerja)', 'Matriks SDM & Pesangon', 'HR & Keuangan', 2, 7, 'Belum', 'Klasifikasi PKWTT/PKWT & simulasi pesangon', false, 6),
  ('t7', 'SDM & Layoff', 'Terbit Surat Layoff SDM (Min. 14 HK)', 'Surat Layoff (PHK)', 'Tim Transisi & HR', 8, 9, 'Belum', 'Batas akhir 9 Des agar efektif 31 Des = 14 HK', true, 7),
  ('t8', 'SDM & Layoff', 'Masa Tanggapan 7 HK & Bipartit SDM', 'BA Bipartit', 'HR & Tim Transisi', 10, 18, 'Belum', 'Jendela keberatan tertulis PP 35/2021', false, 8),
  ('t9', 'BAST & Exit', 'BAST Digital (Email, Medsos, Web, Server, Domain)', 'BAST Aset Digital', 'IT & Admin Digital', 9, 23, 'Belum', 'Backup penuh, rotasi password/2FA & BAST', false, 9),
  ('t10', 'BAST & Exit', 'Dokumen & BAST Laporan Keuangan', 'BAST Lap. Keuangan', 'Keuangan', 14, 29, 'Belum', 'Cut-off kas, utang/piutang, pajak & payroll', false, 10),
  ('t11', 'BAST & Exit', 'Stock Opname & BAST Inventaris / Peralatan', 'BAST Inventaris', 'GA & Aset', 14, 29, 'Belum', 'Pengembalian laptop, kamera & alat produksi', false, 11),
  ('t12', 'SDM & Layoff', 'Pencairan Hak SDM, Lapor Disnaker & Tutup Final', 'PB & Tanda Lapor Disnaker', 'Tim Transisi', 28, 31, 'Belum', 'Perjanjian Bersama, transfer hak & lapor final', false, 12)
ON CONFLICT (id) DO NOTHING;
