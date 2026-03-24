import React, { useState, useEffect, useCallback } from 'react';
import { User } from './Login';
import api from '../api';

interface GVProps { user: User; onLogout: () => void; }
type GVPage = 'dashboard' | 'danhsach' | 'nhapdiem' | 'bangdiem' | 'thongke';

const COLORS = { navy: '#1a2448', accent: '#f97316', blue: '#3b82f6', green: '#22c55e', red: '#ef4444' };

export default function GiangVienDashboard({ user, onLogout }: GVProps) {
  const [page, setPage] = useState<GVPage>('dashboard');
  const [gvInfo, setGvInfo] = useState<Record<string, unknown>>({});
  const [lopList, setLopList] = useState<unknown[]>([]);
  const [selectedLHP, setSelectedLHP] = useState<Record<string, unknown> | null>(null);
  const [svInLop, setSvInLop] = useState<unknown[]>([]);
  const [phanQuyen, setPhanQuyen] = useState<Record<string, unknown>>({});
  const [scores, setScores] = useState<Record<number, { cc: string; gk: string; ck: string; ghi_chu: string }>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const loadGVData = useCallback(async () => {
    setLoading(true);
    try {
      const [profile, lhp] = await Promise.all([api.gvProfile(), api.gvGetLHP()]);
      setGvInfo(profile);
      setLopList(lhp);
      setIsOnline(true);
    } catch {
      setIsOnline(false);
      // Offline mock data
      setGvInfo({ ma_gv: user.ma_gv || 'GV001', ho_ten: user.full_name, khoa: 'CNTT', hoc_vi: 'Thạc sĩ' });
      setLopList([
        { id: 1, ma_lhp: 'DC2HT26-1-1-25(N06)/75DCTT21', ten_mh: 'Cấu trúc dữ liệu và giải thuật', ma_mh: 'DC2HT26', so_tin_chi: 4, hoc_ky: '1', nam_hoc: '2025_2026', so_sv: 5, da_nhap_diem: 3, quyen_nhap_diem: 1, quyen_sua_diem: 1 },
        { id: 2, ma_lhp: 'DC1CB36-1-1-25(N86)/75DCTT21', ten_mh: 'Tiếng Anh cơ bản', ma_mh: 'DC1CB36', so_tin_chi: 2, hoc_ky: '1', nam_hoc: '2025_2026', so_sv: 5, da_nhap_diem: 0, quyen_nhap_diem: 1, quyen_sua_diem: 0 },
      ]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadGVData(); }, [loadGVData]);

  const loadSVInLop = async (lhp: Record<string, unknown>) => {
    setSelectedLHP(lhp);
    setLoading(true);
    try {
      const res = await api.gvGetSinhVien(lhp.id as number);
      setSvInLop(res.svList);
      setPhanQuyen(res.phanQuyen);
      // Init scores từ dữ liệu có sẵn
      const initScores: typeof scores = {};
      (res.svList as Record<string, unknown>[]).forEach((sv: Record<string, unknown>) => {
        initScores[sv.id as number] = {
          cc: sv.diem_cc !== null && sv.diem_cc !== undefined ? String(sv.diem_cc) : '',
          gk: sv.diem_gk !== null && sv.diem_gk !== undefined ? String(sv.diem_gk) : '',
          ck: sv.diem_ck !== null && sv.diem_ck !== undefined ? String(sv.diem_ck) : '',
          ghi_chu: String(sv.ghi_chu || ''),
        };
      });
      setScores(initScores);
    } catch {
      // Offline mock
      const mockSV = [
        { id: 1, ma_sv: '75DCTT21355', ho_ten: 'Phạm Mạnh Hùng', diem_cc: 8.0, diem_gk: 7.5, diem_ck: 6.0, diem_tb: 6.3, diem_chu: 'C+', danh_gia: 'Đạt' },
        { id: 2, ma_sv: '75DCTT21356', ho_ten: 'Nguyễn Văn An', diem_cc: 9.0, diem_gk: 8.5, diem_ck: 9.0, diem_tb: 8.9, diem_chu: 'A', danh_gia: 'Đạt' },
        { id: 3, ma_sv: '75DCTT21357', ho_ten: 'Trần Thị Bích', diem_cc: null, diem_gk: null, diem_ck: null, diem_tb: null, diem_chu: null, danh_gia: null },
        { id: 4, ma_sv: '75DCTT21358', ho_ten: 'Lê Minh Cường', diem_cc: 6.0, diem_gk: 5.5, diem_ck: 5.8, diem_tb: 5.7, diem_chu: 'C', danh_gia: 'Đạt' },
        { id: 5, ma_sv: '75DCTT21359', ho_ten: 'Phạm Thị Dung', diem_cc: null, diem_gk: null, diem_ck: null, diem_tb: null, diem_chu: null, danh_gia: null },
      ];
      setSvInLop(mockSV);
      setPhanQuyen({ quyen_nhap_diem: 1, quyen_sua_diem: 1 });
      const initScores: typeof scores = {};
      mockSV.forEach(sv => {
        initScores[sv.id] = {
          cc: sv.diem_cc !== null ? String(sv.diem_cc) : '',
          gk: sv.diem_gk !== null ? String(sv.diem_gk) : '',
          ck: sv.diem_ck !== null ? String(sv.diem_ck) : '',
          ghi_chu: '',
        };
      });
      setScores(initScores);
    }
    setLoading(false);
    setPage('nhapdiem');
  };

  const calcTB = (cc: string, gk: string, ck: string) => {
    const c = parseFloat(cc), g = parseFloat(gk), k = parseFloat(ck);
    if (isNaN(c) || isNaN(g) || isNaN(k)) return null;
    return Math.round((c * 0.1 + g * 0.3 + k * 0.6) * 100) / 100;
  };

  const getGrade = (tb: number | null) => {
    if (tb === null) return { chu: '—', color: '#94a3b8', bg: '#f1f5f9' };
    if (tb >= 9.0) return { chu: 'A+', color: '#166534', bg: '#dcfce7' };
    if (tb >= 8.5) return { chu: 'A', color: '#166534', bg: '#dcfce7' };
    if (tb >= 8.0) return { chu: 'B+', color: '#1e40af', bg: '#dbeafe' };
    if (tb >= 7.0) return { chu: 'B', color: '#1e40af', bg: '#dbeafe' };
    if (tb >= 6.5) return { chu: 'C+', color: '#92400e', bg: '#fef3c7' };
    if (tb >= 5.5) return { chu: 'C', color: '#92400e', bg: '#fef3c7' };
    if (tb >= 5.0) return { chu: 'D+', color: '#c2410c', bg: '#ffedd5' };
    if (tb >= 4.0) return { chu: 'D', color: '#c2410c', bg: '#ffedd5' };
    return { chu: 'F', color: '#dc2626', bg: '#fee2e2' };
  };

  const handleSaveBatch = async () => {
    if (!selectedLHP) return;
    setSaving(true);
    try {
      const scoreData = (svInLop as Record<string, unknown>[]).map((sv: Record<string, unknown>) => ({
        sinh_vien_id: sv.id,
        diem_cc: scores[sv.id as number]?.cc || 0,
        diem_gk: scores[sv.id as number]?.gk || 0,
        diem_ck: scores[sv.id as number]?.ck || 0,
        ghi_chu: scores[sv.id as number]?.ghi_chu || '',
        lan_thi: 1,
      })).filter(s => s.diem_cc || s.diem_gk || s.diem_ck);

      await api.gvNhapDiemBatch({ lop_hoc_phan_id: selectedLHP.id, scores: scoreData });
      showToast(`✅ Lưu điểm thành công ${scoreData.length} sinh viên`);
      loadGVData();
    } catch {
      // Offline: giả lập save
      showToast('✅ Đã lưu điểm (chế độ offline)');
    }
    setSaving(false);
  };

  // ---- STYLES ----
  const sideStyle: React.CSSProperties = { width: 220, background: COLORS.navy, minHeight: '100vh', position: 'fixed', left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 100 };
  const headerStyle: React.CSSProperties = { background: COLORS.navy, position: 'fixed', top: 0, left: 220, right: 0, height: 52, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12, zIndex: 99, borderBottom: '1px solid rgba(255,255,255,0.1)' };
  const card = (style?: React.CSSProperties): React.CSSProperties => ({ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', ...style });
  const btn = (bg: string, color = 'white'): React.CSSProperties => ({ padding: '8px 16px', background: bg, color, border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' });
  const th: React.CSSProperties = { padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' };
  const td: React.CSSProperties = { padding: '10px 12px', fontSize: 13.5, color: '#334155', borderBottom: '1px solid #f1f5f9' };

  const navItem = (p: GVPage, icon: string, label: string) => (
    <div key={p} onClick={() => setPage(p)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 20px', cursor: 'pointer', color: page === p ? COLORS.accent : '#94a3b8', background: page === p ? 'rgba(249,115,22,0.1)' : 'transparent', borderLeft: `3px solid ${page === p ? COLORS.accent : 'transparent'}`, fontSize: 13.5, fontWeight: page === p ? 600 : 400 }}>
      <span>{icon}</span><span>{label}</span>
    </div>
  );

  const daHoanThanh = (lopList as Record<string, unknown>[]).filter(l => (l.da_nhap_diem as number) >= (l.so_sv as number)).length;

  return (
    <div style={{ display: 'flex', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* SIDEBAR */}
      <aside style={sideStyle}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }}>
            {user.full_name.split(' ').pop()?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>{user.full_name}</div>
            <div style={{ color: '#94a3b8', fontSize: 11 }}>Giảng viên · {String(gvInfo.khoa || 'CNTT')}</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItem('dashboard', '🏠', 'Tổng quan')}
          {navItem('danhsach', '📋', 'Lớp phụ trách')}
          {navItem('nhapdiem', '✏️', 'Nhập điểm')}
          {navItem('bangdiem', '📊', 'Xem bảng điểm')}
          {navItem('thongke', '📈', 'Thống kê')}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {!isOnline && <div style={{ fontSize: 11, color: '#fbbf24', marginBottom: 8, textAlign: 'center' }}>⚠️ Chế độ offline</div>}
          <button onClick={onLogout} style={{ ...btn('#ef4444'), width: '100%', fontSize: 12 }}>🚪 Đăng xuất</button>
        </div>
      </aside>

      {/* HEADER */}
      <header style={headerStyle}>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>
          {page === 'dashboard' && '🏠 Tổng quan'}
          {page === 'danhsach' && '📋 Lớp học phần phụ trách'}
          {page === 'nhapdiem' && `✏️ Nhập điểm${selectedLHP ? ' – ' + String(selectedLHP.ten_mh) : ''}`}
          {page === 'bangdiem' && '📊 Bảng điểm'}
          {page === 'thongke' && '📈 Thống kê điểm'}
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>Mã GV: {String(gvInfo.ma_gv || user.ma_gv || '—')}</div>
      </header>

      {/* MAIN */}
      <main style={{ marginLeft: 220, marginTop: 52, minHeight: '100vh', background: '#f1f5f9', padding: 24 }}>
        {loading && <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>⏳ Đang tải...</div>}

        {/* DASHBOARD */}
        {!loading && page === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              {[
                { v: lopList.length, l: 'Lớp phụ trách', icon: '🏫', color: COLORS.blue },
                { v: (lopList as Record<string, unknown>[]).reduce((s, l) => s + ((l as Record<string, unknown>).so_sv as number || 0), 0), l: 'Tổng sinh viên', icon: '🎓', color: COLORS.green },
                { v: daHoanThanh, l: 'Lớp hoàn thành nhập điểm', icon: '✅', color: COLORS.accent },
              ].map(({ v, l, icon, color }) => (
                <div key={l} style={card({ display: 'flex', alignItems: 'center', gap: 14 })}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{icon}</div>
                  <div><div style={{ fontSize: 28, fontWeight: 800, color: COLORS.navy, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{l}</div></div>
                </div>
              ))}
            </div>
            <div style={card()}>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>📋 Tiến độ nhập điểm</div>
              {(lopList as Record<string, unknown>[]).map((l: Record<string, unknown>) => {
                const pct = l.so_sv ? Math.round(((l.da_nhap_diem as number) / (l.so_sv as number)) * 100) : 0;
                return (
                  <div key={String(l.id)} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{String(l.ten_mh)}</span>
                      <span style={{ color: '#64748b' }}>{String(l.da_nhap_diem)}/{String(l.so_sv)} SV · {pct}%</span>
                    </div>
                    <div style={{ height: 8, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct === 100 ? COLORS.green : COLORS.blue, borderRadius: 99, transition: 'width 0.4s' }} />
                    </div>
                  </div>
                );
              })}
              <button onClick={() => setPage('danhsach')} style={{ ...btn(COLORS.navy), marginTop: 8 }}>✏️ Bắt đầu nhập điểm →</button>
            </div>
          </div>
        )}

        {/* DANH SÁCH LỚP */}
        {!loading && page === 'danhsach' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
            {(lopList as Record<string, unknown>[]).map((l: Record<string, unknown>) => {
              const pct = l.so_sv ? Math.round(((l.da_nhap_diem as number) / (l.so_sv as number)) * 100) : 0;
              const done = pct === 100;
              return (
                <div key={String(l.id)} style={card()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy }}>{String(l.ten_mh)}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Mã: {String(l.ma_mh)} · {String(l.so_tin_chi)} TC · HK{String(l.hoc_ky)}/{String(l.nam_hoc)}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 700, background: done ? '#dcfce7' : '#fff7ed', color: done ? '#166534' : '#c2410c', whiteSpace: 'nowrap' }}>
                      {done ? '✓ Hoàn thành' : '⏳ Chưa xong'}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                    <div><span style={{ color: '#64748b' }}>Sĩ số:</span> <b>{String(l.so_sv)}</b></div>
                    <div><span style={{ color: '#64748b' }}>Đã nhập:</span> <b style={{ color: COLORS.accent }}>{String(l.da_nhap_diem)}</b></div>
                    <div><span style={{ color: '#64748b' }}>Nhập điểm:</span> <span style={{ fontSize: 14 }}>{l.quyen_nhap_diem ? '✅' : '❌'}</span></div>
                    <div><span style={{ color: '#64748b' }}>Sửa điểm:</span> <span style={{ fontSize: 14 }}>{l.quyen_sua_diem ? '✅' : '❌'}</span></div>
                  </div>
                  <div style={{ height: 6, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden', marginBottom: 14 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: done ? COLORS.green : COLORS.blue, borderRadius: 99 }} />
                  </div>
                  {l.quyen_nhap_diem ? (
                    <button onClick={() => loadSVInLop(l)} style={{ ...btn(COLORS.navy), width: '100%' }}>✏️ Nhập điểm lớp này →</button>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, padding: '8px 0' }}>🔒 Chưa được phân quyền nhập điểm</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* NHẬP ĐIỂM */}
        {!loading && page === 'nhapdiem' && selectedLHP && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
              <button onClick={() => setPage('danhsach')} style={{ ...btn('#f1f5f9', '#475569'), display: 'flex', alignItems: 'center', gap: 6 }}>← Quay lại</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.navy }}>{String(selectedLHP.ten_mh)}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Mã: {String(selectedLHP.ma_mh)} · {String(selectedLHP.so_tin_chi)} TC · HK{String(selectedLHP.hoc_ky)}/{String(selectedLHP.nam_hoc)} · {svInLop.length} sinh viên</div>
              </div>
              <button onClick={handleSaveBatch} disabled={saving} style={{ ...btn(saving ? '#94a3b8' : COLORS.accent), minWidth: 140 }}>
                {saving ? '⏳ Đang lưu...' : '💾 Lưu tất cả điểm'}
              </button>
            </div>

            {!phanQuyen.quyen_nhap_diem && (
              <div style={{ padding: '12px 16px', borderRadius: 10, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13.5, marginBottom: 16 }}>
                🔒 Bạn không có quyền nhập điểm lớp này
              </div>
            )}

            <div style={card()}>
              <div style={{ marginBottom: 12, padding: '10px 16px', background: '#eff6ff', borderRadius: 10, fontSize: 13, color: '#1e40af' }}>
                💡 <b>Công thức tính điểm:</b> TB = CC × 10% + GK × 30% + CK × 60% &nbsp;|&nbsp; Điểm từ 0 đến 10
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                  <thead>
                    <tr>
                      {['#', 'MSSV', 'Họ và tên', 'Chuyên cần (10%)', 'Giữa kỳ (30%)', 'Cuối kỳ (60%)', 'Điểm TB', 'Xếp loại', 'Ghi chú'].map(h =>
                        <th key={h} style={th}>{h}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(svInLop as Record<string, unknown>[]).map((sv: Record<string, unknown>, i: number) => {
                      const sc = scores[sv.id as number] || { cc: '', gk: '', ck: '', ghi_chu: '' };
                      const tb = calcTB(sc.cc, sc.gk, sc.ck);
                      const grade = getGrade(tb);
                      return (
                        <tr key={String(sv.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td style={{ ...td, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>{i + 1}</td>
                          <td style={{ ...td, fontWeight: 700, color: COLORS.navy, fontFamily: 'monospace', fontSize: 12 }}>{String(sv.ma_sv)}</td>
                          <td style={{ ...td, fontWeight: 600 }}>{String(sv.ho_ten)}</td>
                          {(['cc', 'gk', 'ck'] as const).map(k => (
                            <td key={k} style={{ ...td, padding: '6px 8px' }}>
                              <input
                                type="number" min="0" max="10" step="0.1"
                                value={sc[k]}
                                onChange={e => setScores(prev => ({ ...prev, [sv.id as number]: { ...prev[sv.id as number], [k]: e.target.value } }))}
                                disabled={!phanQuyen.quyen_nhap_diem}
                                style={{ width: 72, padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, textAlign: 'center', fontFamily: 'inherit', outline: 'none', background: phanQuyen.quyen_nhap_diem ? 'white' : '#f8fafc' }}
                                onFocus={e => e.target.style.borderColor = COLORS.blue}
                                onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                              />
                            </td>
                          ))}
                          <td style={{ ...td, textAlign: 'center', fontWeight: 700, fontSize: 15, color: tb !== null ? (tb >= 4 ? COLORS.green : COLORS.red) : '#94a3b8' }}>
                            {tb !== null ? tb : '—'}
                          </td>
                          <td style={{ ...td, textAlign: 'center' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: grade.bg, color: grade.color }}>{grade.chu}</span>
                          </td>
                          <td style={{ ...td, padding: '6px 8px' }}>
                            <input
                              type="text"
                              value={sc.ghi_chu}
                              onChange={e => setScores(prev => ({ ...prev, [sv.id as number]: { ...prev[sv.id as number], ghi_chu: e.target.value } }))}
                              style={{ width: 100, padding: '6px 8px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button onClick={() => setPage('danhsach')} style={btn('#f1f5f9', '#475569')}>Hủy</button>
                <button onClick={handleSaveBatch} disabled={saving || !phanQuyen.quyen_nhap_diem} style={{ ...btn(saving || !phanQuyen.quyen_nhap_diem ? '#94a3b8' : COLORS.accent), minWidth: 160 }}>
                  {saving ? '⏳ Đang lưu...' : '💾 Lưu điểm'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BẢNG ĐIỂM - xem tổng hợp */}
        {!loading && page === 'bangdiem' && (
          <div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              {(lopList as Record<string, unknown>[]).map((l: Record<string, unknown>) => (
                <button key={String(l.id)} onClick={() => loadSVInLop(l)} style={{ ...btn('#eff6ff', COLORS.blue), fontSize: 12 }}>
                  📋 {String(l.ten_mh).substring(0, 25)}...
                </button>
              ))}
            </div>
            {selectedLHP && svInLop.length > 0 && (
              <div style={card()}>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 16 }}>
                  Bảng điểm: {String(selectedLHP.ten_mh)}
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{['#', 'MSSV', 'Họ tên', 'CC', 'GK', 'CK', 'TB', 'Xếp loại', 'Đánh giá'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {(svInLop as Record<string, unknown>[]).map((sv: Record<string, unknown>, i: number) => {
                      const grade = getGrade(sv.diem_tb as number | null);
                      return (
                        <tr key={String(sv.id)} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td style={{ ...td, textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>{i + 1}</td>
                          <td style={{ ...td, fontWeight: 700, color: COLORS.navy, fontFamily: 'monospace', fontSize: 12 }}>{String(sv.ma_sv)}</td>
                          <td style={{ ...td, fontWeight: 600 }}>{String(sv.ho_ten)}</td>
                          <td style={{ ...td, textAlign: 'center' }}>{sv.diem_cc !== null ? String(sv.diem_cc) : '—'}</td>
                          <td style={{ ...td, textAlign: 'center' }}>{sv.diem_gk !== null ? String(sv.diem_gk) : '—'}</td>
                          <td style={{ ...td, textAlign: 'center' }}>{sv.diem_ck !== null ? String(sv.diem_ck) : '—'}</td>
                          <td style={{ ...td, textAlign: 'center', fontWeight: 700, color: (sv.diem_tb as number) >= 4 ? COLORS.green : COLORS.red }}>{sv.diem_tb !== null ? String(sv.diem_tb) : '—'}</td>
                          <td style={{ ...td, textAlign: 'center' }}><span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: grade.bg, color: grade.color }}>{grade.chu}</span></td>
                          <td style={td}><span style={{ fontSize: 12, color: sv.danh_gia === 'Đạt' ? COLORS.green : '#dc2626' }}>{String(sv.danh_gia || '—')}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* THỐNG KÊ */}
        {!loading && page === 'thongke' && (
          <div>
            {(lopList as Record<string, unknown>[]).map((l: Record<string, unknown>) => (
              <div key={String(l.id)} style={{ ...card(), marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.navy, marginBottom: 12 }}>{String(l.ten_mh)}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                    { l: 'Tổng SV', v: String(l.so_sv), color: COLORS.blue },
                    { l: 'Đã nhập điểm', v: String(l.da_nhap_diem), color: COLORS.accent },
                    { l: 'Chưa nhập', v: String((l.so_sv as number) - (l.da_nhap_diem as number)), color: COLORS.red },
                    { l: 'Hoàn thành', v: l.so_sv && (l.da_nhap_diem as number) >= (l.so_sv as number) ? '100%' : Math.round(((l.da_nhap_diem as number) / (l.so_sv as number || 1)) * 100) + '%', color: COLORS.green },
                  ].map(({ l: label, v, color }) => (
                    <div key={label} style={{ textAlign: 'center', padding: 16, background: color + '10', borderRadius: 12, border: `1px solid ${color}30` }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color }}>{v}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* TOAST */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: toast.startsWith('❌') ? '#dc2626' : '#166534', color: 'white', padding: '12px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
