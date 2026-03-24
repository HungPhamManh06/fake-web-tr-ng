const hocPhiCards = [
  { label: 'Khoản phải nộp', val: '42,500,000', color: '#22a65a', borderColor: '#22c55e', icon: '💵' },
  { label: 'Khoản được miễn', val: '0', color: '#e67e22', borderColor: '#f97316', icon: '💰' },
  { label: 'Khoản đã nộp', val: '42,500,000', color: '#2563eb', borderColor: '#3b82f6', icon: '💳' },
  { label: 'Khoản đã rút', val: '0', color: '#22a65a', borderColor: '#22c55e', icon: '💵' },
  { label: 'Tổng nợ chung các khoản', val: '0', color: '#e67e22', borderColor: '#f97316', icon: '💰' },
  { label: 'Tổng dư chung các khoản', val: '0', color: '#64748b', borderColor: '#94a3b8', icon: '🧮' },
  { label: 'Danh sách phiếu đã thu', val: '43,605,650', color: '#2563eb', borderColor: '#3b82f6', icon: '🧾' },
  { label: 'Danh sách phiếu đã rút', val: '0', color: '#22a65a', borderColor: '#22c55e', icon: '💵' },
  { label: 'Danh sách phiếu hóa đơn', val: '8,594,350', color: '#e67e22', borderColor: '#f97316', icon: '🧾' },
];

const PageHocPhi = () => (
  <div>
    {/* Student info header */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b' }}>PHẠM MẠNH HÙNG</div>
      <div style={{ fontSize: 13, color: '#64748b' }}>Mã: 75DCTT21355 - SĐT: 0918066962 - Lớp: 75DCTT21</div>
      <span style={{ background: '#22c55e', color: 'white', padding: '3px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, marginLeft: 4 }}>Đã hoàn thành</span>
      <div style={{ marginLeft: 'auto' }}>
        <button style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: 8, padding: '6px 14px', fontSize: 12, cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
          ✏️ Hướng dẫn
        </button>
      </div>
    </div>

    {/* Cards grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      {hocPhiCards.map((card, i) => (
        <div key={i} style={{
          padding: '20px 20px',
          borderLeft: `4px solid ${card.borderColor}`,
          borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none',
          borderRight: (i % 4 !== 3) ? '1px solid #f1f5f9' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: card.color, marginBottom: 4 }}>{card.val}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{card.label}</div>
            </div>
            <div style={{ fontSize: 36 }}>{card.icon}</div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: 'none', background: 'none', cursor: 'pointer',
            color: card.color, fontWeight: 600, fontSize: 13, padding: 0, fontFamily: 'inherit'
          }}>
            Chi tiết →
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default PageHocPhi;
