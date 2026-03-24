const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'qldsv_secret_key_2025';

// ==================== DATABASE SETUP ====================
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'qldsv.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// ==================== INIT DATABASE ====================
function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin','giang_vien','sinh_vien')),
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now','localtime')),
      last_login TEXT
    );

    CREATE TABLE IF NOT EXISTS sinh_vien (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ma_sv TEXT UNIQUE NOT NULL,
      ho_ten TEXT NOT NULL,
      ngay_sinh TEXT,
      gioi_tinh TEXT DEFAULT 'Nam',
      lop TEXT,
      nganh TEXT,
      khoa TEXT,
      trang_thai TEXT DEFAULT 'Đang học',
      sdt TEXT,
      email TEXT,
      dia_chi TEXT,
      user_id INTEGER REFERENCES users(id),
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS giang_vien (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ma_gv TEXT UNIQUE NOT NULL,
      ho_ten TEXT NOT NULL,
      khoa TEXT,
      hoc_vi TEXT,
      sdt TEXT,
      email TEXT,
      user_id INTEGER REFERENCES users(id),
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS mon_hoc (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ma_mh TEXT UNIQUE NOT NULL,
      ten_mh TEXT NOT NULL,
      so_tin_chi INTEGER NOT NULL DEFAULT 3,
      khoa TEXT,
      mo_ta TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS lop_hoc_phan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ma_lhp TEXT UNIQUE NOT NULL,
      mon_hoc_id INTEGER REFERENCES mon_hoc(id),
      giang_vien_id INTEGER REFERENCES giang_vien(id),
      hoc_ky TEXT NOT NULL,
      nam_hoc TEXT NOT NULL,
      phong_hoc TEXT,
      lich_hoc TEXT,
      si_so INTEGER DEFAULT 0,
      trang_thai TEXT DEFAULT 'Đang học',
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS dang_ky_hoc (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sinh_vien_id INTEGER REFERENCES sinh_vien(id),
      lop_hoc_phan_id INTEGER REFERENCES lop_hoc_phan(id),
      ngay_dang_ky TEXT DEFAULT (datetime('now','localtime')),
      UNIQUE(sinh_vien_id, lop_hoc_phan_id)
    );

    CREATE TABLE IF NOT EXISTS bang_diem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sinh_vien_id INTEGER REFERENCES sinh_vien(id),
      lop_hoc_phan_id INTEGER REFERENCES lop_hoc_phan(id),
      diem_cc REAL,
      diem_gk REAL,
      diem_ck REAL,
      diem_tb REAL,
      diem_chu TEXT,
      danh_gia TEXT,
      lan_thi INTEGER DEFAULT 1,
      ghi_chu TEXT,
      giang_vien_nhap INTEGER REFERENCES giang_vien(id),
      ngay_nhap TEXT DEFAULT (datetime('now','localtime')),
      ngay_cap_nhat TEXT,
      UNIQUE(sinh_vien_id, lop_hoc_phan_id, lan_thi)
    );

    CREATE TABLE IF NOT EXISTS phan_quyen_gv (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      giang_vien_id INTEGER REFERENCES giang_vien(id),
      lop_hoc_phan_id INTEGER REFERENCES lop_hoc_phan(id),
      quyen_nhap_diem INTEGER DEFAULT 1,
      quyen_sua_diem INTEGER DEFAULT 0,
      cap_boi INTEGER REFERENCES users(id),
      ngay_cap TEXT DEFAULT (datetime('now','localtime')),
      UNIQUE(giang_vien_id, lop_hoc_phan_id)
    );

    CREATE TABLE IF NOT EXISTS thong_bao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tieu_de TEXT NOT NULL,
      noi_dung TEXT,
      loai TEXT DEFAULT 'info',
      user_id INTEGER REFERENCES users(id),
      da_doc INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      action TEXT NOT NULL,
      target_table TEXT,
      target_id INTEGER,
      detail TEXT,
      ip TEXT,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );
  `);

  // Seed data nếu chưa có
  const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get();
  if (userCount.c === 0) {
    seedData();
  }
}

// ==================== SEED DATA ====================
function seedData() {
  const hashAdmin = bcrypt.hashSync('admin123', 10);
  const hashGV = bcrypt.hashSync('gv123', 10);
  const hashSV = bcrypt.hashSync('sv123', 10);

  // Users
  const insertUser = db.prepare(`INSERT INTO users (username, password, role, full_name, email, phone) VALUES (?,?,?,?,?,?)`);

  insertUser.run('admin', hashAdmin, 'admin', 'Quản trị viên', 'admin@tnu.edu.vn', '0912000000');
  insertUser.run('gv001', hashGV, 'giang_vien', 'Nguyễn Thị Thuận', 'ntthuan@tnu.edu.vn', '0912111111');
  insertUser.run('gv002', hashGV, 'giang_vien', 'Dương Thị Hồng Anh', 'dthanhanh@tnu.edu.vn', '0912222222');
  insertUser.run('gv003', hashGV, 'giang_vien', 'Trần Văn Tâm', 'tvtam@tnu.edu.vn', '0912333333');
  insertUser.run('gv004', hashGV, 'giang_vien', 'Hoàng Văn Cẩn', 'hvcan@tnu.edu.vn', '0912444444');
  insertUser.run('gv005', hashGV, 'giang_vien', 'Nguyễn Duy Cương', 'ndcuong@tnu.edu.vn', '0912555555');

  const sv1Id = insertUser.run('75dctt21355', hashSV, 'sinh_vien', 'Phạm Mạnh Hùng', 'pmhung@sv.tnu.edu.vn', '0918066962').lastInsertRowid;
  const sv2Id = insertUser.run('75dctt21356', hashSV, 'sinh_vien', 'Nguyễn Văn An', 'nvan@sv.tnu.edu.vn', '0918000001').lastInsertRowid;
  const sv3Id = insertUser.run('75dctt21357', hashSV, 'sinh_vien', 'Trần Thị Bích', 'ttbich@sv.tnu.edu.vn', '0918000002').lastInsertRowid;
  const sv4Id = insertUser.run('75dctt21358', hashSV, 'sinh_vien', 'Lê Minh Cường', 'lmcuong@sv.tnu.edu.vn', '0918000003').lastInsertRowid;
  const sv5Id = insertUser.run('75dctt21359', hashSV, 'sinh_vien', 'Phạm Thị Dung', 'ptdung@sv.tnu.edu.vn', '0918000004').lastInsertRowid;

  // Giảng viên
  const insertGV = db.prepare(`INSERT INTO giang_vien (ma_gv, ho_ten, khoa, hoc_vi, sdt, email, user_id) VALUES (?,?,?,?,?,?,?)`);
  const gv1Id = insertGV.run('GV001', 'Nguyễn Thị Thuận', 'CNTT', 'Thạc sĩ', '0912111111', 'ntthuan@tnu.edu.vn', 2).lastInsertRowid;
  const gv2Id = insertGV.run('GV002', 'Dương Thị Hồng Anh', 'Ngoại ngữ', 'Tiến sĩ', '0912222222', 'dthanhanh@tnu.edu.vn', 3).lastInsertRowid;
  const gv3Id = insertGV.run('GV003', 'Trần Văn Tâm', 'CNTT', 'Thạc sĩ', '0912333333', 'tvtam@tnu.edu.vn', 4).lastInsertRowid;
  const gv4Id = insertGV.run('GV004', 'Hoàng Văn Cẩn', 'Toán', 'Tiến sĩ', '0912444444', 'hvcan@tnu.edu.vn', 5).lastInsertRowid;
  const gv5Id = insertGV.run('GV005', 'Nguyễn Duy Cương', 'CNTT', 'Thạc sĩ', '0912555555', 'ndcuong@tnu.edu.vn', 6).lastInsertRowid;

  // Sinh viên
  const insertSV = db.prepare(`INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email, user_id) VALUES (?,?,?,?,?,?,?,?,?,?)`);
  const s1 = insertSV.run('75DCTT21355', 'Phạm Mạnh Hùng', '2006-06-06', 'Nam', '75DCTT21', 'Công nghệ thông tin', 'K75DHCQ', '0918066962', 'pmhung@sv.tnu.edu.vn', sv1Id).lastInsertRowid;
  const s2 = insertSV.run('75DCTT21356', 'Nguyễn Văn An', '2006-01-15', 'Nam', '75DCTT21', 'Công nghệ thông tin', 'K75DHCQ', '0918000001', 'nvan@sv.tnu.edu.vn', sv2Id).lastInsertRowid;
  const s3 = insertSV.run('75DCTT21357', 'Trần Thị Bích', '2006-03-20', 'Nữ', '75DCTT21', 'Công nghệ thông tin', 'K75DHCQ', '0918000002', 'ttbich@sv.tnu.edu.vn', sv3Id).lastInsertRowid;
  const s4 = insertSV.run('75DCTT21358', 'Lê Minh Cường', '2006-07-10', 'Nam', '75DCTT21', 'Công nghệ thông tin', 'K75DHCQ', '0918000003', 'lmcuong@sv.tnu.edu.vn', sv4Id).lastInsertRowid;
  const s5 = insertSV.run('75DCTT21359', 'Phạm Thị Dung', '2006-11-25', 'Nữ', '75DCTT21', 'Công nghệ thông tin', 'K75DHCQ', '0918000004', 'ptdung@sv.tnu.edu.vn', sv5Id).lastInsertRowid;

  // Môn học
  const insertMH = db.prepare(`INSERT INTO mon_hoc (ma_mh, ten_mh, so_tin_chi, khoa) VALUES (?,?,?,?)`);
  const mh1 = insertMH.run('DC2HT26', 'Cấu trúc dữ liệu và giải thuật', 4, 'CNTT').lastInsertRowid;
  const mh2 = insertMH.run('DC3HT21', 'Hệ quản trị Cơ sở dữ liệu', 3, 'CNTT').lastInsertRowid;
  const mh3 = insertMH.run('DC2TT35', 'Lập trình hướng đối tượng C++', 3, 'CNTT').lastInsertRowid;
  const mh4 = insertMH.run('DC1CB36', 'Tiếng Anh cơ bản', 2, 'Ngoại ngữ').lastInsertRowid;
  const mh5 = insertMH.run('DC1TT45', 'Tin học', 3, 'CNTT').lastInsertRowid;
  const mh6 = insertMH.run('DC2HT42', 'Toán học rời rạc', 4, 'Toán').lastInsertRowid;
  const mh7 = insertMH.run('DC1LL03', 'Tư tưởng Hồ Chí Minh', 2, 'Lý luận').lastInsertRowid;
  const mh8 = insertMH.run('DC2HT13', 'Nhập môn mạng máy tính', 3, 'CNTT').lastInsertRowid;

  // Lớp học phần
  const insertLHP = db.prepare(`INSERT INTO lop_hoc_phan (ma_lhp, mon_hoc_id, giang_vien_id, hoc_ky, nam_hoc, phong_hoc, lich_hoc, si_so) VALUES (?,?,?,?,?,?,?,?)`);
  const lhp1 = insertLHP.run('DC2HT26-1-1-25(N06)/75DCTT21', mh1, gv1Id, '1', '2025_2026', 'A3.402', 'Thứ 3: 06:45-09:25', 40).lastInsertRowid;
  const lhp2 = insertLHP.run('DC3HT21-1-1-25(N06)/75DCTT21', mh2, gv3Id, '1', '2025_2026', 'A3.401', 'Thứ 4: 07:00-09:25', 40).lastInsertRowid;
  const lhp3 = insertLHP.run('DC2TT35-1-1-25(N06)/75DCTT21', mh3, gv5Id, '1', '2025_2026', 'C2.202', 'Thứ 5: 09:30-12:10', 40).lastInsertRowid;
  const lhp4 = insertLHP.run('DC1CB36-1-1-25(N86)/75DCTT21', mh4, gv2Id, '1', '2025_2026', 'A6.401', 'Thứ 2: 07:00-09:25', 40).lastInsertRowid;
  const lhp5 = insertLHP.run('DC1TT45-1-1-25(N61)/75DCTT21', mh5, gv3Id, '1', '2025_2026', 'B2.301', 'Thứ 6: 07:00-09:25', 40).lastInsertRowid;
  const lhp6 = insertLHP.run('DC2HT42-1-1-25(N87)/75DCTT21', mh6, gv4Id, '1', '2025_2026', 'C3.206', 'Thứ 7: 07:00-09:25', 40).lastInsertRowid;

  // Đăng ký học
  const insertDKH = db.prepare(`INSERT OR IGNORE INTO dang_ky_hoc (sinh_vien_id, lop_hoc_phan_id) VALUES (?,?)`);
  [s1, s2, s3, s4, s5].forEach(sv => {
    [lhp1, lhp2, lhp3, lhp4, lhp5, lhp6].forEach(lhp => {
      insertDKH.run(sv, lhp);
    });
  });

  // Phân quyền giảng viên
  const insertPQ = db.prepare(`INSERT OR IGNORE INTO phan_quyen_gv (giang_vien_id, lop_hoc_phan_id, quyen_nhap_diem, quyen_sua_diem, cap_boi) VALUES (?,?,?,?,?)`);
  insertPQ.run(gv1Id, lhp1, 1, 1, 1);
  insertPQ.run(gv3Id, lhp2, 1, 1, 1);
  insertPQ.run(gv5Id, lhp3, 1, 1, 1);
  insertPQ.run(gv2Id, lhp4, 1, 1, 1);
  insertPQ.run(gv3Id, lhp5, 1, 1, 1);
  insertPQ.run(gv4Id, lhp6, 1, 1, 1);

  // Bảng điểm mẫu
  const insertBD = db.prepare(`
    INSERT OR IGNORE INTO bang_diem 
    (sinh_vien_id, lop_hoc_phan_id, diem_cc, diem_gk, diem_ck, diem_tb, diem_chu, danh_gia, lan_thi, giang_vien_nhap)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `);

  const calcGrade = (tb) => {
    if (tb >= 9.0) return ['A+', 'Đạt'];
    if (tb >= 8.5) return ['A', 'Đạt'];
    if (tb >= 8.0) return ['B+', 'Đạt'];
    if (tb >= 7.0) return ['B', 'Đạt'];
    if (tb >= 6.5) return ['C+', 'Đạt'];
    if (tb >= 5.5) return ['C', 'Đạt'];
    if (tb >= 5.0) return ['D+', 'Đạt'];
    if (tb >= 4.0) return ['D', 'Đạt'];
    return ['F', 'Không đạt'];
  };

  const sampleScores = [
    // sv1
    [s1, lhp1, 8.0, 7.5, 6.0, 6.3, ...calcGrade(6.3), 1, gv1Id],
    [s1, lhp2, 7.0, 6.0, 5.2, 5.2, ...calcGrade(5.2), 1, gv3Id],
    [s1, lhp3, 8.0, 7.0, 6.4, 6.4, ...calcGrade(6.4), 1, gv5Id],
    [s1, lhp4, 9.0, 8.5, 8.8, 8.8, ...calcGrade(8.8), 1, gv2Id],
    [s1, lhp5, 8.5, 8.0, 8.3, 8.3, ...calcGrade(8.3), 1, gv3Id],
    [s1, lhp6, 7.0, 6.5, 6.0, 6.1, ...calcGrade(6.1), 1, gv4Id],
    // sv2
    [s2, lhp1, 9.0, 8.5, 9.0, 8.9, ...calcGrade(8.9), 1, gv1Id],
    [s2, lhp2, 8.0, 7.5, 8.0, 7.9, ...calcGrade(7.9), 1, gv3Id],
    [s2, lhp3, 7.0, 6.5, 7.5, 7.1, ...calcGrade(7.1), 1, gv5Id],
    [s2, lhp4, 9.5, 9.0, 9.5, 9.3, ...calcGrade(9.3), 1, gv2Id],
    // sv3
    [s3, lhp1, 7.5, 8.0, 7.5, 7.6, ...calcGrade(7.6), 1, gv1Id],
    [s3, lhp2, 8.5, 8.0, 8.5, 8.4, ...calcGrade(8.4), 1, gv3Id],
    [s3, lhp3, 6.5, 6.0, 6.5, 6.4, ...calcGrade(6.4), 1, gv5Id],
    // sv4
    [s4, lhp1, 6.0, 5.5, 5.8, 5.7, ...calcGrade(5.7), 1, gv1Id],
    [s4, lhp2, 5.0, 4.5, 4.8, 4.8, ...calcGrade(4.8), 1, gv3Id],
    // sv5
    [s5, lhp1, 5.0, 4.0, 3.5, 3.8, ...calcGrade(3.8), 1, gv1Id],
  ];

  sampleScores.forEach(score => insertBD.run(...score));

  // Thông báo mẫu
  const insertTB = db.prepare(`INSERT INTO thong_bao (tieu_de, noi_dung, loai, user_id) VALUES (?,?,?,?)`);
  insertTB.run('Mở đăng ký học kỳ 2', 'Hệ thống mở đăng ký học kỳ 2 năm học 2025-2026 từ ngày 01/01/2026', 'info', sv1Id);
  insertTB.run('Nhắc nhở nộp học phí', 'Hạn cuối nộp học phí học kỳ 2 là ngày 15/01/2026', 'warn', sv1Id);
  insertTB.run('Kết quả thi đã có', 'Điểm thi học kỳ 1 năm học 2025-2026 đã được công bố', 'success', sv1Id);

  console.log('✅ Seed data hoàn tất!');
}

// ==================== AUTH MIDDLEWARE ====================
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Không có token xác thực' });
  }
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Không có quyền truy cập' });
    }
    next();
  };
}

// Log action
function logAction(userId, action, table, targetId, detail, ip) {
  try {
    db.prepare(`INSERT INTO audit_log (user_id, action, target_table, target_id, detail, ip) VALUES (?,?,?,?,?,?)`)
      .run(userId, action, table, targetId, detail, ip);
  } catch {}
}

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Thiếu thông tin đăng nhập' });

  const user = db.prepare('SELECT * FROM users WHERE username = ? AND is_active = 1').get(username);
  if (!user) return res.status(401).json({ error: 'Tên đăng nhập không tồn tại' });

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Mật khẩu không đúng' });
  }

  db.prepare(`UPDATE users SET last_login = datetime('now','localtime') WHERE id = ?`).run(user.id);

  // Lấy thêm thông tin theo role
  let extraInfo = {};
  if (user.role === 'sinh_vien') {
    extraInfo = db.prepare('SELECT * FROM sinh_vien WHERE user_id = ?').get(user.id) || {};
  } else if (user.role === 'giang_vien') {
    extraInfo = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(user.id) || {};
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role, full_name: user.full_name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  logAction(user.id, 'LOGIN', 'users', user.id, `${user.full_name} đăng nhập`, req.ip);

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      ...extraInfo
    }
  });
});

app.post('/api/auth/change-password', authMiddleware, (req, res) => {
  const { old_password, new_password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(old_password, user.password)) {
    return res.status(400).json({ error: 'Mật khẩu cũ không đúng' });
  }
  const hashed = bcrypt.hashSync(new_password, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.user.id);
  res.json({ message: 'Đổi mật khẩu thành công' });
});

// ==================== ADMIN ROUTES ====================

// Dashboard stats
app.get('/api/admin/stats', authMiddleware, requireRole('admin'), (req, res) => {
  const totalSV = db.prepare('SELECT COUNT(*) as c FROM sinh_vien').get().c;
  const totalGV = db.prepare('SELECT COUNT(*) as c FROM giang_vien').get().c;
  const totalMH = db.prepare('SELECT COUNT(*) as c FROM mon_hoc WHERE is_active=1').get().c;
  const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users WHERE is_active=1').get().c;
  const totalDiem = db.prepare('SELECT COUNT(*) as c FROM bang_diem').get().c;

  const avgGPA = db.prepare(`
    SELECT AVG(diem_tb) as avg FROM bang_diem WHERE diem_tb IS NOT NULL
  `).get().avg || 0;

  const gradeDistrib = db.prepare(`
    SELECT diem_chu, COUNT(*) as count FROM bang_diem 
    WHERE diem_chu IS NOT NULL GROUP BY diem_chu
  `).all();

  const recentLogs = db.prepare(`
    SELECT al.*, u.full_name FROM audit_log al
    JOIN users u ON al.user_id = u.id
    ORDER BY al.created_at DESC LIMIT 10
  `).all();

  res.json({ totalSV, totalGV, totalMH, totalUsers, totalDiem, avgGPA, gradeDistrib, recentLogs });
});

// Quản lý users
app.get('/api/admin/users', authMiddleware, requireRole('admin'), (req, res) => {
  const { role, search } = req.query;
  let query = 'SELECT id, username, role, full_name, email, phone, is_active, created_at, last_login FROM users WHERE 1=1';
  const params = [];
  if (role) { query += ' AND role = ?'; params.push(role); }
  if (search) { query += ' AND (full_name LIKE ? OR username LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  query += ' ORDER BY created_at DESC';
  res.json(db.prepare(query).all(...params));
});

app.post('/api/admin/users', authMiddleware, requireRole('admin'), (req, res) => {
  const { username, password, role, full_name, email, phone } = req.body;
  if (!username || !password || !role || !full_name) return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  const hashed = bcrypt.hashSync(password, 10);
  try {
    const result = db.prepare(`INSERT INTO users (username, password, role, full_name, email, phone) VALUES (?,?,?,?,?,?)`)
      .run(username, hashed, role, full_name, email, phone);
    logAction(req.user.id, 'CREATE_USER', 'users', result.lastInsertRowid, `Tạo tài khoản ${username}`, req.ip);
    res.json({ message: 'Tạo tài khoản thành công', id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Username đã tồn tại' });
  }
});

app.put('/api/admin/users/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const { full_name, email, phone, is_active, role } = req.body;
  db.prepare(`UPDATE users SET full_name=?, email=?, phone=?, is_active=?, role=? WHERE id=?`)
    .run(full_name, email, phone, is_active, role, req.params.id);
  logAction(req.user.id, 'UPDATE_USER', 'users', req.params.id, `Cập nhật user ${req.params.id}`, req.ip);
  res.json({ message: 'Cập nhật thành công' });
});

app.put('/api/admin/users/:id/toggle', authMiddleware, requireRole('admin'), (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  const newStatus = user.is_active ? 0 : 1;
  db.prepare('UPDATE users SET is_active = ? WHERE id = ?').run(newStatus, req.params.id);
  logAction(req.user.id, newStatus ? 'UNLOCK_USER' : 'LOCK_USER', 'users', req.params.id, `${newStatus ? 'Mở khóa' : 'Khóa'} user ${user.username}`, req.ip);
  res.json({ message: newStatus ? 'Đã mở khóa' : 'Đã khóa', is_active: newStatus });
});

app.put('/api/admin/users/:id/reset-password', authMiddleware, requireRole('admin'), (req, res) => {
  const { new_password } = req.body;
  const hashed = bcrypt.hashSync(new_password || '123456', 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashed, req.params.id);
  logAction(req.user.id, 'RESET_PASSWORD', 'users', req.params.id, `Reset mật khẩu user ${req.params.id}`, req.ip);
  res.json({ message: 'Đặt lại mật khẩu thành công' });
});

// Quản lý sinh viên
app.get('/api/admin/sinh-vien', authMiddleware, requireRole('admin'), (req, res) => {
  const { search, lop } = req.query;
  let query = `SELECT sv.*, u.is_active, u.last_login FROM sinh_vien sv JOIN users u ON sv.user_id = u.id WHERE 1=1`;
  const params = [];
  if (search) { query += ' AND (sv.ho_ten LIKE ? OR sv.ma_sv LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
  if (lop) { query += ' AND sv.lop = ?'; params.push(lop); }
  query += ' ORDER BY sv.ma_sv';
  res.json(db.prepare(query).all(...params));
});

app.post('/api/admin/sinh-vien', authMiddleware, requireRole('admin'), (req, res) => {
  const { ma_sv, ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email } = req.body;
  const password = bcrypt.hashSync(ma_sv.toLowerCase(), 10);
  try {
    const userId = db.prepare(`INSERT INTO users (username, password, role, full_name, email, phone) VALUES (?,?,?,?,?,?)`)
      .run(ma_sv.toLowerCase(), password, 'sinh_vien', ho_ten, email, sdt).lastInsertRowid;
    const svId = db.prepare(`INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email, user_id) VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .run(ma_sv, ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email, userId).lastInsertRowid;
    logAction(req.user.id, 'CREATE_SV', 'sinh_vien', svId, `Thêm SV ${ma_sv}`, req.ip);
    res.json({ message: 'Thêm sinh viên thành công', id: svId });
  } catch (e) {
    res.status(400).json({ error: 'Mã sinh viên đã tồn tại' });
  }
});

app.put('/api/admin/sinh-vien/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const { ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email, trang_thai } = req.body;
  db.prepare(`UPDATE sinh_vien SET ho_ten=?, ngay_sinh=?, gioi_tinh=?, lop=?, nganh=?, khoa=?, sdt=?, email=?, trang_thai=? WHERE id=?`)
    .run(ho_ten, ngay_sinh, gioi_tinh, lop, nganh, khoa, sdt, email, trang_thai, req.params.id);
  logAction(req.user.id, 'UPDATE_SV', 'sinh_vien', req.params.id, `Cập nhật SV ${req.params.id}`, req.ip);
  res.json({ message: 'Cập nhật thành công' });
});

app.delete('/api/admin/sinh-vien/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM sinh_vien WHERE id = ?').run(req.params.id);
  logAction(req.user.id, 'DELETE_SV', 'sinh_vien', req.params.id, `Xóa SV ${req.params.id}`, req.ip);
  res.json({ message: 'Đã xóa sinh viên' });
});

// Quản lý giảng viên
app.get('/api/admin/giang-vien', authMiddleware, requireRole('admin'), (req, res) => {
  const gvList = db.prepare(`
    SELECT gv.*, u.is_active, u.last_login, u.username,
    (SELECT COUNT(*) FROM phan_quyen_gv pq WHERE pq.giang_vien_id = gv.id AND pq.quyen_nhap_diem=1) as so_mon_phan_cong
    FROM giang_vien gv JOIN users u ON gv.user_id = u.id ORDER BY gv.ma_gv
  `).all();
  res.json(gvList);
});

// Quản lý môn học
app.get('/api/admin/mon-hoc', authMiddleware, requireRole('admin'), (req, res) => {
  res.json(db.prepare('SELECT * FROM mon_hoc ORDER BY ma_mh').all());
});

app.post('/api/admin/mon-hoc', authMiddleware, requireRole('admin'), (req, res) => {
  const { ma_mh, ten_mh, so_tin_chi, khoa, mo_ta } = req.body;
  try {
    const result = db.prepare(`INSERT INTO mon_hoc (ma_mh, ten_mh, so_tin_chi, khoa, mo_ta) VALUES (?,?,?,?,?)`)
      .run(ma_mh, ten_mh, so_tin_chi, khoa, mo_ta);
    logAction(req.user.id, 'CREATE_MH', 'mon_hoc', result.lastInsertRowid, `Thêm môn ${ma_mh}`, req.ip);
    res.json({ message: 'Thêm môn học thành công', id: result.lastInsertRowid });
  } catch {
    res.status(400).json({ error: 'Mã môn học đã tồn tại' });
  }
});

app.put('/api/admin/mon-hoc/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const { ten_mh, so_tin_chi, khoa, mo_ta, is_active } = req.body;
  db.prepare(`UPDATE mon_hoc SET ten_mh=?, so_tin_chi=?, khoa=?, mo_ta=?, is_active=? WHERE id=?`)
    .run(ten_mh, so_tin_chi, khoa, mo_ta, is_active, req.params.id);
  res.json({ message: 'Cập nhật thành công' });
});

// Quản lý lớp học phần
app.get('/api/admin/lop-hoc-phan', authMiddleware, requireRole('admin'), (req, res) => {
  const list = db.prepare(`
    SELECT lhp.*, mh.ten_mh, mh.ma_mh, mh.so_tin_chi, gv.ho_ten as ten_gv, gv.ma_gv
    FROM lop_hoc_phan lhp
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    LEFT JOIN giang_vien gv ON lhp.giang_vien_id = gv.id
    ORDER BY lhp.nam_hoc DESC, lhp.hoc_ky DESC
  `).all();
  res.json(list);
});

// Phân quyền giảng viên
app.get('/api/admin/phan-quyen', authMiddleware, requireRole('admin'), (req, res) => {
  const list = db.prepare(`
    SELECT pq.*, gv.ho_ten as ten_gv, gv.ma_gv, 
           lhp.ma_lhp, mh.ten_mh, mh.ma_mh,
           lhp.hoc_ky, lhp.nam_hoc
    FROM phan_quyen_gv pq
    JOIN giang_vien gv ON pq.giang_vien_id = gv.id
    JOIN lop_hoc_phan lhp ON pq.lop_hoc_phan_id = lhp.id
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    ORDER BY gv.ma_gv
  `).all();
  res.json(list);
});

app.post('/api/admin/phan-quyen', authMiddleware, requireRole('admin'), (req, res) => {
  const { giang_vien_id, lop_hoc_phan_id, quyen_nhap_diem, quyen_sua_diem } = req.body;
  try {
    db.prepare(`INSERT OR REPLACE INTO phan_quyen_gv (giang_vien_id, lop_hoc_phan_id, quyen_nhap_diem, quyen_sua_diem, cap_boi) VALUES (?,?,?,?,?)`)
      .run(giang_vien_id, lop_hoc_phan_id, quyen_nhap_diem ? 1 : 0, quyen_sua_diem ? 1 : 0, req.user.id);
    logAction(req.user.id, 'PHAN_QUYEN_GV', 'phan_quyen_gv', giang_vien_id, `Phân quyền GV ${giang_vien_id} - LHP ${lop_hoc_phan_id}`, req.ip);
    res.json({ message: 'Phân quyền thành công' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/admin/phan-quyen/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM phan_quyen_gv WHERE id = ?').run(req.params.id);
  logAction(req.user.id, 'REVOKE_QUYEN_GV', 'phan_quyen_gv', req.params.id, `Thu hồi quyền GV`, req.ip);
  res.json({ message: 'Thu hồi quyền thành công' });
});

// Audit log
app.get('/api/admin/audit-log', authMiddleware, requireRole('admin'), (req, res) => {
  const logs = db.prepare(`
    SELECT al.*, u.full_name, u.role FROM audit_log al
    JOIN users u ON al.user_id = u.id
    ORDER BY al.created_at DESC LIMIT 100
  `).all();
  res.json(logs);
});

// Bảng điểm toàn trường (admin)
app.get('/api/admin/bang-diem', authMiddleware, requireRole('admin'), (req, res) => {
  const { lop_hoc_phan_id, sinh_vien_id } = req.query;
  let query = `
    SELECT bd.*, sv.ho_ten as ten_sv, sv.ma_sv, 
           mh.ten_mh, mh.ma_mh, lhp.ma_lhp, lhp.hoc_ky, lhp.nam_hoc,
           gv.ho_ten as ten_gv
    FROM bang_diem bd
    JOIN sinh_vien sv ON bd.sinh_vien_id = sv.id
    JOIN lop_hoc_phan lhp ON bd.lop_hoc_phan_id = lhp.id
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    LEFT JOIN giang_vien gv ON bd.giang_vien_nhap = gv.id
    WHERE 1=1
  `;
  const params = [];
  if (lop_hoc_phan_id) { query += ' AND bd.lop_hoc_phan_id = ?'; params.push(lop_hoc_phan_id); }
  if (sinh_vien_id) { query += ' AND bd.sinh_vien_id = ?'; params.push(sinh_vien_id); }
  query += ' ORDER BY sv.ma_sv, mh.ma_mh';
  res.json(db.prepare(query).all(...params));
});

// ==================== GIẢNG VIÊN ROUTES ====================

// Lấy thông tin GV
app.get('/api/gv/profile', authMiddleware, requireRole('giang_vien'), (req, res) => {
  const gv = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(req.user.id);
  res.json(gv);
});

// Lớp học phần được phân công
app.get('/api/gv/lop-hoc-phan', authMiddleware, requireRole('giang_vien'), (req, res) => {
  const gv = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(req.user.id);
  if (!gv) return res.status(404).json({ error: 'Không tìm thấy thông tin giảng viên' });

  const list = db.prepare(`
    SELECT lhp.*, mh.ten_mh, mh.ma_mh, mh.so_tin_chi,
           pq.quyen_nhap_diem, pq.quyen_sua_diem,
           (SELECT COUNT(*) FROM dang_ky_hoc dkh WHERE dkh.lop_hoc_phan_id = lhp.id) as so_sv,
           (SELECT COUNT(*) FROM bang_diem bd WHERE bd.lop_hoc_phan_id = lhp.id AND bd.giang_vien_nhap = ?) as da_nhap_diem
    FROM phan_quyen_gv pq
    JOIN lop_hoc_phan lhp ON pq.lop_hoc_phan_id = lhp.id
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    WHERE pq.giang_vien_id = ? AND pq.quyen_nhap_diem = 1
    ORDER BY lhp.nam_hoc DESC, lhp.hoc_ky DESC
  `).all(gv.id, gv.id);
  res.json(list);
});

// Danh sách sinh viên trong lớp
app.get('/api/gv/sinh-vien/:lhpId', authMiddleware, requireRole('giang_vien'), (req, res) => {
  const gv = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(req.user.id);

  // Kiểm tra quyền
  const pq = db.prepare('SELECT * FROM phan_quyen_gv WHERE giang_vien_id = ? AND lop_hoc_phan_id = ?').get(gv.id, req.params.lhpId);
  if (!pq) return res.status(403).json({ error: 'Bạn không có quyền xem lớp này' });

  const svList = db.prepare(`
    SELECT sv.*, bd.diem_cc, bd.diem_gk, bd.diem_ck, bd.diem_tb, bd.diem_chu, bd.danh_gia, bd.ghi_chu, bd.id as diem_id
    FROM dang_ky_hoc dkh
    JOIN sinh_vien sv ON dkh.sinh_vien_id = sv.id
    LEFT JOIN bang_diem bd ON bd.sinh_vien_id = sv.id AND bd.lop_hoc_phan_id = ?
    WHERE dkh.lop_hoc_phan_id = ?
    ORDER BY sv.ma_sv
  `).all(req.params.lhpId, req.params.lhpId);
  res.json({ svList, phanQuyen: pq });
});

// Nhập/cập nhật điểm
app.post('/api/gv/nhap-diem', authMiddleware, requireRole('giang_vien'), (req, res) => {
  const gv = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(req.user.id);
  const { sinh_vien_id, lop_hoc_phan_id, diem_cc, diem_gk, diem_ck, lan_thi, ghi_chu } = req.body;

  // Kiểm tra quyền
  const pq = db.prepare('SELECT * FROM phan_quyen_gv WHERE giang_vien_id = ? AND lop_hoc_phan_id = ? AND quyen_nhap_diem = 1').get(gv.id, lop_hoc_phan_id);
  if (!pq) return res.status(403).json({ error: 'Không có quyền nhập điểm lớp này' });

  // Tính điểm TB
  const cc = parseFloat(diem_cc) || 0;
  const gk = parseFloat(diem_gk) || 0;
  const ck = parseFloat(diem_ck) || 0;
  const tb = Math.round((cc * 0.1 + gk * 0.3 + ck * 0.6) * 100) / 100;

  const calcGrade = (t) => {
    if (t >= 9.0) return ['A+', 'Đạt'];
    if (t >= 8.5) return ['A', 'Đạt'];
    if (t >= 8.0) return ['B+', 'Đạt'];
    if (t >= 7.0) return ['B', 'Đạt'];
    if (t >= 6.5) return ['C+', 'Đạt'];
    if (t >= 5.5) return ['C', 'Đạt'];
    if (t >= 5.0) return ['D+', 'Đạt'];
    if (t >= 4.0) return ['D', 'Đạt'];
    return ['F', 'Không đạt'];
  };
  const [diem_chu, danh_gia] = calcGrade(tb);

  try {
    db.prepare(`
      INSERT INTO bang_diem (sinh_vien_id, lop_hoc_phan_id, diem_cc, diem_gk, diem_ck, diem_tb, diem_chu, danh_gia, lan_thi, ghi_chu, giang_vien_nhap, ngay_cap_nhat)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))
      ON CONFLICT(sinh_vien_id, lop_hoc_phan_id, lan_thi) DO UPDATE SET
        diem_cc=excluded.diem_cc, diem_gk=excluded.diem_gk, diem_ck=excluded.diem_ck,
        diem_tb=excluded.diem_tb, diem_chu=excluded.diem_chu, danh_gia=excluded.danh_gia,
        ghi_chu=excluded.ghi_chu, giang_vien_nhap=excluded.giang_vien_nhap,
        ngay_cap_nhat=datetime('now','localtime')
    `).run(sinh_vien_id, lop_hoc_phan_id, cc, gk, ck, tb, diem_chu, danh_gia, lan_thi || 1, ghi_chu, gv.id);

    logAction(req.user.id, 'NHAP_DIEM', 'bang_diem', sinh_vien_id, `GV ${gv.ma_gv} nhập điểm SV ${sinh_vien_id} - LHP ${lop_hoc_phan_id}`, req.ip);
    res.json({ message: 'Nhập điểm thành công', diem_tb: tb, diem_chu, danh_gia });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Nhập điểm hàng loạt
app.post('/api/gv/nhap-diem-batch', authMiddleware, requireRole('giang_vien'), (req, res) => {
  const gv = db.prepare('SELECT * FROM giang_vien WHERE user_id = ?').get(req.user.id);
  const { lop_hoc_phan_id, scores } = req.body;

  const pq = db.prepare('SELECT * FROM phan_quyen_gv WHERE giang_vien_id = ? AND lop_hoc_phan_id = ? AND quyen_nhap_diem = 1').get(gv.id, lop_hoc_phan_id);
  if (!pq) return res.status(403).json({ error: 'Không có quyền nhập điểm lớp này' });

  const calcGrade = (t) => {
    if (t >= 9.0) return ['A+', 'Đạt'];
    if (t >= 8.5) return ['A', 'Đạt'];
    if (t >= 8.0) return ['B+', 'Đạt'];
    if (t >= 7.0) return ['B', 'Đạt'];
    if (t >= 6.5) return ['C+', 'Đạt'];
    if (t >= 5.5) return ['C', 'Đạt'];
    if (t >= 5.0) return ['D+', 'Đạt'];
    if (t >= 4.0) return ['D', 'Đạt'];
    return ['F', 'Không đạt'];
  };

  const insertOrUpdate = db.prepare(`
    INSERT INTO bang_diem (sinh_vien_id, lop_hoc_phan_id, diem_cc, diem_gk, diem_ck, diem_tb, diem_chu, danh_gia, lan_thi, ghi_chu, giang_vien_nhap, ngay_cap_nhat)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))
    ON CONFLICT(sinh_vien_id, lop_hoc_phan_id, lan_thi) DO UPDATE SET
      diem_cc=excluded.diem_cc, diem_gk=excluded.diem_gk, diem_ck=excluded.diem_ck,
      diem_tb=excluded.diem_tb, diem_chu=excluded.diem_chu, danh_gia=excluded.danh_gia,
      giang_vien_nhap=excluded.giang_vien_nhap, ngay_cap_nhat=datetime('now','localtime')
  `);

  const insertMany = db.transaction((scores) => {
    let count = 0;
    for (const s of scores) {
      const cc = parseFloat(s.diem_cc) || 0;
      const gk = parseFloat(s.diem_gk) || 0;
      const ck = parseFloat(s.diem_ck) || 0;
      const tb = Math.round((cc * 0.1 + gk * 0.3 + ck * 0.6) * 100) / 100;
      const [chu, dg] = calcGrade(tb);
      insertOrUpdate.run(s.sinh_vien_id, lop_hoc_phan_id, cc, gk, ck, tb, chu, dg, s.lan_thi || 1, s.ghi_chu || null, gv.id);
      count++;
    }
    return count;
  });

  const count = insertMany(scores);
  logAction(req.user.id, 'NHAP_DIEM_BATCH', 'bang_diem', null, `GV ${gv.ma_gv} nhập điểm hàng loạt ${count} SV - LHP ${lop_hoc_phan_id}`, req.ip);
  res.json({ message: `Nhập điểm thành công ${count} sinh viên` });
});

// ==================== SINH VIÊN ROUTES ====================

// Profile
app.get('/api/sv/profile', authMiddleware, requireRole('sinh_vien'), (req, res) => {
  const sv = db.prepare('SELECT sv.*, u.email as user_email, u.last_login FROM sinh_vien sv JOIN users u ON sv.user_id = u.id WHERE sv.user_id = ?').get(req.user.id);
  res.json(sv);
});

// Bảng điểm
app.get('/api/sv/bang-diem', authMiddleware, requireRole('sinh_vien'), (req, res) => {
  const sv = db.prepare('SELECT * FROM sinh_vien WHERE user_id = ?').get(req.user.id);
  if (!sv) return res.status(404).json({ error: 'Không tìm thấy thông tin sinh viên' });

  const diem = db.prepare(`
    SELECT bd.*, mh.ten_mh, mh.ma_mh, mh.so_tin_chi, 
           lhp.ma_lhp, lhp.hoc_ky, lhp.nam_hoc, lhp.phong_hoc, lhp.lich_hoc,
           gv.ho_ten as ten_gv
    FROM bang_diem bd
    JOIN lop_hoc_phan lhp ON bd.lop_hoc_phan_id = lhp.id
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    LEFT JOIN giang_vien gv ON lhp.giang_vien_id = gv.id
    WHERE bd.sinh_vien_id = ?
    ORDER BY lhp.nam_hoc DESC, lhp.hoc_ky DESC, mh.ma_mh
  `).all(sv.id);

  // Tính GPA
  const validDiem = diem.filter(d => d.diem_tb !== null);
  const totalTC = validDiem.reduce((s, d) => s + d.so_tin_chi, 0);
  const tongDiemHe4 = validDiem.reduce((s, d) => {
    const h4 = d.diem_tb >= 9 ? 4 : d.diem_tb >= 8.5 ? 4 : d.diem_tb >= 8 ? 3.5 : d.diem_tb >= 7 ? 3 : d.diem_tb >= 6.5 ? 2.5 : d.diem_tb >= 5.5 ? 2 : d.diem_tb >= 5 ? 1.5 : d.diem_tb >= 4 ? 1 : 0;
    return s + h4 * d.so_tin_chi;
  }, 0);
  const gpa4 = totalTC > 0 ? Math.round(tongDiemHe4 / totalTC * 100) / 100 : 0;
  const gpa10 = totalTC > 0 ? Math.round(validDiem.reduce((s, d) => s + d.diem_tb * d.so_tin_chi, 0) / totalTC * 100) / 100 : 0;

  res.json({ diem, totalTC, gpa4, gpa10, sinhVien: sv });
});

// Thời khóa biểu
app.get('/api/sv/thoi-khoa-bieu', authMiddleware, requireRole('sinh_vien'), (req, res) => {
  const sv = db.prepare('SELECT * FROM sinh_vien WHERE user_id = ?').get(req.user.id);
  const list = db.prepare(`
    SELECT lhp.*, mh.ten_mh, mh.ma_mh, gv.ho_ten as ten_gv
    FROM dang_ky_hoc dkh
    JOIN lop_hoc_phan lhp ON dkh.lop_hoc_phan_id = lhp.id
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    LEFT JOIN giang_vien gv ON lhp.giang_vien_id = gv.id
    WHERE dkh.sinh_vien_id = ? AND lhp.trang_thai = 'Đang học'
  `).all(sv.id);
  res.json(list);
});

// Thông báo
app.get('/api/sv/thong-bao', authMiddleware, (req, res) => {
  const tbs = db.prepare('SELECT * FROM thong_bao WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json(tbs);
});

app.put('/api/sv/thong-bao/:id/doc', authMiddleware, (req, res) => {
  db.prepare('UPDATE thong_bao SET da_doc = 1 WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ message: 'OK' });
});

// ==================== SHARED ROUTES ====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), db: 'SQLite connected' });
});

app.get('/api/mon-hoc', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM mon_hoc WHERE is_active = 1 ORDER BY ma_mh').all());
});

app.get('/api/lop-hoc-phan', authMiddleware, (req, res) => {
  const list = db.prepare(`
    SELECT lhp.*, mh.ten_mh, mh.ma_mh, gv.ho_ten as ten_gv
    FROM lop_hoc_phan lhp
    JOIN mon_hoc mh ON lhp.mon_hoc_id = mh.id
    LEFT JOIN giang_vien gv ON lhp.giang_vien_id = gv.id
    ORDER BY lhp.nam_hoc DESC
  `).all();
  res.json(list);
});

// ==================== START SERVER ====================
initDB();
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`📦 Database: ${path.join(DATA_DIR, 'qldsv.db')}`);
});
