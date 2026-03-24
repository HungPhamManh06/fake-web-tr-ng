import React, { useState } from 'react';
import {
  studentInfo, diemMoiList, tongDiem, bangDiemData,
  khoiKienThucData, ketQuaDangKyData, chuongTrinhHocData,
  congNhanDiemData, xetTotNghiepData, tracuuKetQuaDangKyData
} from './data';
import PageLichHocNew from './pages/LichHoc';
import PageLichThiNew from './pages/LichThi';
import PageHocPhiNew from './pages/HocPhi';
import PageThanhToanHocPhiNew from './pages/ThanhToanHocPhi';
import PageVanBanNew from './pages/VanBan';
import Login, { User } from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import GiangVienDashboard from './pages/GiangVienDashboard';

type PageId =
  | 'trangchu' | 'tinnuc' | 'tunhap-hoso'
  | 'tracuu-diem' | 'chuongtrinh-hoc' | 'xin-phuc-khao'
  | 'cong-nhan-diem' | 'xet-tot-nghiep'
  | 'dangky' | 'nguyen-vong' | 'tracuu-dangky'
  | 'dangky-thilai' | 'dinh-huong-dt'
  | 'lich-hoc' | 'lich-thi'
  | 'hoc-phi' | 'thanhtoan-hocphi'
  | 'vanban-quydinh';

// ==================== ICONS ====================
const Ic = {
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  OneStop: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13,17 18,12 13,7"/><polyline points="6,17 11,12 6,7"/></svg>,
  News: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>,
  Profile: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Study: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  Register: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  Schedule: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Finance: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>,
  Doc: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  ChevRight: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>,
  ChevDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6,9 12,15 18,9"/></svg>,
  Search: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  ChevDown2: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>,
  Info: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  File: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
  Award: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>,
  Bell: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  Grid: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
};

// ==================== MENU CONFIG ====================
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  children?: { id: PageId; label: string }[];
  page?: PageId;
}

const menuItems: MenuItem[] = [
  { id: 'trangchu', label: 'Trang chủ', icon: <Ic.Home />, page: 'trangchu' },
  { id: 'heThongMotCua', label: 'Hệ thống một cửa', icon: <Ic.OneStop /> },
  { id: 'tinnuc', label: 'Tin tức', icon: <Ic.News />, page: 'tinnuc' },
  {
    id: 'profile', label: 'Profile', icon: <Ic.Profile />,
    children: [{ id: 'tunhap-hoso', label: 'Tự nhập hồ sơ' }],
  },
  {
    id: 'gocHocTap', label: 'Góc học tập', icon: <Ic.Study />,
    children: [
      { id: 'tracuu-diem', label: 'Tra cứu điểm' },
      { id: 'chuongtrinh-hoc', label: 'Chương trình học' },
      { id: 'xin-phuc-khao', label: 'Đăng ký xin phúc khảo' },
      { id: 'cong-nhan-diem', label: 'Công nhận điểm' },
      { id: 'xet-tot-nghiep', label: 'Xét tốt nghiệp' },
    ],
  },
  {
    id: 'dangKyHoc', label: 'Đăng ký học', icon: <Ic.Register />,
    children: [
      { id: 'dangky', label: 'Đăng ký' },
      { id: 'nguyen-vong', label: 'Nguyện vọng' },
      { id: 'tracuu-dangky', label: 'Tra cứu kết quả đăng ký' },
      { id: 'dangky-thilai', label: 'Đăng ký thi lại' },
      { id: 'dinh-huong-dt', label: 'Đăng ký định hướng ĐT' },
    ],
  },
  {
    id: 'thoiKhoaBieu', label: 'Thời khóa biểu', icon: <Ic.Schedule />,
    children: [
      { id: 'lich-hoc', label: 'Lịch học' },
      { id: 'lich-thi', label: 'Lịch thi' },
    ],
  },
  {
    id: 'taiChinh', label: 'Tài chính', icon: <Ic.Finance />,
    children: [
      { id: 'hoc-phi', label: 'Học phí' },
      { id: 'thanhtoan-hocphi', label: 'Thanh toán học phí online' },
    ],
  },
  {
    id: 'vanBan', label: 'Văn bản', icon: <Ic.Doc />,
    children: [{ id: 'vanban-quydinh', label: 'Văn bản, quy định, biểu mẫu' }],
  },
];

// ==================== STUDENT SIDEBAR ====================
const StudentSidebar = ({ onNavigate: _onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <div style={{ width: 220, flexShrink: 0 }}>
    {/* Info card */}
    <div style={{ background: 'white', borderRadius: 10, padding: '14px 16px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e2d5a', marginBottom: 12, padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
        {studentInfo.nganh}
      </div>
      {[
        { icon: '👤', label: 'Họ tên:', val: studentInfo.hoTen, bold: true },
        { icon: '🪪', label: 'Mã số:', val: studentInfo.maSo, bold: true },
        { icon: '📅', label: 'Ngày sinh:', val: studentInfo.ngaySinh, bold: true },
        { icon: '⚧', label: 'Giới tính:', val: studentInfo.gioiTinh, bold: true },
        { icon: '📋', label: 'Trạng thái:', val: studentInfo.trangThai, bold: true },
        { icon: '🏫', label: 'Lớp:', val: studentInfo.lop, bold: true },
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 7, fontSize: 12.5 }}>
          <span style={{ color: '#64748b', minWidth: 70 }}>{r.label}</span>
          <span style={{ fontWeight: r.bold ? 700 : 400, color: '#1e293b' }}>{r.val}</span>
        </div>
      ))}
    </div>

    {/* Điểm mới */}
    <div style={{ background: 'white', borderRadius: 10, overflow: 'hidden', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ background: '#f97316', color: 'white', padding: '8px 14px', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
        📊 ĐIỂM MỚI
      </div>
      {diemMoiList.map((d, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 14px', borderBottom: '1px solid #f1f5f9', fontSize: 12.5 }}>
          <span style={{ color: '#334155', flex: 1, marginRight: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.ten}</span>
          <span style={{ fontWeight: 700, color: '#1e2d5a', flexShrink: 0 }}>{d.diem}</span>
        </div>
      ))}
    </div>

    {/* Tổng điểm */}
    <div style={{ background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ background: '#1e2d5a', color: 'white', padding: '8px 14px', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
        📋 TỔNG ĐIỂM
      </div>
      {[
        { label: 'Tổng số tín chỉ', val: tongDiem.tongSoTinChi },
        { label: 'Tổng số tín chỉ tích lũy', val: tongDiem.tongSoTinChiTichLuy },
        { label: 'Điểm trung bình hệ 10', val: tongDiem.diemTrungBinhHe10 },
        { label: 'Điểm trung bình hệ 4', val: tongDiem.diemTrungBinhHe4 },
        { label: 'Điểm trung bình tích lũy hệ 10', val: tongDiem.diemTrungBinhTichLuyHe10 },
        { label: 'Điểm trung bình tích lũy hệ 4', val: tongDiem.diemTrungBinhTichLuyHe4 },
      ].map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 14px', borderBottom: '1px solid #f1f5f9', fontSize: 12.5 }}>
          <span style={{ color: '#475569' }}>{r.label}</span>
          <span style={{ fontWeight: 700, color: '#1e2d5a' }}>{r.val}</span>
        </div>
      ))}
    </div>
  </div>
);

// ==================== TAB BAR ====================
type TracuuTab = 'bangdiem' | 'hocphannо' | 'khoikienthuc' | 'ketquadangky' | 'quyetdinh' | 'vanbang' | 'canhbao' | 'diemrenluyen';

const tabConfig: { id: TracuuTab; label: string; icon: string }[] = [
  { id: 'bangdiem', label: 'Bảng điểm', icon: '📋' },
  { id: 'hocphannо', label: 'Học phần nợ', icon: '📄' },
  { id: 'khoikienthuc', label: 'Khối kiến thức', icon: '🎯' },
  { id: 'ketquadangky', label: 'Kết quả đăng ký học', icon: '🔗' },
  { id: 'quyetdinh', label: 'Quyết định', icon: 'ℹ️' },
  { id: 'vanbang', label: 'Văn bằng - chứng chỉ', icon: '🎓' },
  { id: 'canhbao', label: 'Cảnh báo học vụ', icon: '📊' },
  { id: 'diemrenluyen', label: 'Điểm rèn luyện', icon: '📝' },
];

// ==================== BANG DIEM ====================
const PageTracuuDiem = () => {
  const [activeTab, setActiveTab] = useState<TracuuTab>('bangdiem');

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      <StudentSidebar onNavigate={() => {}} />
      <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'auto' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 20, borderBottom: '2px solid #e2e8f0', paddingBottom: 0 }}>
          {tabConfig.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '8px 14px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              fontWeight: activeTab === t.id ? 600 : 400,
              color: activeTab === t.id ? '#f97316' : '#475569',
              background: 'none',
              borderBottom: activeTab === t.id ? '2px solid #f97316' : '2px solid transparent',
              marginBottom: -2, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* BẢNG ĐIỂM */}
        {activeTab === 'bangdiem' && (
          <div>
            {bangDiemData.map((hk, hi) => (
              <div key={hi} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontWeight: 700, fontSize: 14, color: '#1e2d5a' }}>
                  <span style={{ color: '#f97316' }}>⟳</span> {hk.namHoc}
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#1e2d5a', color: 'white' }}>
                        {['STT','Mã học phần','Tên học phần','Số tín chỉ','Lần học','Lần thi','Điểm hệ 10','Điểm hệ 4','Điểm chữ','Đánh giá','Ghi chú','Chi tiết'].map(h => (
                          <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {hk.monHoc.map((m, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                          <td style={{ padding: '8px 10px', color: '#64748b' }}>{m.stt}</td>
                          <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e2d5a' }}>{m.ma}</td>
                          <td style={{ padding: '8px 10px', color: '#334155' }}>{m.ten}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.tc}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.lanHoc}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.lanThi}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>{m.he10}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 600 }}>{m.he4}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <span style={{ background: m.he10 >= 8.5 ? '#dcfce7' : m.he10 >= 7 ? '#dbeafe' : m.he10 >= 5.5 ? '#fef9c3' : '#fee2e2', color: m.he10 >= 8.5 ? '#166534' : m.he10 >= 7 ? '#1e40af' : m.he10 >= 5.5 ? '#854d0e' : '#991b1b', padding: '2px 8px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{m.chu}</span>
                          </td>
                          <td style={{ padding: '8px 10px', textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>{m.danhGia}</td>
                          <td style={{ padding: '8px 10px', textAlign: 'center', color: '#64748b' }}>—</td>
                          <td style={{ padding: '8px 10px' }}><button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>Chi tiết</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, fontSize: 13 }}>
                  <div><span style={{ color: '#64748b' }}>Tổng tín chỉ</span> <strong style={{ marginLeft: 8 }}>{hk.tongTinChi}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Tổng số tín chỉ tích lũy</span> <strong style={{ marginLeft: 8 }}>{hk.tongTinChiTichLuy}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Điểm trung bình hệ 10</span> <strong style={{ marginLeft: 8 }}>{hk.diemTBHe10}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Điểm trung bình hệ 4</span> <strong style={{ marginLeft: 8 }}>{hk.diemTBHe4}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Điểm trung bình tích lũy hệ 10</span> <strong style={{ marginLeft: 8 }}>{hk.diemTBTichLuyHe10}</strong></div>
                  <div><span style={{ color: '#64748b' }}>Điểm trung bình tích lũy hệ 4</span> <strong style={{ marginLeft: 8 }}>{hk.diemTBTichLuyHe4}</strong></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KHỐI KIẾN THỨC */}
        {activeTab === 'khoikienthuc' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a', marginBottom: 12 }}>Tổng điểm theo khối</div>
            <div style={{ overflowX: 'auto', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#1e2d5a', color: 'white' }}>
                    {['STT','Mã khối','Tên khối','Tổng số tín chỉ','Tổng số tín bắt buộc','Tổng số tín đã tích lũy'].map(h => (
                      <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {khoiKienThucData.map((k, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '8px 12px', color: '#64748b' }}>{k.stt}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600, color: '#1e2d5a' }}>{k.maKhoi}</td>
                      <td style={{ padding: '8px 12px', color: '#334155' }}>{k.tenKhoi}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600 }}>{k.tongTC}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600 }}>{k.tongTCBatBuoc}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: k.tongTCTichLuy > 0 ? '#1e2d5a' : '#94a3b8' }}>{k.tongTCTichLuy || ''}</td>
                    </tr>
                  ))}
                  <tr style={{ background: '#e2e8f0', fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: '8px 12px', fontWeight: 700 }}>Tổng</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>207</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>175</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>54</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a', marginBottom: 12 }}>Tổng hợp chi tiết theo khối và học phần</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f97316', color: 'white' }}>
                    {['Mã khối','Tên khối','STT','Mã học phần','Tên học phần','Số tín chỉ','Điểm','Đánh giá','Điểm quy đổi','Điểm chữ','Kết quả','Ghi chú'].map(h => (
                      <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 10px' }}></td>
                    <td style={{ padding: '8px 10px' }}></td>
                    <td style={{ padding: '8px 10px' }}>1</td>
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e2d5a' }}>DC1LL03</td>
                    <td style={{ padding: '8px 10px' }}>Tư tưởng Hồ Chí Minh</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>2</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>8.7</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>Đạt</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>4</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>A</td>
                    <td style={{ padding: '8px 10px', color: '#22c55e', fontWeight: 600 }}>Hoàn thành</td>
                    <td style={{ padding: '8px 10px' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KẾT QUẢ ĐĂNG KÝ */}
        {activeTab === 'ketquadangky' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a' }}>Kết quả đăng ký học</div>
              <select style={{ padding: '6px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: '#1e293b', background: 'white' }}>
                <option>Chọn thời gian</option>
                <option>2024_2025_1</option>
                <option>2024_2025_2</option>
                <option>2025_2026_1</option>
              </select>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead>
                  <tr style={{ background: '#1e2d5a', color: 'white' }}>
                    {['STT','Mã lớp học phần','Tên lớp học phần','Số tín','Giảng viên','Kiểu học','Thời gian thực hiện','Người thực hiện','Học kỳ, đợt','Chương trình','Điểm quá trình'].map(h => (
                      <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontWeight: 600, fontSize: 11.5, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ketQuaDangKyData.map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '8px 10px', color: '#64748b' }}>{r.stt}</td>
                      <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e2d5a', fontSize: 12 }}>{r.maLop}</td>
                      <td style={{ padding: '8px 10px', color: '#334155', maxWidth: 300 }}>{r.tenLop}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{r.soTin}</td>
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>{r.giangVien}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{r.kieuHoc}</td>
                      <td style={{ padding: '8px 10px', whiteSpace: 'nowrap', fontSize: 12 }}>{r.thoiGian}</td>
                      <td style={{ padding: '8px 10px' }}>{r.nguoiThucHien}</td>
                      <td style={{ padding: '8px 10px', fontSize: 12 }}>{r.hocKy}</td>
                      <td style={{ padding: '8px 10px' }}>{r.chuongTrinh}</td>
                      <td style={{ padding: '8px 10px', color: '#3b82f6' }}>{r.diemQuaTrinh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HỌC PHẦN NỢ */}
        {activeTab === 'hocphannо' && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Không có học phần nợ</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Sinh viên không có học phần nào đang nợ trong hệ thống</div>
          </div>
        )}

        {/* QUYẾT ĐỊNH */}
        {activeTab === 'quyetdinh' && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>ℹ️</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Chưa có quyết định nào</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Danh sách quyết định sẽ hiển thị tại đây</div>
          </div>
        )}

        {/* VĂN BẰNG */}
        {activeTab === 'vanbang' && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: '#94a3b8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Chưa có văn bằng - chứng chỉ</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Thông tin văn bằng sẽ cập nhật sau khi tốt nghiệp</div>
          </div>
        )}

        {/* CẢNH BÁO */}
        {activeTab === 'canhbao' && (
          <div style={{ padding: 16 }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, color: '#166534' }}>
              <Ic.Check /> <span style={{ fontWeight: 600 }}>Không có cảnh báo học vụ nào. Sinh viên đang học tốt!</span>
            </div>
          </div>
        )}

        {/* ĐIỂM RÈN LUYỆN */}
        {activeTab === 'diemrenluyen' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#1e2d5a', color: 'white' }}>
                  {['Học kỳ','Năm học','Điểm rèn luyện','Xếp loại'].map(h => (
                    <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 600, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[{hk:'HK1', nam:'2024-2025', diem:82, loai:'Tốt'},{hk:'HK2', nam:'2024-2025', diem:88, loai:'Tốt'},{hk:'HK1', nam:'2025-2026', diem:90, loai:'Xuất sắc'}].map((r,i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                    <td style={{ padding: '8px 14px' }}>{r.hk}</td>
                    <td style={{ padding: '8px 14px' }}>{r.nam}</td>
                    <td style={{ padding: '8px 14px', fontWeight: 700 }}>{r.diem}</td>
                    <td style={{ padding: '8px 14px' }}>
                      <span style={{ background: r.diem>=90?'#dcfce7':'#dbeafe', color: r.diem>=90?'#166534':'#1e40af', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{r.loai}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== CHƯƠNG TRÌNH HỌC ====================
const PageChuongTrinhHoc = () => {
  const khoiList = ['Tốt nghiệp','Khối Giáo dục đại cương','Kiến thức chuyên ngành','Khối bổ trợ','Kiến thức cơ sở ngành','Kiến thức ngành'];
  const khoiListOpt = ['Tự chọn kiến thức ngành','Tự chọn kiến thức chuyên ngành','Tự chọn GDTC','Tự chọn khối bổ trợ','Tự chọn kiến thức cơ sở ngành'];
  return (
    <div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Góc học tập › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Chương trình học</span></div>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Main table */}
        <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a' }}>Nội dung học phần theo chương trình:</div>
            <div style={{ background: '#e8eaf6', padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#1e2d5a' }}>K75DHCQ - Công nghệ thông tin</div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['STT','Mã học phần','Tên học phần','Khối KT','Số tín học phần','Số tín học phí','Điều kiện ràng buộc','Học kỳ dự kiến','Học kỳ thực tế','LT','Chi tiết'].map(h => (
                    <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontWeight: 600, fontSize: 11.5, color: '#475569', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chuongTrinhHocData.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                    <td style={{ padding: '8px 10px', color: '#64748b' }}>{m.stt}</td>
                    <td style={{ padding: '8px 10px', fontWeight: 600, color: '#1e2d5a' }}>{m.ma}</td>
                    <td style={{ padding: '8px 10px' }}>{m.ten}</td>
                    <td style={{ padding: '8px 10px', fontSize: 12, color: '#64748b' }}>{m.khoi}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.tcHP}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.tcHP2}</td>
                    <td style={{ padding: '8px 10px' }}></td>
                    <td style={{ padding: '8px 10px' }}></td>
                    <td style={{ padding: '8px 10px', fontSize: 12, color: '#3b82f6' }}>{m.hkThucTe}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{m.lt}</td>
                    <td style={{ padding: '8px 10px' }}><button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}><Ic.Edit /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: '#475569', fontWeight: 600 }}>Tổng số tín chỉ: 150</div>
        </div>
        {/* Right panel */}
        <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1e2d5a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Ic.ChevDown /> Các khối lựa chọn bắt buộc
            </div>
            {khoiList.map(k => (
              <div key={k} style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 12.5, color: '#334155', display: 'flex', gap: 6 }}>
                <span>📋</span>
                <div>
                  <div style={{ fontWeight: 500 }}>{k}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11.5 }}>(Tổng HP: 16; Tổng TC: 42)</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'white', background: '#f97316', borderRadius: 8, padding: '6px 10px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Ic.ChevDown /> Các khối lựa chọn đơn
            </div>
            {khoiListOpt.map(k => (
              <div key={k} style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 12.5, color: '#334155', display: 'flex', gap: 6 }}>
                <span>📋</span>
                <div>
                  <div style={{ fontWeight: 500 }}>{k}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11.5 }}>(Tổng HP: 3; Tổng TC: 9; Số HP bắt buộc: 2)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== XIN PHÚC KHẢO ====================
const PageXinPhucKhao = () => (
  <div>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Góc học tập › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Đăng ký xin phúc khảo</span></div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 220 }}>
          <option>Chọn thời gian</option>
          <option>HK1 2024-2025</option>
          <option>HK2 2024-2025</option>
          <option>HK1 2025-2026</option>
        </select>
        <button style={{ padding: '8px 20px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Xem</button>
        <button style={{ padding: '8px 20px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Hướng dẫn đăng ký</button>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a', marginBottom: 12 }}>Theo danh sách thi</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th colSpan={11} style={{ padding: '8px 12px', textAlign: 'center', background: '#e2e8f0', fontWeight: 700, color: '#1e2d5a', fontSize: 12 }}>KẾT QUẢ THI BAN ĐẦU</th>
              <th colSpan={3} style={{ padding: '8px 12px', textAlign: 'center', background: '#dbeafe', fontWeight: 700, color: '#1e40af', fontSize: 12 }}>ĐĂNG KÝ PHÚC KHẢO</th>
              <th style={{ padding: '8px 12px', background: '#1e2d5a', color: 'white', fontWeight: 700, fontSize: 12 }}>ĐĂNG KÝ</th>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              {['STT','Mã số','Họ đệm','Tên','Số báo danh','Học phần thi','Loại điểm thi','Hình thức thi','Ngày thi','Ca thi','Phòng thi','Kết quả','Ngày công bố điểm','Ngày đăng ký Phúc khảo','Ngày hết hạn đăng ký','Ngày hết hạn nộp phí',''].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: '#475569', whiteSpace: 'nowrap', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={16} style={{ padding: '48px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
                Không có dữ liệu hiển thị. Vui lòng chọn thời gian và nhấn "Xem".
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ==================== CÔNG NHẬN ĐIỂM ====================
const PageCongNhanDiem = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Góc học tập › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Công nhận điểm</span></div>
      <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 200 }}>
            <option>— Không tìm thấy dữ liệu! —</option>
          </select>
          <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 200 }}>
            <option>K75DHCQ - Công nghệ thông tin</option>
          </select>
          <button style={{ padding: '8px 16px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ic.Grid /> Xem
          </button>
          <button style={{ marginLeft: 'auto', padding: '8px 18px', background: '#22c55e', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            📝 Đăng ký
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {['STT','Mã học phần','Tên học phần','Số tín chỉ','Kết quả đã tích lũy','Kết quả đã được công nhận mới','Đăng ký công nhận','Tình trạng'].map(h => (
                  <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#475569', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {congNhanDiemData.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                  <td style={{ padding: '9px 12px', color: '#64748b' }}>{r.stt}</td>
                  <td style={{ padding: '9px 12px', fontWeight: 600, color: '#1e2d5a' }}>{r.ma}</td>
                  <td style={{ padding: '9px 12px' }}>{r.ten}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>{r.tc}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 600 }}>{r.ketQuaTichLuy}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>{r.ketQuaCongNhan}</td>
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', justifyContent: 'center' }}>
                      <input type="checkbox" checked={checked.includes(i)} onChange={() => toggle(i)} style={{ cursor: 'pointer' }} />
                      <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: 12 }}>Đăng ký</span>
                    </label>
                  </td>
                  <td style={{ padding: '9px 12px', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== XÉT TỐT NGHIỆP ====================
const PageXetTotNghiep = () => (
  <div>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Góc học tập › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Xét tốt nghiệp</span></div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
        <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 260 }}>
          <option>K75DHCQ - Công nghệ thông tin</option>
        </select>
        <button style={{ padding: '8px 16px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ic.Grid /> Xem
        </button>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a', marginBottom: 12 }}>Kết quả</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {['STT','Đợt xét duyệt','Loại xét','Xác nhận theo kế hoạch','Chứng chỉ đã có(Minh chứng)','Tự xét','Phản hồi của nhà trường'].map(h => (
                <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#475569', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {xetTotNghiepData.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                <td style={{ padding: '10px 14px', color: '#64748b' }}>{r.stt}</td>
                <td style={{ padding: '10px 14px', fontWeight: 500 }}>{r.dot}</td>
                <td style={{ padding: '10px 14px', color: '#475569' }}>{r.loai}</td>
                <td style={{ padding: '10px 14px' }}>
                  <button style={{ padding: '5px 14px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#1e2d5a' }}>Xác nhận</button>
                </td>
                <td style={{ padding: '10px 14px', display: 'flex', gap: 6 }}>
                  <button style={{ padding: '5px 12px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, cursor: 'pointer', color: '#1e2d5a' }}>Khai minh chứng</button>
                  <button style={{ padding: '5px 12px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 6, fontSize: 12, cursor: 'pointer', color: '#1e2d5a' }}>Kết quả</button>
                </td>
                <td style={{ padding: '10px 14px' }}>
                  <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Chi tiết</button>
                </td>
                <td style={{ padding: '10px 14px', color: '#94a3b8', fontSize: 12 }}>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ==================== ĐĂNG KÝ HỌC ====================
const PageDangKy = () => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Đăng ký học › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Đăng ký</span></div>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 12 }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#e2e8f0', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👤</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1e2d5a' }}>Phạm Mạnh Hùng</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>TT21355</div>
            </div>
            {[
              { label: 'Số dư tài khoản hiện tại:', val: '—' },
              { label: 'Số phát sinh thêm trong đợt:', val: '—' },
              { label: 'Tổng lớp đã đăng ký:', val: '—' },
              { label: 'Số tín chỉ đã đăng ký:', val: '—' },
              { label: 'Số tín chỉ tối đa:', val: '—' },
              { label: 'Số tín chỉ tối thiểu:', val: '—' },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12.5, borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>💰 {r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1e2d5a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              🔽 Bộ lọc tìm kiếm
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Giảng viên</div>
              <input style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12.5, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Tìm giảng viên..." />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Thứ học</div>
              <select style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12.5, fontFamily: 'inherit' }}>
                <option>Tất cả</option>
                <option>Thứ 2</option><option>Thứ 3</option><option>Thứ 4</option>
                <option>Thứ 5</option><option>Thứ 6</option><option>Thứ 7</option>
              </select>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Phương án đăng ký</div>
              <select style={{ width: '100%', padding: '7px 10px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12.5, fontFamily: 'inherit' }}>
                <option>Tất cả</option>
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569', marginBottom: 12, cursor: 'pointer' }}>
              <input type="checkbox" /> Lọc trùng
            </label>
            <button style={{ width: '100%', padding: '9px', background: '#dbeafe', color: '#1e40af', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Ic.Search /> Tìm kiếm
            </button>
          </div>
        </div>
        {/* Right */}
        <div style={{ flex: 1, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Chương trình đào tạo</div>
              <div style={{ padding: '8px 14px', background: '#1e2d5a', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>K75DHCQ - Công nghệ thông tin</div>
            </div>
          </div>
          <div style={{ marginBottom: 12, padding: '10px 14px', background: '#f8fafc', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#1e2d5a' }}>Kế hoạch</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Học phần</div>
            <input value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} placeholder="Tìm kiếm học phần" />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1e2d5a', marginBottom: 12 }}>Lớp học phần</div>
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', background: '#f8fafc', borderRadius: 10 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📚</div>
            <div>Tìm kiếm học phần để hiển thị lớp học phần có thể đăng ký</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== NGUYỆN VỌNG ====================
const PageNguyenVong = () => (
  <div>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Đăng ký học › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Nguyện vọng</span></div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20, padding: '16px', background: '#f8fafc', borderRadius: 10 }}>
        <div><div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Mã số:</div><div style={{ fontWeight: 700, fontSize: 15, color: '#1e2d5a' }}>75DCTT21355</div></div>
        <div><div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Họ và tên:</div><div style={{ fontWeight: 700, fontSize: 15, color: '#1e2d5a' }}>Phạm Mạnh Hùng</div></div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Ngành học</div>
          <input style={{ width: '100%', padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', background: 'white' }} defaultValue="K75DHCQ - Công nghệ thông tin" />
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Kế hoạch</div>
          <select style={{ width: '100%', padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
            <option>— Không tìm thấy dữ liệu! —</option>
          </select>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Kiểu học</div>
          <select style={{ width: '100%', padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
            <option></option>
          </select>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Số tín chỉ tối đa</div>
          <input style={{ width: '100%', padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
        <div style={{ gridColumn: '1/-1', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ padding: '8px 18px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            👁️ Xem học phần
          </button>
        </div>
      </div>
      {/* Tables */}
      {['Danh sách các nguyện vọng chưa đăng ký', 'Danh sách các nguyện vọng đã đăng ký'].map((title, ti) => (
        <div key={ti} style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#3b82f6', marginBottom: 10 }}>{title}</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  {['STT','Mã học phần','Tên học phần','Số tín chỉ','Kết quả','Đánh giá','Điều kiện ràng buộc','Khối kiến thức','Phân kỳ theo chương trình', '☐'].map(h => (
                    <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: '#475569', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={10} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Không có dữ liệu</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            {ti === 0 ? (
              <button style={{ padding: '7px 18px', background: '#22c55e', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>📝 Đăng ký</button>
            ) : (
              <button style={{ padding: '7px 18px', background: 'white', color: '#ef4444', border: '1.5px solid #ef4444', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>✕ Hủy đăng ký</button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ==================== TRA CỨU KẾT QUẢ ĐĂNG KÝ ====================
const PageTracuuKetQuaDangKy = () => (
  <div>
    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Đăng ký học › <span style={{ color: '#1e2d5a', fontWeight: 600 }}>Tra cứu kết quả đăng ký</span></div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Kế hoạch đăng ký học</div>
        <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 160 }}>
          <option>2025_2026_2</option>
        </select>
        <select style={{ padding: '8px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', minWidth: 160 }}>
          <option>DKH_20252026_2_1</option>
        </select>
        <button style={{ padding: '8px 16px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          👁️ Xem
        </button>
        <button style={{ padding: '8px 16px', background: '#22c55e', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ic.Check /> Xác nhận tất cả
        </button>
      </div>
      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {tracuuKetQuaDangKyData.map((m, i) => (
          <div key={i} style={{ border: '2px solid', borderColor: m.color, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ background: m.color, color: 'white', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{m.tenMon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'white' }} />
                <span>Xác nhận kết quả đăng ký</span>
              </div>
            </div>
            <div style={{ padding: '12px 14px', background: 'white' }}>
              <div style={{ fontSize: 12, color: '#334155', marginBottom: 6, fontWeight: 500 }}>{m.maMon}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 12, color: '#64748b', marginBottom: 8 }}>
                <div>Ly thuyet: <span style={{ color: '#334155' }}>{m.lyThuyet}</span></div>
                <div>Thứ: <span style={{ color: '#334155' }}>{m.thu}</span></div>
                <div>Tổng số: <span style={{ color: '#334155', fontWeight: 600 }}>{m.tongSo}</span></div>
                <div>Đã đăng ký: <span style={{ color: m.color, fontWeight: 700 }}>{m.daDangKy}</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: m.color, fontWeight: 700, fontSize: 14 }}>{m.hocPhi} đ</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Điểm danh</button>
                  <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Điểm quá trình</button>
                  <button style={{ padding: '4px 10px', background: '#f1f5f9', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Xem chi tiết</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ==================== LỊCH HỌC ====================
const _PageLichHoc = () => {
  const sessions = ['Tiết 1-3\n07:00-09:30', 'Tiết 4-6\n09:45-12:15', 'Tiết 7-9\n13:00-15:30', 'Tiết 10-12\n15:45-18:15'];
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const schedule: Record<string, { mon: string; phong: string; gv: string; color: string } | null> = {
    'Thứ 2-0': { mon: 'Cấu trúc dữ liệu & GT', phong: 'A201', gv: 'Nguyễn Văn A', color: '#3b82f6' },
    'Thứ 3-1': { mon: 'Lập trình C++', phong: 'B305', gv: 'Trần Thị B', color: '#22c55e' },
    'Thứ 4-0': { mon: 'Toán học rời rạc', phong: 'A101', gv: 'Lê Văn C', color: '#f97316' },
    'Thứ 5-2': { mon: 'CSDL', phong: 'C202', gv: 'Phạm Thị D', color: '#8b5cf6' },
    'Thứ 6-1': { mon: 'Mạng máy tính', phong: 'A304', gv: 'Vũ Văn E', color: '#ec4899' },
    'Thứ 6-3': { mon: 'Tiếng Anh', phong: 'D101', gv: 'Hoàng Thị F', color: '#14b8a6' },
  };
  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1e2d5a', flex: 1 }}>Thời khóa biểu – HK2 2024-2025</div>
          <select style={{ padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit' }}>
            <option>HK2 2024-2025</option><option>HK1 2024-2025</option>
          </select>
          <button style={{ padding: '7px 16px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Xem</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 14px', background: '#1e2d5a', color: 'white', fontSize: 12, fontWeight: 600, width: 120, textAlign: 'left' }}>Ca học</th>
                {days.map(d => (
                  <th key={d} style={{ padding: '10px 14px', background: '#1e2d5a', color: 'white', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, si) => (
                <tr key={si} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', background: '#f8fafc', fontSize: 12, fontWeight: 600, color: '#475569', verticalAlign: 'top', whiteSpace: 'pre-line' }}>{s}</td>
                  {days.map(d => {
                    const key = `${d}-${si}`;
                    const cell = schedule[key];
                    return (
                      <td key={d} style={{ padding: '8px', verticalAlign: 'top', border: '1px solid #f1f5f9' }}>
                        {cell ? (
                          <div style={{ background: cell.color + '18', borderLeft: `3px solid ${cell.color}`, borderRadius: 6, padding: '8px 10px' }}>
                            <div style={{ fontWeight: 700, fontSize: 12, color: cell.color, marginBottom: 3 }}>{cell.mon}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>🏫 {cell.phong}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>👤 {cell.gv}</div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== LỊCH THI ====================
const PageLichThi = () => (
  <div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#1e2d5a', flex: 1 }}>Lịch thi – HK2 2024-2025</div>
        <select style={{ padding: '7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit' }}>
          <option>HK2 2024-2025</option>
        </select>
        <button style={{ padding: '7px 16px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Xem</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1e2d5a', color: 'white' }}>
              {['STT','Mã học phần','Tên học phần','Số tín chỉ','Ngày thi','Ca thi','Phòng thi','Hình thức','Ghi chú'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { ma: 'DC2HT26', ten: 'Cấu trúc dữ liệu và giải thuật', tc: 4, ngay: '15/06/2025', ca: 'Ca 1 (07:00-09:00)', phong: 'A201', ht: 'Viết' },
              { ma: 'DC3HT21', ten: 'Hệ quản trị CSDL', tc: 3, ngay: '17/06/2025', ca: 'Ca 2 (09:30-11:30)', phong: 'B305', ht: 'Thực hành' },
              { ma: 'DC2TT35', ten: 'Lập trình hướng đối tượng C++', tc: 3, ngay: '19/06/2025', ca: 'Ca 1 (07:00-09:00)', phong: 'C101', ht: 'Thực hành' },
              { ma: 'DC2HT13', ten: 'Nhập môn mạng máy tính', tc: 3, ngay: '21/06/2025', ca: 'Ca 3 (13:00-15:00)', phong: 'A304', ht: 'Viết' },
              { ma: 'DC1LL03', ten: 'Tư tưởng Hồ Chí Minh', tc: 2, ngay: '23/06/2025', ca: 'Ca 2 (09:30-11:30)', phong: 'D202', ht: 'Viết' },
              { ma: 'DC1CB52', ten: 'Xác suất thống kê', tc: 2, ngay: '25/06/2025', ca: 'Ca 1 (07:00-09:00)', phong: 'A101', ht: 'Viết' },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                <td style={{ padding: '10px 12px', color: '#64748b' }}>{i+1}</td>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1e2d5a' }}>{r.ma}</td>
                <td style={{ padding: '10px 12px' }}>{r.ten}</td>
                <td style={{ padding: '10px 12px', textAlign: 'center' }}>{r.tc}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#dc2626', fontWeight: 600 }}>{r.ngay}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontSize: 12 }}>{r.ca}</td>
                <td style={{ padding: '10px 12px' }}>{r.phong}</td>
                <td style={{ padding: '10px 12px' }}><span style={{ background: r.ht==='Viết'?'#dbeafe':'#f0fdf4', color: r.ht==='Viết'?'#1e40af':'#166534', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{r.ht}</span></td>
                <td style={{ padding: '10px 12px', color: '#94a3b8' }}>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ==================== HỌC PHÍ ====================
const PageHocPhi = () => (
  <div>
    <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: '#1e2d5a', marginBottom: 20 }}>Thông tin học phí</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Tổng học phí HK2 2024-2025', val: '15,600,000 đ', color: '#1e2d5a' },
          { label: 'Đã nộp', val: '15,600,000 đ', color: '#22c55e' },
          { label: 'Còn lại', val: '0 đ', color: '#ef4444' },
        ].map(c => (
          <div key={c.label} style={{ background: '#f8fafc', borderRadius: 12, padding: '18px 20px', borderLeft: `4px solid ${c.color}` }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.color }}>{c.val}</div>
          </div>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#1e2d5a', color: 'white' }}>
              {['STT','Học kỳ','Mã học phần','Tên học phần','Số tín chỉ','Học phí','Trạng thái'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { hk: 'HK2 2024-2025', ma: 'DC2HT26', ten: 'Cấu trúc dữ liệu và giải thuật', tc: 4, phi: '2,080,000 đ', tt: 'Đã nộp' },
              { hk: 'HK2 2024-2025', ma: 'DC3HT21', ten: 'Hệ quản trị CSDL', tc: 3, phi: '1,560,000 đ', tt: 'Đã nộp' },
              { hk: 'HK2 2024-2025', ma: 'DC2TT35', ten: 'Lập trình hướng đối tượng C++', tc: 3, phi: '1,560,000 đ', tt: 'Đã nộp' },
              { hk: 'HK2 2024-2025', ma: 'DC2HT13', ten: 'Nhập môn mạng máy tính', tc: 3, phi: '1,560,000 đ', tt: 'Đã nộp' },
              { hk: 'HK2 2024-2025', ma: 'DC1LL03', ten: 'Tư tưởng Hồ Chí Minh', tc: 2, phi: '1,040,000 đ', tt: 'Đã nộp' },
              { hk: 'HK2 2024-2025', ma: 'DC1CB52', ten: 'Xác suất thống kê', tc: 2, phi: '1,040,000 đ', tt: 'Đã nộp' },
            ].map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i%2===0?'white':'#f8fafc' }}>
                <td style={{ padding: '9px 12px', color: '#64748b' }}>{i+1}</td>
                <td style={{ padding: '9px 12px' }}>{r.hk}</td>
                <td style={{ padding: '9px 12px', fontWeight: 600, color: '#1e2d5a' }}>{r.ma}</td>
                <td style={{ padding: '9px 12px' }}>{r.ten}</td>
                <td style={{ padding: '9px 12px', textAlign: 'center' }}>{r.tc}</td>
                <td style={{ padding: '9px 12px', fontWeight: 600, color: '#1e2d5a' }}>{r.phi}</td>
                <td style={{ padding: '9px 12px' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{r.tt}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ==================== TRANG CHỦ ====================
const PageTrangChu = () => (
  <div>
    <div style={{ fontWeight: 700, fontSize: 22, color: '#1e2d5a', marginBottom: 20 }}>Xin chào, Phạm Mạnh Hùng! 👋</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
      {[
        { label: 'Tổng tín chỉ tích lũy', val: '54', color: '#3b82f6', bg: '#eff6ff', icon: '📚' },
        { label: 'Điểm TB hệ 10', val: '7.54', color: '#22c55e', bg: '#f0fdf4', icon: '📊' },
        { label: 'Điểm TB hệ 4', val: '3.15', color: '#f97316', bg: '#fff7ed', icon: '⭐' },
        { label: 'Môn học HK hiện tại', val: '6', color: '#8b5cf6', bg: '#f5f3ff', icon: '📖' },
      ].map(s => (
        <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: '0 4px 20px rgba(30,45,90,0.08)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 4px 20px rgba(30,45,90,0.08)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#1e2d5a', marginBottom: 16 }}>📋 Thông tin học kỳ</div>
        {[
          { label: 'Học kỳ hiện tại', val: 'HK2 2025-2026' },
          { label: 'Ngành học', val: 'Công nghệ thông tin' },
          { label: 'Chương trình', val: 'K75DHCQ' },
          { label: 'Trạng thái', val: 'Đang học' },
          { label: 'Lớp', val: '75DCTT21' },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>{r.label}</span>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{r.val}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 4px 20px rgba(30,45,90,0.08)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#1e2d5a', marginBottom: 16 }}>🔔 Thông báo mới nhất</div>
        {[
          { title: 'Hạn nhập điểm HK2 2025-2026', time: 'Hôm nay', color: '#f97316' },
          { title: 'Lịch đăng ký học HK1 2025-2026', time: '2 ngày trước', color: '#3b82f6' },
          { title: 'Kết quả xét tốt nghiệp T5.2025', time: '1 tuần trước', color: '#22c55e' },
          { title: 'Thông báo nộp học phí HK2', time: '2 tuần trước', color: '#8b5cf6' },
        ].map((n, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, marginTop: 5, flexShrink: 0 }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{n.title}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ==================== MAIN APP ====================
function StudentPortal({ onLogout }: { currentUser: User; onLogout: () => void }) {
  const [activePage, setActivePage] = useState<PageId>('trangchu');
  const [openMenus, setOpenMenus] = useState<string[]>(['gocHocTap']);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const navigate = (page: PageId) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'trangchu': return <PageTrangChu />;
      case 'tracuu-diem': return <PageTracuuDiem />;
      case 'chuongtrinh-hoc': return <PageChuongTrinhHoc />;
      case 'xin-phuc-khao': return <PageXinPhucKhao />;
      case 'cong-nhan-diem': return <PageCongNhanDiem />;
      case 'xet-tot-nghiep': return <PageXetTotNghiep />;
      case 'dangky': return <PageDangKy />;
      case 'nguyen-vong': return <PageNguyenVong />;
      case 'tracuu-dangky': return <PageTracuuKetQuaDangKy />;
      case 'lich-hoc': return <PageLichHocNew />;
      case 'lich-thi': return <PageLichThiNew />;
      case 'hoc-phi': return <PageHocPhiNew />;
      case 'tinnuc': return (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#1e2d5a', marginBottom: 20 }}>📰 Tin tức</div>
          {[
            { title: 'Thông báo lịch thi kết thúc học phần HK2 năm học 2024-2025', date: '10/05/2025', tag: 'Học vụ' },
            { title: 'Kết quả xét tốt nghiệp đợt tháng 5/2025', date: '08/05/2025', tag: 'Tốt nghiệp' },
            { title: 'Thông báo đăng ký học phần HK1 năm học 2025-2026', date: '05/05/2025', tag: 'Đăng ký' },
            { title: 'Hướng dẫn nộp học phí học kỳ 2 năm học 2024-2025', date: '01/05/2025', tag: 'Tài chính' },
          ].map((n, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: '#1e2d5a', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>📢</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b', marginBottom: 4, cursor: 'pointer' }}>{n.title}</div>
                <div style={{ display: 'flex', gap: 10, fontSize: 12 }}>
                  <span style={{ color: '#94a3b8' }}>📅 {n.date}</span>
                  <span style={{ background: '#eff6ff', color: '#1e40af', padding: '1px 8px', borderRadius: 20, fontWeight: 600 }}>{n.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
      case 'tunhap-hoso': return (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, maxWidth: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#1e2d5a', marginBottom: 20 }}>👤 Tự nhập hồ sơ</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { label: 'Họ và tên', val: 'Phạm Mạnh Hùng' }, { label: 'Mã số sinh viên', val: '75DCTT21355' },
              { label: 'Ngày sinh', val: '06/06/2006', type: 'date' }, { label: 'Giới tính', val: 'Nam' },
              { label: 'Số điện thoại', val: '' }, { label: 'Email', val: '' },
              { label: 'Địa chỉ thường trú', val: '', full: true },
              { label: 'CCCD/CMND', val: '' }, { label: 'Dân tộc', val: 'Kinh' },
            ].map(f => (
              <div key={f.label} style={{ gridColumn: (f as any).full ? '1/-1' : undefined }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>{f.label}</div>
                <input defaultValue={f.val} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button style={{ padding: '9px 20px', background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>💾 Lưu thông tin</button>
          </div>
        </div>
      );
      case 'thanhtoan-hocphi': return <PageThanhToanHocPhiNew />;
      case 'vanban-quydinh': return <PageVanBanNew />;
      default: return (
        <div style={{ background: 'white', borderRadius: 12, padding: 40, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1e2d5a', marginBottom: 8 }}>Đang phát triển</div>
          <div style={{ fontSize: 14, color: '#64748b' }}>Chức năng này sẽ sớm được cập nhật</div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Be Vietnam Pro', sans-serif", background: '#eef2f8' }}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99 }} />
      )}

      {/* SIDEBAR */}
      <aside style={{
        width: 200, background: '#1a2448', minHeight: '100vh', position: 'fixed',
        left: 0, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s',
      }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 12, paddingBottom: 20 }}>
          {menuItems.map(item => {
            const isOpen = openMenus.includes(item.id);
            const hasChildren = !!item.children?.length;
            const isActive = item.page === activePage || item.children?.some(c => c.id === activePage);

            return (
              <div key={item.id}>
                <div
                  onClick={() => {
                    if (hasChildren) toggleMenu(item.id);
                    else if (item.page) navigate(item.page);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px',
                    cursor: 'pointer', color: isActive ? '#f97316' : '#94a3b8',
                    background: isActive && !hasChildren ? 'rgba(249,115,22,0.1)' : 'transparent',
                    borderLeft: isActive && !hasChildren ? '3px solid #f97316' : '3px solid transparent',
                    fontSize: 13.5, fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s', userSelect: 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#e2e8f0'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
                >
                  <span style={{ color: isActive ? '#f97316' : '#94a3b8', flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {hasChildren && (
                    <span style={{ color: '#64748b', marginLeft: 'auto' }}>
                      {isOpen ? <Ic.ChevDown /> : <Ic.ChevRight />}
                    </span>
                  )}
                </div>
                {/* Submenu */}
                {hasChildren && isOpen && (
                  <div style={{ background: 'rgba(0,0,0,0.12)' }}>
                    {item.children!.map(child => {
                      const childActive = child.id === activePage;
                      return (
                        <div
                          key={child.id}
                          onClick={() => navigate(child.id)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: 8,
                            padding: '8px 18px 8px 42px', cursor: 'pointer',
                            color: childActive ? '#f97316' : '#94a3b8',
                            fontSize: 12.5, transition: 'color 0.2s', userSelect: 'none',
                          }}
                          onMouseEnter={e => { if (!childActive) (e.currentTarget as HTMLElement).style.color = '#e2e8f0'; }}
                          onMouseLeave={e => { if (!childActive) (e.currentTarget as HTMLElement).style.color = childActive ? '#f97316' : '#94a3b8'; }}
                        >
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                            background: childActive ? '#818cf8' : '#475569',
                          }} />
                          <span>{child.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* HEADER */}
      <header style={{
        position: 'fixed', top: 0, left: 200, right: 0, height: 52,
        background: '#1a2448', display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 12, zIndex: 99, borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 4, display: 'flex', alignItems: 'center' }}>
          <Ic.Menu />
        </button>
        <div style={{ flex: 1, maxWidth: 380, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><Ic.Search /></span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 34px', color: 'white', fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
            placeholder="Tìm kiếm thông tin"
          />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>Phạm Mạnh Hùng</span>
          <Ic.ChevDown2 />
        </div>
      </header>

      {/* MAIN */}
      <main style={{ marginLeft: 200, marginTop: 52, flex: 1, minHeight: 'calc(100vh - 52px)', padding: 20, background: '#eef2f8' }}>
        <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: 20, minHeight: 'calc(100vh - 92px)' }}>
          {renderPage()}
        </div>
      </main>
      {/* Logout button for student */}
      <button onClick={onLogout} style={{ position: 'fixed', bottom: 20, right: 20, background: '#1e2d5a', color: 'white', border: 'none', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
        🚪 Đăng xuất
      </button>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogout = () => setCurrentUser(null);

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.role === 'admin') return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  if (currentUser.role === 'giang_vien') return <GiangVienDashboard user={currentUser} onLogout={handleLogout} />;
  return <StudentPortal currentUser={currentUser} onLogout={handleLogout} />;
}
