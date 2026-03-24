const vanBanData = [
  { stt: 1, ten: 'Quy định MGHP', kyhieu: 'ĐT', ngay: '' },
  { stt: 2, ten: 'Quy định Văn hóa ứng xử', kyhieu: 'ĐT', ngay: '' },
  { stt: 3, ten: 'Quy định Ban cán sự lớp', kyhieu: 'ĐT', ngay: '' },
  { stt: 4, ten: 'Quy định chuẩn đầu ra Tin học', kyhieu: 'ĐT', ngay: '' },
  { stt: 5, ten: 'Quy định chuẩn đầu ra Ngoại ngữ', kyhieu: 'ĐT', ngay: '' },
  { stt: 6, ten: 'Quy chế đào tạo', kyhieu: '1710', ngay: '12/03/2024' },
  { stt: 7, ten: 'Quy chế CTSV', kyhieu: '1468', ngay: '28/05/2020' },
  { stt: 8, ten: 'Quy định HBKKHT', kyhieu: 'ĐT', ngay: '' },
  { stt: 9, ten: 'Quy định đánh giá điểm Rèn luyện SV', kyhieu: 'ĐT', ngay: '' },
  { stt: 10, ten: 'Nội quy học đường', kyhieu: 'ĐT', ngay: '' },
  { stt: 11, ten: 'Quy định SV giỏi, Olympic', kyhieu: 'ĐT', ngay: '' },
];

const PageVanBan = () => (
  <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
    <div style={{ padding: '18px 24px 10px', fontWeight: 700, fontSize: 16, color: '#1e293b' }}>
      Văn bản, quy định, biểu mẫu
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            <th style={{ padding: '11px 20px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 13, width: 70 }}>STT</th>
            <th style={{ padding: '11px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 13 }}>Tên văn bản</th>
            <th style={{ padding: '11px 20px', textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: 13, width: 150 }}>Số kí hiệu</th>
            <th style={{ padding: '11px 20px', textAlign: 'left', fontWeight: 600, color: '#475569', fontSize: 13, width: 160 }}>Ngày ban hành</th>
          </tr>
        </thead>
        <tbody>
          {vanBanData.map((v) => (
            <tr key={v.stt} style={{ borderBottom: '1px solid #f1f5f9', background: 'white' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
              <td style={{ padding: '12px 20px', textAlign: 'center', color: '#64748b' }}>{v.stt}</td>
              <td style={{ padding: '12px 20px', color: '#1e293b' }}>{v.ten}</td>
              <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                <span style={{ color: '#3b82f6', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>{v.kyhieu}</span>
              </td>
              <td style={{ padding: '12px 20px', color: '#64748b' }}>{v.ngay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PageVanBan;
