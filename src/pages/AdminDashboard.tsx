import React, { useState, useEffect, useCallback } from 'react';
import { User } from './Login';
import api from '../api';

interface AdminProps { user: User; onLogout: () => void; }

type AdminPage = 'dashboard' | 'users' | 'sinhvien' | 'giangvien' | 'monhoc' | 'lophocphan' | 'bangdiem' | 'phanquyen' | 'auditlog';

const COLORS = { navy: '#1a2448', accent: '#f97316', blue: '#3b82f6', green: '#22c55e', red: '#ef4444', yellow: '#eab308' };

export default function AdminDashboard({ user, onLogout }: AdminProps) {
  const [page, setPage] = useState<AdminPage>('dashboard');
  const [stats, setStats] = useState<Record<string, unknown>>({});
  const [users, setUsers] = useState<unknown[]>([]);
  const [svList, setSvList] = useState<unknown[]>([]);
  const [gvList, setGvList] = useState<unknown[]>([]);
  const [monHocList, setMonHocList] = useState<unknown[]>([]);
  const [lhpList, setLhpList] = useState<unknown[]>([]);
  const [bangDiem, setBangDiem] = useState<unknown[]>([]);
  const [phanQuyen, setPhanQuyen] = useState<unknown[]>([]);
  const [auditLog, setAuditLog] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchSV, setSearchSV] = useState('');
  const [modal, setModal] = useState<{ type: string; data?: Record<string, unknown> } | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const loadData = useCallback(async (p: AdminPage) => {
    setLoading(true);
    try {
      if (p === 'dashboard') { const d = await api.adminStats(); setStats(d); }
      else if (p === 'users') { const d = await api.adminGetUsers(); setUsers(d); }
      else if (p === 'sinhvien') { const d = await api.adminGetSV(); setSvList(d); }
      else if (p === 'giangvien') { const d = await api.adminGetGV(); setGvList(d); }
      else if (p === 'monhoc') { const d = await api.adminGetMonHoc(); setMonHocList(d); }
      else if (p === 'lophocphan') { const d = await api.adminGetLHP(); setLhpList(d); }
      else if (p === 'bangdiem') { const d = await api.adminGetBangDiem(); setBangDiem(d); }
      else if (p === 'phanquyen') {
        const [pq, gv, lhp] = await Promise.all([api.adminGetPhanQuyen(), api.adminGetGV(), api.adminGetLHP()]);
        setPhanQuyen(pq); setGvList(gv); setLhpList(lhp);
      }
      else if (p === 'auditlog') { const d = await api.adminAuditLog(); setAuditLog(d); }
    } catch (e: unknown) {
      showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi tải dữ liệu'));
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(page); }, [page, loadData]);

  const navGo = (p: AdminPage) => setPage(p);

  // Modal form handler
  const openModal = (type: string, data?: Record<string, unknown>) => { setModal({ type, data }); setForm(data || {}); };
  const closeModal = () => { setModal(null); setForm({}); };

  const handleCreateUser = async () => {
    try {
      await api.adminCreateUser(form);
      showToast('✅ Tạo tài khoản thành công');
      closeModal(); loadData('users');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleToggleUser = async (u: Record<string, unknown>) => {
    try {
      const res = await api.adminToggleUser(u.id as number);
      showToast(`✅ ${res.message}`); loadData('users');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleResetPw = async (u: Record<string, unknown>) => {
    try {
      await api.adminResetPassword(u.id as number, '123456');
      showToast(`✅ Đã reset mật khẩu về "123456"`);
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleCreateSV = async () => {
    try {
      await api.adminCreateSV(form);
      showToast('✅ Thêm sinh viên thành công');
      closeModal(); loadData('sinhvien');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleDeleteSV = async (id: number) => {
    if (!confirm('Xác nhận xóa sinh viên này?')) return;
    try {
      await api.adminDeleteSV(id);
      showToast('✅ Đã xóa sinh viên'); loadData('sinhvien');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleCreateMH = async () => {
    try {
      await api.adminCreateMonHoc(form);
      showToast('✅ Thêm môn học thành công');
      closeModal(); loadData('monhoc');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handlePhanQuyen = async () => {
    try {
      await api.adminPhanQuyen(form);
      showToast('✅ Phân quyền thành công');
      closeModal(); loadData('phanquyen');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  const handleRevokeQuyen = async (id: number) => {
    try {
      await api.adminRevokePhanQuyen(id);
      showToast('✅ Thu hồi quyền thành công'); loadData('phanquyen');
    } catch (e: unknown) { showToast('❌ ' + (e instanceof Error ? e.message : 'Lỗi')); }
  };

  // ---- STYLES ----
  const sideStyle: React.CSSProperties = { width: 220, background: COLORS.navy, minHeight: '100vh', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 100 };
  const mainStyle: React.CSSProperties = { marginLeft: 220, minHeight: '100vh', background: '#f1f5f9', padding: '24px' };
  const headerStyle: React.CSSProperties = { background: COLORS.navy, position: 'fixed', top: 0, left: 220, right: 0, height: 52, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12, zIndex: 99, borderBottom: '1px solid rgba(255,255,255,0.1)' };
  const card = (style?: React.CSSProperties): React.CSSProperties => ({ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', ...style });
  const btn = (bg: string, color = 'white'): React.CSSProperties => ({ padding: '8px 16px', background: bg, color, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' });
  const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' };
  const th: React.CSSProperties = { padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' };
  const td: React.CSSProperties = { padding: '10px 12px', fontSize: 13.5, color: '#334155', borderBottom: '1px solid #f1f5f9' };

  const navItem = (p: AdminPage, icon: string, label: string) => (
    <div key={p} onClick={() => navGo(p)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px', cursor: 'pointer', color: page === p ? COLORS.accent : '#94a3b8', background: page === p ? 'rgba(249,115,22,0.1)' : 'transparent', borderLeft: `3px solid ${page === p ? COLORS.accent : 'transparent'}`, fontSize: 13.5, fontWeight: page === p ? 600 : 400, transition: 'all 0.2s' }}>
      <span>{icon}</span><span>{label}</span>
    </div>
  );

  const statCard = (value: unknown, label: string, color: string, icon: string) => (
    <div style={{ background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div><div style={{ fontSize: 24, fontWeight: 800, color: COLORS.navy, lineHeight: 1 }}>{String(value)}</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{label}</div></div>
    </div>
  );

  const roleBadge = (role: string) => {
    const map: Record<string, [string, string]> = { admin: ['#fee2e2', '#dc2626'], giang_vien: ['#fff7ed', '#ea580c'], sinh_vien: ['#eff6ff', '#2563eb'] };
    const labels: Record<string, string> = { admin: 'Admin', giang_vien: 'Giảng viên', sinh_vien: 'Sinh viên' };
    const [bg, color] = map[role] || ['#f1f5f9', '#64748b'];
    return <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: bg, color }}>{labels[role] || role}</span>;
  };

  const filteredUsers = (users as Record<string, unknown>[]).filter(u => !searchUser || String(u.full_name).toLowerCase().includes(searchUser.toLowerCase()) || String(u.username).toLowerCase().includes(searchUser.toLowerCase()));
  const filteredSV = (svList as Record<string, unknown>[]).filter(s => !searchSV || String(s.ho_ten).toLowerCase().includes(searchSV.toLowerCase()) || String(s.ma_sv).toLowerCase().includes(searchSV.toLowerCase()));

  return (
    <div style={{ display: 'flex', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={sideStyle}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚙️</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>QUẢN TRỊ<br /><span style={{ fontWeight: 400, fontSize: 11, opacity: 0.7 }}>Hệ thống QLDSV</span></div>
        </div>
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {navItem('dashboard', '🏠', 'Tổng quan')}
          {navItem('users', '👥', 'Tài khoản')}
          {navItem('sinhvien', '🎓', 'Sinh viên')}
          {navItem('giangvien', '👨‍🏫', 'Giảng viên')}
          {navItem('monhoc', '📚', 'Môn học')}
          {navItem('lophocphan', '🏫', 'Lớp học phần')}
          {navItem('bangdiem', '📊', 'Bảng điểm')}
          {navItem('phanquyen', '🔐', 'Phân quyền GV')}
          {navItem('auditlog', '📋', 'Nhật ký hệ thống')}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{user.full_name}</div>
          <button onClick={onLogout} style={{ ...btn('#ef4444'), width: '100%', fontSize: 12 }}>🚪 Đăng xuất</button>
        </div>
      </aside>

      {/* HEADER */}
      <header style={headerStyle}>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>
          {page === 'dashboard' && '🏠 Tổng quan hệ thống'}
          {page === 'users' && '👥 Quản lý tài khoản'}
          {page === 'sinhvien' && '🎓 Quản lý sinh viên'}
          {page === 'giangvien' && '👨‍🏫 Quản lý giảng viên'}
          {page === 'monhoc' && '📚 Quản lý môn học'}
          {page === 'lophocphan' && '🏫 Lớp học phần'}
          {page === 'bangdiem' && '📊 Bảng điểm'}
          {page === 'phanquyen' && '🔐 Phân quyền giảng viên'}
          {page === 'auditlog' && '📋 Nhật ký hệ thống'}
        </div>
        <div style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: 12 }}>Đăng nhập lúc: {new Date().toLocaleString('vi-VN')}</div>
      </header>

      {/* MAIN */}
      <main style={{ ...mainStyle, marginTop: 52 }}>
        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>⏳ Đang tải dữ liệu...</div>}

        {/* DASHBOARD */}
        {!loading && page === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
              {statCard(stats.totalSV ?? 0, 'Tổng sinh viên', COLORS.blue, '🎓')}
              {statCard(stats.totalGV ?? 0, 'Giảng viên', COLORS.accent, '👨‍🏫')}
              {statCard(stats.totalMH ?? 0, 'Môn học', COLORS.green, '📚')}
              {statCard(stats.totalUsers ?? 0, 'Tài khoản', COLORS.navy, '👥')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={card()}>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>📊 Phân bố điểm</div>
                {((stats.gradeDistrib as Record<string, unknown>[]) || []).map((g: Record<string, unknown>) => (
                  <div key={String(g.diem_chu)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontWeight: 600 }}>Loại {String(g.diem_chu)}</span>
                    <span style={{ color: COLORS.navy, fontWeight: 700 }}>{String(g.count)} SV</span>
                  </div>
                ))}
              </div>
              <div style={card()}>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>📋 Hoạt động gần đây</div>
                {((stats.recentLogs as Record<string, unknown>[]) || []).slice(0, 8).map((l: Record<string, unknown>, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', color: COLORS.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {String(l.full_name || '').split(' ').pop()?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, color: '#1e293b' }}>{String(l.action)}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{String(l.full_name)} · {String(l.created_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {!loading && page === 'users' && (
          <div style={card()}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <input value={searchUser} onChange={e => setSearchUser(e.target.value)} placeholder="🔍 Tìm tài khoản..." style={{ ...inp, maxWidth: 260 }} />
              <button onClick={() => openModal('createUser')} style={btn(COLORS.navy)}>+ Tạo tài khoản</button>
              <button onClick={() => loadData('users')} style={btn('#64748b')}>🔄 Làm mới</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['#', 'Username', 'Họ tên', 'Vai trò', 'Email', 'Trạng thái', 'Đăng nhập cuối', 'Thao tác'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {filteredUsers.map((u: Record<string, unknown>, i: number) => (
                    <tr key={String(u.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={td}>{i + 1}</td>
                      <td style={td}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{String(u.username)}</code></td>
                      <td style={{ ...td, fontWeight: 600 }}>{String(u.full_name)}</td>
                      <td style={td}>{roleBadge(String(u.role))}</td>
                      <td style={{ ...td, fontSize: 12, color: '#64748b' }}>{String(u.email || '—')}</td>
                      <td style={td}>
                        <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: u.is_active ? '#dcfce7' : '#fee2e2', color: u.is_active ? '#166534' : '#dc2626' }}>
                          {u.is_active ? '✓ Hoạt động' : '✗ Bị khóa'}
                        </span>
                      </td>
                      <td style={{ ...td, fontSize: 11, color: '#94a3b8' }}>{u.last_login ? String(u.last_login) : '—'}</td>
                      <td style={td}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => handleToggleUser(u)} style={{ ...btn(u.is_active ? '#fef2f2' : '#f0fdf4', u.is_active ? '#dc2626' : '#16a34a'), padding: '4px 10px', fontSize: 11 }}>
                            {u.is_active ? '🔒 Khóa' : '🔓 Mở'}
                          </button>
                          <button onClick={() => handleResetPw(u)} style={{ ...btn('#fef9c3', '#92400e'), padding: '4px 10px', fontSize: 11 }}>🔑 Reset</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SINH VIÊN */}
        {!loading && page === 'sinhvien' && (
          <div style={card()}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <input value={searchSV} onChange={e => setSearchSV(e.target.value)} placeholder="🔍 Tìm theo tên, MSSV..." style={{ ...inp, maxWidth: 280 }} />
              <button onClick={() => openModal('createSV')} style={btn(COLORS.navy)}>+ Thêm sinh viên</button>
              <button onClick={() => loadData('sinhvien')} style={btn('#64748b')}>🔄 Làm mới</button>
              <div style={{ marginLeft: 'auto', fontSize: 13, color: '#64748b', alignSelf: 'center' }}>Tổng: <b>{filteredSV.length}</b> sinh viên</div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['#', 'MSSV', 'Họ tên', 'Lớp', 'Ngành', 'SĐT', 'Trạng thái', 'Thao tác'].map(h => <th key={h} style={th}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {filteredSV.map((s: Record<string, unknown>, i: number) => (
                    <tr key={String(s.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={td}>{i + 1}</td>
                      <td style={{ ...td, fontWeight: 700, color: COLORS.navy }}>{String(s.ma_sv)}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{String(s.ho_ten)}</td>
                      <td style={td}>{String(s.lop || '—')}</td>
                      <td style={{ ...td, fontSize: 12 }}>{String(s.nganh || '—')}</td>
                      <td style={{ ...td, fontSize: 12 }}>{String(s.sdt || '—')}</td>
                      <td style={td}>
                        <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.trang_thai === 'Đang học' ? '#dcfce7' : '#fee2e2', color: s.trang_thai === 'Đang học' ? '#166534' : '#dc2626' }}>
                          {String(s.trang_thai || 'Đang học')}
                        </span>
                      </td>
                      <td style={td}>
                        <button onClick={() => handleDeleteSV(s.id as number)} style={{ ...btn('#fee2e2', '#dc2626'), padding: '4px 10px', fontSize: 11 }}>🗑️ Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GIẢNG VIÊN */}
        {!loading && page === 'giangvien' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {(gvList as Record<string, unknown>[]).map((gv: Record<string, unknown>) => (
              <div key={String(gv.id)} style={card()}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #1e2d5a, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16 }}>
                    {String(gv.ho_ten || '').split(' ').pop()?.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: COLORS.navy }}>{String(gv.ho_ten)}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Mã: {String(gv.ma_gv)} · {String(gv.khoa || '')}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div><span style={{ color: '#64748b' }}>Học vị:</span> <b>{String(gv.hoc_vi || '—')}</b></div>
                  <div><span style={{ color: '#64748b' }}>Môn PC:</span> <b style={{ color: COLORS.accent }}>{String(gv.so_mon_phan_cong || 0)}</b></div>
                  <div><span style={{ color: '#64748b' }}>Email:</span> <span style={{ fontSize: 11 }}>{String(gv.email || '—')}</span></div>
                  <div><span style={{ color: '#64748b' }}>SĐT:</span> {String(gv.sdt || '—')}</div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, fontWeight: 600, background: gv.is_active ? '#dcfce7' : '#fee2e2', color: gv.is_active ? '#166534' : '#dc2626' }}>
                    {gv.is_active ? '✓ Hoạt động' : '✗ Bị khóa'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MÔN HỌC */}
        {!loading && page === 'monhoc' && (
          <div style={card()}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button onClick={() => openModal('createMH')} style={btn(COLORS.navy)}>+ Thêm môn học</button>
              <button onClick={() => loadData('monhoc')} style={btn('#64748b')}>🔄 Làm mới</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Mã MH', 'Tên môn học', 'Tín chỉ', 'Khoa', 'Trạng thái'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
              <tbody>
                {(monHocList as Record<string, unknown>[]).map((m: Record<string, unknown>, i: number) => (
                  <tr key={String(m.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ ...td, fontWeight: 700, color: COLORS.navy, fontFamily: 'monospace' }}>{String(m.ma_mh)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{String(m.ten_mh)}</td>
                    <td style={{ ...td, textAlign: 'center' }}><b>{String(m.so_tin_chi)}</b></td>
                    <td style={td}>{String(m.khoa || '—')}</td>
                    <td style={td}><span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: m.is_active ? '#dcfce7' : '#fee2e2', color: m.is_active ? '#166534' : '#dc2626' }}>{m.is_active ? 'Đang dạy' : 'Tạm dừng'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* LỚP HỌC PHẦN */}
        {!loading && page === 'lophocphan' && (
          <div style={card()}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{['Mã LHP', 'Môn học', 'TC', 'Giảng viên', 'Học kỳ', 'Năm học', 'Phòng', 'Sĩ số'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                <tbody>
                  {(lhpList as Record<string, unknown>[]).map((l: Record<string, unknown>, i: number) => (
                    <tr key={String(l.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{String(l.ma_lhp)}</td>
                      <td style={{ ...td, fontWeight: 600, maxWidth: 200 }}>{String(l.ten_mh)}</td>
                      <td style={{ ...td, textAlign: 'center' }}>{String(l.so_tin_chi)}</td>
                      <td style={td}>{String(l.ten_gv || '—')}</td>
                      <td style={td}>HK{String(l.hoc_ky)}</td>
                      <td style={td}>{String(l.nam_hoc)}</td>
                      <td style={td}>{String(l.phong_hoc || '—')}</td>
                      <td style={{ ...td, textAlign: 'center', fontWeight: 600 }}>{String(l.si_so || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BẢNG ĐIỂM */}
        {!loading && page === 'bangdiem' && (
          <div style={card()}>
            <div style={{ marginBottom: 16, fontSize: 14, color: '#64748b' }}>Tổng: <b>{bangDiem.length}</b> bản ghi điểm</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{['MSSV', 'Họ tên', 'Môn học', 'HK', 'CC', 'GK', 'CK', 'TB', 'Chữ', 'GV nhập'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                <tbody>
                  {(bangDiem as Record<string, unknown>[]).map((b: Record<string, unknown>, i: number) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: 12 }}>{String(b.ma_sv)}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{String(b.ten_sv)}</td>
                      <td style={{ ...td, maxWidth: 160, fontSize: 12 }}>{String(b.ten_mh)}</td>
                      <td style={td}>HK{String(b.hoc_ky)}</td>
                      <td style={{ ...td, textAlign: 'center' }}>{b.diem_cc !== null ? String(b.diem_cc) : '—'}</td>
                      <td style={{ ...td, textAlign: 'center' }}>{b.diem_gk !== null ? String(b.diem_gk) : '—'}</td>
                      <td style={{ ...td, textAlign: 'center' }}>{b.diem_ck !== null ? String(b.diem_ck) : '—'}</td>
                      <td style={{ ...td, textAlign: 'center', fontWeight: 700, color: (b.diem_tb as number) >= 5 ? COLORS.green : COLORS.red }}>{b.diem_tb !== null ? String(b.diem_tb) : '—'}</td>
                      <td style={td}><span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: (b.diem_tb as number) >= 5 ? '#dcfce7' : '#fee2e2', color: (b.diem_tb as number) >= 5 ? '#166534' : '#dc2626' }}>{String(b.diem_chu || '—')}</span></td>
                      <td style={{ ...td, fontSize: 11, color: '#64748b' }}>{String(b.ten_gv || '—')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PHÂN QUYỀN */}
        {!loading && page === 'phanquyen' && (
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button onClick={() => openModal('phanQuyen')} style={btn(COLORS.navy)}>🔐 Phân quyền mới</button>
              <button onClick={() => loadData('phanquyen')} style={btn('#64748b')}>🔄 Làm mới</button>
            </div>
            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>🔐 Danh sách phân quyền giảng viên</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{['Mã GV', 'Giảng viên', 'Lớp học phần', 'Môn học', 'Nhập điểm', 'Sửa điểm', 'Ngày cấp', 'Thu hồi'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                <tbody>
                  {(phanQuyen as Record<string, unknown>[]).map((p: Record<string, unknown>, i: number) => (
                    <tr key={String(p.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ ...td, fontFamily: 'monospace', fontWeight: 700 }}>{String(p.ma_gv)}</td>
                      <td style={{ ...td, fontWeight: 600 }}>{String(p.ten_gv)}</td>
                      <td style={{ ...td, fontSize: 11, fontFamily: 'monospace' }}>{String(p.ma_lhp)}</td>
                      <td style={{ ...td, fontSize: 12 }}>{String(p.ten_mh)}</td>
                      <td style={{ ...td, textAlign: 'center' }}><span style={{ fontSize: 16 }}>{p.quyen_nhap_diem ? '✅' : '❌'}</span></td>
                      <td style={{ ...td, textAlign: 'center' }}><span style={{ fontSize: 16 }}>{p.quyen_sua_diem ? '✅' : '❌'}</span></td>
                      <td style={{ ...td, fontSize: 11, color: '#94a3b8' }}>{String(p.ngay_cap || '—')}</td>
                      <td style={td}>
                        <button onClick={() => handleRevokeQuyen(p.id as number)} style={{ ...btn('#fee2e2', '#dc2626'), padding: '4px 10px', fontSize: 11 }}>Thu hồi</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AUDIT LOG */}
        {!loading && page === 'auditlog' && (
          <div style={card()}>
            <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>📋 Nhật ký hoạt động hệ thống (100 gần nhất)</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['#', 'Người dùng', 'Vai trò', 'Hành động', 'Bảng', 'Chi tiết', 'Thời gian'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
              <tbody>
                {(auditLog as Record<string, unknown>[]).map((l: Record<string, unknown>, i: number) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ ...td, color: '#94a3b8', fontSize: 12 }}>{i + 1}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{String(l.full_name)}</td>
                    <td style={td}>{roleBadge(String(l.role))}</td>
                    <td style={td}><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>{String(l.action)}</code></td>
                    <td style={{ ...td, fontSize: 12, color: '#64748b' }}>{String(l.target_table || '—')}</td>
                    <td style={{ ...td, fontSize: 12, maxWidth: 200 }}>{String(l.detail || '—')}</td>
                    <td style={{ ...td, fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap' }}>{String(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 28, width: 500, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.navy }}>
                {modal.type === 'createUser' && '👥 Tạo tài khoản mới'}
                {modal.type === 'createSV' && '🎓 Thêm sinh viên'}
                {modal.type === 'createMH' && '📚 Thêm môn học'}
                {modal.type === 'phanQuyen' && '🔐 Phân quyền giảng viên'}
              </div>
              <button onClick={closeModal} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#64748b' }}>×</button>
            </div>

            {modal.type === 'createUser' && (
              <div style={{ display: 'grid', gap: 14 }}>
                {[['username', 'Username *'], ['password', 'Mật khẩu *'], ['full_name', 'Họ tên *'], ['email', 'Email'], ['phone', 'SĐT']].map(([k, l]) => (
                  <div key={k}><label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{l}</label>
                    <input type={k === 'password' ? 'password' : 'text'} value={String(form[k] || '')} onChange={e => setForm({ ...form, [k]: e.target.value })} style={inp} /></div>
                ))}
                <div><label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>Vai trò *</label>
                  <select value={String(form.role || '')} onChange={e => setForm({ ...form, role: e.target.value })} style={inp}>
                    <option value="">-- Chọn vai trò --</option>
                    <option value="admin">Admin</option>
                    <option value="giang_vien">Giảng viên</option>
                    <option value="sinh_vien">Sinh viên</option>
                  </select></div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={handleCreateUser} style={{ ...btn(COLORS.navy), flex: 1 }}>✅ Tạo tài khoản</button>
                  <button onClick={closeModal} style={{ ...btn('#f1f5f9', '#64748b'), flex: 1 }}>Hủy</button>
                </div>
              </div>
            )}

            {modal.type === 'createSV' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[['ma_sv', 'Mã SV *'], ['ho_ten', 'Họ tên *'], ['ngay_sinh', 'Ngày sinh'], ['lop', 'Lớp'], ['nganh', 'Ngành'], ['khoa', 'Khóa'], ['sdt', 'SĐT'], ['email', 'Email']].map(([k, l]) => (
                  <div key={k} style={{ gridColumn: ['ho_ten', 'nganh'].includes(k) ? '1/-1' : 'auto' }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{l}</label>
                    <input type={k === 'ngay_sinh' ? 'date' : 'text'} value={String(form[k] || '')} onChange={e => setForm({ ...form, [k]: e.target.value })} style={inp} />
                  </div>
                ))}
                <div style={{ gridColumn: '1/-1', display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={handleCreateSV} style={{ ...btn(COLORS.navy), flex: 1 }}>✅ Thêm sinh viên</button>
                  <button onClick={closeModal} style={{ ...btn('#f1f5f9', '#64748b'), flex: 1 }}>Hủy</button>
                </div>
              </div>
            )}

            {modal.type === 'createMH' && (
              <div style={{ display: 'grid', gap: 14 }}>
                {[['ma_mh', 'Mã môn học *'], ['ten_mh', 'Tên môn học *'], ['so_tin_chi', 'Số tín chỉ *'], ['khoa', 'Khoa'], ['mo_ta', 'Mô tả']].map(([k, l]) => (
                  <div key={k}><label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>{l}</label>
                    <input type={k === 'so_tin_chi' ? 'number' : 'text'} value={String(form[k] || '')} onChange={e => setForm({ ...form, [k]: e.target.value })} style={inp} /></div>
                ))}
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={handleCreateMH} style={{ ...btn(COLORS.navy), flex: 1 }}>✅ Thêm môn học</button>
                  <button onClick={closeModal} style={{ ...btn('#f1f5f9', '#64748b'), flex: 1 }}>Hủy</button>
                </div>
              </div>
            )}

            {modal.type === 'phanQuyen' && (
              <div style={{ display: 'grid', gap: 14 }}>
                <div><label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>Giảng viên *</label>
                  <select value={String(form.giang_vien_id || '')} onChange={e => setForm({ ...form, giang_vien_id: e.target.value })} style={inp}>
                    <option value="">-- Chọn giảng viên --</option>
                    {(gvList as Record<string, unknown>[]).map((g: Record<string, unknown>) => <option key={String(g.id)} value={String(g.id)}>{String(g.ma_gv)} - {String(g.ho_ten)}</option>)}
                  </select></div>
                <div><label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 5 }}>Lớp học phần *</label>
                  <select value={String(form.lop_hoc_phan_id || '')} onChange={e => setForm({ ...form, lop_hoc_phan_id: e.target.value })} style={inp}>
                    <option value="">-- Chọn lớp học phần --</option>
                    {(lhpList as Record<string, unknown>[]).map((l: Record<string, unknown>) => <option key={String(l.id)} value={String(l.id)}>{String(l.ma_mh)} - {String(l.ten_mh)} (HK{String(l.hoc_ky)}/{String(l.nam_hoc)})</option>)}
                  </select></div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                    <input type="checkbox" checked={!!form.quyen_nhap_diem} onChange={e => setForm({ ...form, quyen_nhap_diem: e.target.checked })} style={{ width: 16, height: 16 }} />
                    Quyền nhập điểm
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                    <input type="checkbox" checked={!!form.quyen_sua_diem} onChange={e => setForm({ ...form, quyen_sua_diem: e.target.checked })} style={{ width: 16, height: 16 }} />
                    Quyền sửa điểm
                  </label>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button onClick={handlePhanQuyen} style={{ ...btn(COLORS.navy), flex: 1 }}>🔐 Xác nhận phân quyền</button>
                  <button onClick={closeModal} style={{ ...btn('#f1f5f9', '#64748b'), flex: 1 }}>Hủy</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: toast.startsWith('❌') ? '#dc2626' : '#166534', color: 'white', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999, maxWidth: 360 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
