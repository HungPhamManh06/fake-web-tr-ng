const lichThiData = [
  { ma: 'DC3HT21', ten: 'Hệ quản trị Cơ sở dữ liệu', lanthi: 1, ngay: '16/01/2026', thoigian: '07:00 - 11:30', hinhthuc: 'Thực hành', phong: 'A5.502 (TH)', sbd: 208, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2TT35', ten: 'Lập trình hướng đối tượng C++', lanthi: 1, ngay: '12/01/2026', thoigian: '07:00 - 11:30', hinhthuc: 'Thực hành', phong: 'A5.502 (TH)', sbd: 215, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2HT13', ten: 'Nhập môn mạng máy tính', lanthi: 1, ngay: '07/01/2026', thoigian: '07:00 - 11:30', hinhthuc: 'VĐ', phong: 'A2.201', sbd: 81, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1CB37', ten: 'Tiếng Anh nâng cao', lanthi: 1, ngay: '01/11/2025', thoigian: '08:30 - 09:30', hinhthuc: 'TNM_60P', phong: 'A6.501 (TH)', sbd: 606, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1CB52', ten: 'Xác suất thống kê', lanthi: 1, ngay: '29/10/2025', thoigian: '08:30 - 09:30', hinhthuc: 'TNM_60P', phong: 'TV.204B (X)', sbd: 298, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2HT26', ten: 'Cấu trúc dữ liệu và giải thuật', lanthi: 1, ngay: '27/10/2025', thoigian: '07:00 - 11:30', hinhthuc: 'VĐ', phong: 'A1.103', sbd: 565, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1LL03', ten: 'Tư tưởng Hồ Chí Minh', lanthi: 1, ngay: '22/10/2025', thoigian: '08:20 - 09:10', hinhthuc: 'TNM_50P', phong: 'TV.204A (TH)', sbd: 257, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2TT22', ten: 'Nhập môn Cơ sở dữ liệu', lanthi: 1, ngay: '11/07/2025', thoigian: '07:00 - 11:30', hinhthuc: 'VĐ', phong: 'A2.103', sbd: 204, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2TT23', ten: 'Ngôn ngữ lập trình C', lanthi: 1, ngay: '04/07/2025', thoigian: '07:00 - 11:30', hinhthuc: 'Thực hành', phong: 'A5.501 (TH)', sbd: 491, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1TT23', ten: 'Vật lý đại cương', lanthi: 1, ngay: '01/07/2025', thoigian: '09:40 - 10:40', hinhthuc: 'TN_60P', phong: 'TV.202 (TH)', sbd: 27, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC2HT42', ten: 'Toán học rời rạc', lanthi: 1, ngay: '25/04/2025', thoigian: '07:00 - 11:30', hinhthuc: 'VĐ', phong: 'C3.206', sbd: 204, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1LL07', ten: 'Kinh tế chính trị Mác - Lênin', lanthi: 1, ngay: '21/04/2025', thoigian: '11:20 - 12:10', hinhthuc: 'Trắc nghiệm 50P', phong: 'TV.204A (TH)', sbd: 364, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1LL08', ten: 'Chủ nghĩa xã hội khoa học', lanthi: 1, ngay: '19/04/2025', thoigian: '08:05 - 08:55', hinhthuc: 'Trắc nghiệm 50P', phong: 'TV.204A (TH)', sbd: 54, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1LL06', ten: 'Triết học Mác - Lênin', lanthi: 1, ngay: '15/01/2025', thoigian: '07:00 - 08:00', hinhthuc: 'Trắc nghiệm', phong: 'TV.203 (TH)', sbd: 316, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1CB36', ten: 'Tiếng Anh cơ bản', lanthi: 1, ngay: '13/01/2025', thoigian: '15:30 - 16:30', hinhthuc: 'Trắc nghiệm', phong: 'A6.401 (TH)', sbd: 529, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
  { ma: 'DC1TT45', ten: 'Tin học', lanthi: 1, ngay: '10/01/2025', thoigian: '10:45 - 11:45', hinhthuc: 'Trắc nghiệm', phong: 'A6.501 (TH)', sbd: 100, thongtin: 'Phạm Mạnh Hùng - 75DCTT21355 -' },
];

const PageLichThi = () => (
  <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
    {/* Filter bar */}
    <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#475569', fontWeight: 500, whiteSpace: 'nowrap' }}>Học kỳ</span>
        <select style={{ padding: '7px 32px 7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: '#64748b', background: 'white', minWidth: 160 }}>
          <option value="">Chọn học kỳ</option>
          <option>HK2 2025-2026</option>
          <option selected>HK1 2025-2026</option>
          <option>HK2 2024-2025</option>
          <option>HK1 2024-2025</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>Học phần</span>
        <select style={{ padding: '7px 32px 7px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: '#64748b', background: 'white', minWidth: 200 }}>
          <option value=""></option>
        </select>
      </div>
      <button style={{ padding: '7px 18px', background: '#1a2448', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Xem lịch</button>
      <button style={{ padding: '7px 18px', background: '#1a2448', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Xem lịch sử</button>
    </div>

    {/* Table title */}
    <div style={{ padding: '16px 20px 8px', fontWeight: 700, fontSize: 15, color: '#1e293b' }}>Lịch thi cá nhân</div>

    {/* Table */}
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            {['STT', 'Mã học phần', 'Tên học phần', 'Lần thi', 'Ngày thi', 'Thời gian thi', 'Hình thức', 'Phòng thi', 'Số báo danh', 'Thông tin sinh viên (Họ tên, mã số)'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12, color: '#475569', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lichThiData.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: 'white' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
              <td style={{ padding: '10px 12px', color: '#64748b', textAlign: 'center' }}>{i + 1}</td>
              <td style={{ padding: '10px 12px', fontWeight: 600, color: '#1a2448' }}>{r.ma}</td>
              <td style={{ padding: '10px 12px', color: '#1e293b' }}>{r.ten}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center' }}>{r.lanthi}</td>
              <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#334155' }}>{r.ngay}</td>
              <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#334155' }}>{r.thoigian}</td>
              <td style={{ padding: '10px 12px', color: '#334155' }}>{r.hinhthuc}</td>
              <td style={{ padding: '10px 12px', color: '#334155' }}>{r.phong}</td>
              <td style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>{r.sbd}</td>
              <td style={{ padding: '10px 12px', color: '#334155', fontSize: 12 }}>{r.thongtin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PageLichThi;
