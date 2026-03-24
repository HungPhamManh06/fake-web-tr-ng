import { useState } from 'react';

const thanhToanItems = [
  { id: 1, noidung: 'Học phí HK2 2025-2026 - Công nghệ phần mềm', sotien: 1560000, ghichu: '' },
  { id: 2, noidung: 'Học phí HK2 2025-2026 - Quản lý dự án', sotien: 1560000, ghichu: '' },
  { id: 3, noidung: 'Học phí HK2 2025-2026 - Toán chuyên ngành', sotien: 1560000, ghichu: '' },
  { id: 4, noidung: 'Học phí HK2 2025-2026 - Khoa học dữ liệu và trí tuệ nhân tạo', sotien: 1560000, ghichu: '' },
  { id: 5, noidung: 'Học phí HK2 2025-2026 - Kiến trúc máy tính', sotien: 1560000, ghichu: '' },
];

const PageThanhToanHocPhi = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [method, setMethod] = useState('QRCode');

  const toggleItem = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(prev => prev.length === thanhToanItems.length ? [] : thanhToanItems.map(i => i.id));
  };

  const total = thanhToanItems.filter(i => selected.includes(i.id)).reduce((s, i) => s + i.sotien, 0);

  return (
    <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      {/* Personal info */}
      <div style={{ padding: '20px 24px', borderBottom: '2px solid #1a2448' }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1a2448', borderBottom: '2px solid #1a2448', paddingBottom: 8, marginBottom: 16, display: 'inline-block' }}>THÔNG TIN CÁ NHÂN</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Họ tên:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Phạm Mạnh Hùng</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Mã Sinh viên:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>75DCTT21355</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Ngày sinh:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>6/6/2006</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Lớp:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>75DCTT21</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Ngành:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>Công nghệ thông tin</span>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#64748b' }}>Khóa:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>K75DHCQ</span>
          </div>
        </div>
      </div>

      {/* Payment method + action */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          style={{ padding: '8px 36px 8px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', color: '#1e293b', background: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
          <option value="QRCode">💳 QRCode</option>
          <option value="VNPAY">💳 VNPAY</option>
          <option value="MoMo">💳 MoMo</option>
          <option value="ZaloPay">💳 ZaloPay</option>
        </select>
        <button style={{ padding: '8px 20px', background: '#1a2448', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6 }}>
          ✈ Thực hiện thanh toán
        </button>
      </div>

      {/* Payment table */}
      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0 8px' }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>Thông tin thanh toán</div>
          <div style={{ fontSize: 13, color: '#ef4444', fontWeight: 600 }}>
            Tổng tiền đã chọn: {total > 0 ? total.toLocaleString('vi-VN') : '0'}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: '1px solid #e2e8f0' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 12, borderBottom: '1px solid #e2e8f0', width: 50 }}>STT</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, borderBottom: '1px solid #e2e8f0' }}>Nội dung</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#475569', fontSize: 12, borderBottom: '1px solid #e2e8f0' }}>Số Tiền</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 12, borderBottom: '1px solid #e2e8f0' }}>Ghi chú</th>
              <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 12, borderBottom: '1px solid #e2e8f0', width: 40 }}>
                <input type="checkbox" checked={selected.length === thanhToanItems.length} onChange={toggleAll} style={{ cursor: 'pointer', width: 14, height: 14 }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {thanhToanItems.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: selected.includes(item.id) ? '#eff6ff' : 'white' }}>
                <td style={{ padding: '10px 12px', textAlign: 'center', color: '#64748b' }}>{i + 1}</td>
                <td style={{ padding: '10px 12px', color: '#1e293b' }}>{item.noidung}</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: '#1a2448' }}>{item.sotien.toLocaleString('vi-VN')}</td>
                <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{item.ghichu}</td>
                <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                  <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleItem(item.id)} style={{ cursor: 'pointer', width: 14, height: 14 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageThanhToanHocPhi;
