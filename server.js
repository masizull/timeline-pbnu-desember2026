// ====================================================================
// SERVER BACKEND TIMELINE PBNU DESEMBER 2026
// Dibuat dengan modul bawaan Node.js (Zero Dependency: Tanpa perlu npm install)
// Jalankan dengan: node server.js
// ====================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');

const DEFAULT_TASKS = [
  { id: 't1', track: 'SK & Tim Transisi', title: 'Draft SK Non-Aktif & Ajuan Ketua PBNU', result: 'Draft SK', pic: 'Sekretariat PBNU', start: 1, end_day: 3, status: 'Belum', note: 'Sesuai Perkum 16 Pedoman Administrasi', is_layoff_gate: false, order_idx: 1 },
  { id: 't2', track: 'SK & Tim Transisi', title: 'Pengesahan SK & SK Turunan Tim Transisi', result: 'SK & SK Tim Transisi', pic: 'Ketua & Wasekjen', start: 4, end_day: 7, status: 'Belum', note: 'Mandat resmi Ketua & Wasekjen membidangi', is_layoff_gate: false, order_idx: 2 },
  { id: 't3', track: 'Legal & Perkum', title: 'Mapping Legal Kepemilikan PT. Visi Berkah Bangsa', result: 'Dokumen Mapping Legal', pic: 'Tim Legal', start: 1, end_day: 4, status: 'Belum', note: 'Audit akta, RUPS, pemegang saham & KBLI', is_layoff_gate: false, order_idx: 3 },
  { id: 't4', track: 'Legal & Perkum', title: 'Validasi Uji Sertifikasi Dewan Pers', result: 'BA Validasi Dewan Pers', pic: 'Tim Legal', start: 4, end_day: 8, status: 'Belum', note: 'Cek verifikasi admin/faktual & risiko dorman 6 bln', is_layoff_gate: false, order_idx: 4 },
  { id: 't5', track: 'Legal & Perkum', title: 'Legal Opini Perkum / Jam\'iyyah NU', result: 'Legal Opini', pic: 'Tim Legal', start: 7, end_day: 14, status: 'Belum', note: 'Kajian Perkum 7, 8, & 19 terkait status PT', is_layoff_gate: false, order_idx: 5 },
  { id: 't6', track: 'SDM & Layoff', title: 'Mapping SDM & Hitung Hak (UU Cipta Kerja)', result: 'Matriks SDM & Pesangon', pic: 'HR & Keuangan', start: 2, end_day: 7, status: 'Belum', note: 'Klasifikasi PKWTT/PKWT & simulasi pesangon', is_layoff_gate: false, order_idx: 6 },
  { id: 't7', track: 'SDM & Layoff', title: 'Terbit Surat Layoff SDM (Min. 14 HK)', result: 'Surat Layoff (PHK)', pic: 'Tim Transisi & HR', start: 8, end_day: 9, status: 'Belum', note: 'Batas akhir 9 Des agar efektif 31 Des = 14 HK', is_layoff_gate: true, order_idx: 7 },
  { id: 't8', track: 'SDM & Layoff', title: 'Masa Tanggapan 7 HK & Bipartit SDM', result: 'BA Bipartit', pic: 'HR & Tim Transisi', start: 10, end_day: 18, status: 'Belum', note: 'Jendela keberatan tertulis PP 35/2021', is_layoff_gate: false, order_idx: 8 },
  { id: 't9', track: 'BAST & Exit', title: 'BAST Digital (Email, Medsos, Web, Server, Domain)', result: 'BAST Aset Digital', pic: 'IT & Admin Digital', start: 9, end_day: 23, status: 'Belum', note: 'Backup penuh, rotasi password/2FA & BAST', is_layoff_gate: false, order_idx: 9 },
  { id: 't10', track: 'BAST & Exit', title: 'Dokumen & BAST Laporan Keuangan', result: 'BAST Lap. Keuangan', pic: 'Keuangan', start: 14, end_day: 29, status: 'Belum', note: 'Cut-off kas, utang/piutang, pajak & payroll', is_layoff_gate: false, order_idx: 10 },
  { id: 't11', track: 'BAST & Exit', title: 'Stock Opname & BAST Inventaris / Peralatan', result: 'BAST Inventaris', pic: 'GA & Aset', start: 14, end_day: 29, status: 'Belum', note: 'Pengembalian laptop, kamera & alat produksi', is_layoff_gate: false, order_idx: 11 },
  { id: 't12', track: 'SDM & Layoff', title: 'Pencairan Hak SDM, Lapor Disnaker & Tutup Final', result: 'PB & Tanda Lapor Disnaker', pic: 'Tim Transisi', start: 28, end_day: 31, status: 'Belum', note: 'Perjanjian Bersama, transfer hak & lapor final', is_layoff_gate: false, order_idx: 12 }
];

// Inisialisasi folder data dan file tasks.json jika belum ada
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadTasks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error membaca data tasks.json:', e);
  }
  saveTasks(DEFAULT_TASKS);
  return DEFAULT_TASKS;
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (e) {
    console.error('Error menyimpan data tasks.json:', e);
  }
}

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.sql': 'text/plain; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API ENDPOINTS ---
  if (pathname === '/api/tasks' && req.method === 'GET') {
    const tasks = loadTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
    return;
  }

  if (pathname.startsWith('/api/tasks') && (req.method === 'PUT' || req.method === 'POST')) {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const tasks = loadTasks();
        const taskId = pathname.split('/')[3] || payload.id;
        const idx = tasks.findIndex(t => t.id === taskId);

        if (idx !== -1) {
          tasks[idx] = { ...tasks[idx], ...payload, id: taskId };
        } else {
          tasks.push({ ...payload, id: taskId || ('t_' + Date.now()) });
        }

        saveTasks(tasks);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, tasks }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  if (pathname.startsWith('/api/tasks/') && req.method === 'DELETE') {
    const taskId = pathname.split('/')[3];
    let tasks = loadTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks(tasks);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, tasks }));
    return;
  }

  if (pathname === '/api/reset' && req.method === 'POST') {
    saveTasks(DEFAULT_TASKS);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, tasks: DEFAULT_TASKS }));
    return;
  }

  // --- STATIC FILE SERVING ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Server Timeline PBNU aktif di: http://localhost:${PORT}`);
  console.log(`📡 Database lokal: data/tasks.json`);
  console.log(`=======================================================`);
});
