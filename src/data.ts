// ===================== MOCK DATA =====================

export const studentInfo = {
  hoTen: 'Phạm Mạnh Hùng',
  maSo: '75DCTT21355',
  ngaySinh: '06/06/2006',
  gioiTinh: 'Nam',
  trangThai: 'Đang học',
  lop: '75DCTT21',
  nganh: 'Công nghệ thông tin',
  chuongTrinh: 'K75DHCQ - Công nghệ thông tin',
};

export const diemMoiList = [
  { ten: 'Toán đại cương - DC1CB51', diem: 6.6 },
  { ten: 'Nhập môn tìm hiểu ngành Công ngh...', diem: 8.5 },
  { ten: 'Tư duy hệ thống - DC1CB78', diem: 9.1 },
  { ten: 'Tiếng Anh cơ bản - DC1CB36', diem: 8.8 },
  { ten: 'Triết học Mác - Lênin - DC1LL06', diem: 8.4 },
  { ten: 'Tin học - DC1TT45', diem: 8.3 },
];

export const tongDiem = {
  tongSoTinChi: 54,
  tongSoTinChiTichLuy: 54,
  diemTrungBinhHe10: 7.54,
  diemTrungBinhHe4: 3.15,
  diemTrungBinhTichLuyHe10: 7.54,
  diemTrungBinhTichLuyHe4: 3.15,
};

export const bangDiemData = [
  {
    namHoc: 'Năm học 2025_2026 - Học kỳ 1',
    tongTinChi: 20,
    tongTinChiTichLuy: 20,
    diemTBHe10: 6.83,
    diemTBHe4: 2.73,
    diemTBTichLuyHe10: 6.83,
    diemTBTichLuyHe4: 2.73,
    monHoc: [
      { stt: 1, ma: 'DC2HT26', ten: 'Cấu trúc dữ liệu và giải thuật', tc: 4, lanHoc: 1, lanThi: 1, he10: 6.3, he4: 2.5, chu: 'C+', danhGia: 'Đạt' },
      { stt: 2, ma: 'DC3HT21', ten: 'Hệ quản trị Cơ sở dữ liệu', tc: 3, lanHoc: 1, lanThi: 1, he10: 5.2, he4: 1.5, chu: 'D+', danhGia: 'Đạt' },
      { stt: 3, ma: 'DC2TT35', ten: 'Lập trình hướng đối tượng C++', tc: 3, lanHoc: 1, lanThi: 1, he10: 6.4, he4: 2.5, chu: 'C+', danhGia: 'Đạt' },
      { stt: 4, ma: 'DC2HT13', ten: 'Nhập môn mạng máy tính', tc: 3, lanHoc: 1, lanThi: 1, he10: 6.6, he4: 2.5, chu: 'C+', danhGia: 'Đạt' },
      { stt: 5, ma: 'DC1LL03', ten: 'Tư tưởng Hồ Chí Minh', tc: 2, lanHoc: 1, lanThi: 1, he10: 8.7, he4: 4.0, chu: 'A', danhGia: 'Đạt' },
      { stt: 6, ma: 'DC1CB52', ten: 'Xác suất thống kê', tc: 2, lanHoc: 1, lanThi: 1, he10: 6.3, he4: 2.5, chu: 'C+', danhGia: 'Đạt' },
    ],
  },
  {
    namHoc: 'Năm học 2024_2025 - Học kỳ 2',
    tongTinChi: 17,
    tongTinChiTichLuy: 37,
    diemTBHe10: 7.2,
    diemTBHe4: 2.9,
    diemTBTichLuyHe10: 6.95,
    diemTBTichLuyHe4: 2.8,
    monHoc: [
      { stt: 1, ma: 'DC1LL08', ten: 'Chủ nghĩa xã hội khoa học', tc: 2, lanHoc: 1, lanThi: 1, he10: 8.8, he4: 4.0, chu: 'A', danhGia: 'Đạt' },
      { stt: 2, ma: 'DC1LL07', ten: 'Kinh tế chính trị Mác - Lênin', tc: 2, lanHoc: 1, lanThi: 1, he10: 8.2, he4: 3.5, chu: 'B+', danhGia: 'Đạt' },
      { stt: 3, ma: 'DC2TT23', ten: 'Ngôn ngữ lập trình C', tc: 3, lanHoc: 1, lanThi: 1, he10: 8.0, he4: 3.5, chu: 'B+', danhGia: 'Đạt' },
      { stt: 4, ma: 'DC2TT22', ten: 'Nhập môn Cơ sở dữ liệu', tc: 3, lanHoc: 1, lanThi: 1, he10: 7.4, he4: 3.0, chu: 'B', danhGia: 'Đạt' },
      { stt: 5, ma: 'DC2HT42', ten: 'Toán học rời rạc', tc: 4, lanHoc: 1, lanThi: 1, he10: 6.6, he4: 2.5, chu: 'C+', danhGia: 'Đạt' },
      { stt: 6, ma: 'DC1TT33', ten: 'Vật lý đại cương', tc: 3, lanHoc: 1, lanThi: 1, he10: 5.5, he4: 2.0, chu: 'C', danhGia: 'Đạt' },
    ],
  },
];

export const khoiKienThucData = [
  { stt: 1, maKhoi: 'KHOIDAICUONG', tenKhoi: 'Khối Giáo dục đại cương', tongTC: 42, tongTCBatBuoc: 42, tongTCTichLuy: 29 },
  { stt: 2, maKhoi: 'Khối bắt buộc GDTC_GDQP', tenKhoi: 'Khối bắt buộc GDTC_GDQP', tongTC: 11, tongTCBatBuoc: 11, tongTCTichLuy: 0 },
  { stt: 3, maKhoi: 'Khối bổ trợ', tenKhoi: 'Khối bổ trợ', tongTC: 6, tongTCBatBuoc: 6, tongTCTichLuy: 3 },
  { stt: 4, maKhoi: 'Kiến thức chuyên ngành', tenKhoi: 'Kiến thức chuyên ngành', tongTC: 43, tongTCBatBuoc: 43, tongTCTichLuy: 3 },
  { stt: 5, maKhoi: 'Kiến thức cơ sở ngành', tenKhoi: 'Kiến thức cơ sở ngành', tongTC: 21, tongTCBatBuoc: 21, tongTCTichLuy: 12 },
  { stt: 6, maKhoi: 'Kiến thức ngành', tenKhoi: 'Kiến thức ngành', tongTC: 16, tongTCBatBuoc: 16, tongTCTichLuy: 7 },
  { stt: 7, maKhoi: 'Tốt nghiệp', tenKhoi: 'Tốt nghiệp', tongTC: 21, tongTCBatBuoc: 21, tongTCTichLuy: 0 },
  { stt: 8, maKhoi: 'Tự chọn GDTC', tenKhoi: 'Tự chọn GDTC', tongTC: 6, tongTCBatBuoc: 2, tongTCTichLuy: 0 },
  { stt: 9, maKhoi: 'Tự chọn khối bổ trợ', tenKhoi: 'Tự chọn khối bổ trợ', tongTC: 15, tongTCBatBuoc: 0, tongTCTichLuy: 0 },
  { stt: 10, maKhoi: 'Tự chọn kiến thức chuyên ngành', tenKhoi: 'Tự chọn kiến thức chuyên ngành', tongTC: 9, tongTCBatBuoc: 6, tongTCTichLuy: 0 },
  { stt: 11, maKhoi: 'Tự chọn kiến thức cơ sở ngành', tenKhoi: 'Tự chọn kiến thức cơ sở ngành', tongTC: 8, tongTCBatBuoc: 4, tongTCTichLuy: 0 },
  { stt: 12, maKhoi: 'Tự chọn kiến thức ngành', tenKhoi: 'Tự chọn kiến thức ngành', tongTC: 9, tongTCBatBuoc: 3, tongTCTichLuy: 0 },
];

export const ketQuaDangKyData = [
  { stt: 1, maLop: 'DC1TT55-1-1-24(N02)', tenLop: 'Nhập môn tìm hiểu ngành Công nghệ thông tin-1-1-24(N02)/75DCTT21', soTin: 3, giangVien: 'Phạm Thị Thuận', kieuHoc: 'HOCDI', thoiGian: '12/09/2024 15:29:25', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
  { stt: 2, maLop: 'DC1CB36-1-1-24(N86)', tenLop: 'Tiếng Anh cơ bản-1-1-24(N86)/75DCTT21', soTin: 2, giangVien: 'Dương Thị Hồng Anh', kieuHoc: 'HOCDI', thoiGian: '02/10/2024 17:47:00', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
  { stt: 3, maLop: 'DC1TT45-1-1-24(N61)', tenLop: 'Tin học-1-1-24(N61)/75DCTT21', soTin: 3, giangVien: 'Trần Văn Tâm', kieuHoc: 'HOCDI', thoiGian: '02/10/2024 17:47:21', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
  { stt: 4, maLop: 'DC1LL06-1-1-24(N100)', tenLop: 'Triết học Mác - Lênin-1-1-24(N100)/75DCTT21_75DCTT22', soTin: 3, giangVien: 'Nguyễn Văn Tuấn', kieuHoc: 'HOCDI', thoiGian: '02/10/2024 17:46:34', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
  { stt: 5, maLop: 'DC1CB51-1-1-24(N87)', tenLop: 'Toán đại cương-1-1-24(N87)/75DCTT21', soTin: 3, giangVien: 'Vũ Dũng', kieuHoc: 'HOCDI', thoiGian: '02/10/2024 17:47:30', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
  { stt: 6, maLop: 'DC1CB78-1-1-24(N09)', tenLop: 'Tư duy hệ thống-1-1-24(N09)/75DCTT21', soTin: 3, giangVien: 'Nguyễn Thị Thúy Hiền', kieuHoc: 'HOCDI', thoiGian: '02/10/2024 17:46:45', nguoiThucHien: 'HSSV3006', hocKy: '2024_2025_1,1', chuongTrinh: 'Công nghệ thông tin', diemQuaTrinh: 'Điểm quá trình' },
];

export const chuongTrinhHocData = [
  { stt: 1, ma: 'DC1LL08', ten: 'Chủ nghĩa xã hội khoa học', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '2024_2025_2,1(2)', lt: 39 },
  { stt: 2, ma: 'DC1LL07', ten: 'Kinh tế chính trị Mác - Lênin', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '2024_2025_2,1(2)', lt: 39 },
  { stt: 3, ma: 'DC1LL09', ten: 'Lịch sử Đảng cộng sản Việt Nam', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '', lt: 39 },
  { stt: 4, ma: 'DC3TT18', ten: 'Tiếng Anh chuyên ngành', khoi: 'KHOIDAICUONG', tcHP: 3, tcHP2: 3, hkThucTe: '', lt: 60 },
  { stt: 5, ma: 'DC2HT42', ten: 'Toán học rời rạc', khoi: 'KHOIDAICUONG', tcHP: 4, tcHP2: 4, hkThucTe: '2024_2025_2,1(2)', lt: 60 },
  { stt: 6, ma: 'DC1LL06', ten: 'Triết học Mác - Lênin', khoi: 'KHOIDAICUONG', tcHP: 3, tcHP2: 3, hkThucTe: '2024_2025_1,1(1)', lt: 60 },
  { stt: 7, ma: 'DC1LL03', ten: 'Tư tưởng Hồ Chí Minh', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '2025_2026_1,1(3)', lt: 39 },
  { stt: 8, ma: 'DC1CB48', ten: 'Khoa học dữ liệu và trí tuệ nhân tạo', khoi: 'KHOIDAICUONG', tcHP: 3, tcHP2: 3, hkThucTe: '2025_2026_2,1(4)', lt: 60 },
  { stt: 9, ma: 'DC1LL10', ten: 'Pháp luật Việt Nam đại cương', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '', lt: 39 },
  { stt: 10, ma: 'DC1CB36', ten: 'Tiếng Anh cơ bản', khoi: 'KHOIDAICUONG', tcHP: 2, tcHP2: 2, hkThucTe: '2024_2025_1,1(1)', lt: 45 },
  { stt: 11, ma: 'DC1CB37', ten: 'Tiếng Anh nâng cao', khoi: 'KHOIDAICUONG', tcHP: 3, tcHP2: 3, hkThucTe: '2025_2026_1,1(2)', lt: 60 },
  { stt: 12, ma: 'DC2TT23', ten: 'Ngôn ngữ lập trình C', khoi: 'KHOIDAICUONG', tcHP: 3, tcHP2: 3, hkThucTe: '2024_2025_2,1(2)', lt: 60 },
];

export const congNhanDiemData = [
  { stt: 1, ma: 'DC2CB20', ten: 'Quản lý dự án', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 2, ma: 'DC1LL07', ten: 'Kinh tế chính trị Mác - Lênin', tc: 2, ketQuaTichLuy: '8.2', ketQuaCongNhan: '' },
  { stt: 3, ma: 'DC2HT36', ten: 'Lập trình trên môi trường Web', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 4, ma: 'DC4TT24', ten: 'Thực tập doanh nghiệp', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 5, ma: 'DC1TD31', ten: 'Bóng chuyền', tc: 2, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 6, ma: 'DC1QP07', ten: 'Quân sự chung', tc: 2, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 7, ma: 'DC2TT32', ten: 'Điện toán đám mây', tc: 2, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 8, ma: 'DC1TD33', ten: 'Aerobic', tc: 2, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 9, ma: 'DC3TT18', ten: 'Tiếng Anh chuyên ngành', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 10, ma: 'DC3HT12', ten: 'Trí tuệ nhân tạo', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 11, ma: 'DC2HT38', ten: 'Công nghệ phần mềm', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
  { stt: 12, ma: 'DC3HT45', ten: 'Kiến trúc của hệ thống cảnh báo ùn tắc, an toàn giao thông', tc: 3, ketQuaTichLuy: '', ketQuaCongNhan: '' },
];

export const xetTotNghiepData = [
  { stt: 1, dot: 'Xét đồ án _Tháng 5.2025_CQ Thái Nguyên', loai: 'Xét làm đồ án, khóa luận tốt nghiệp' },
  { stt: 2, dot: 'XÉT TN DHCQ T7.2025 VY', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 3, dot: 'ĐA K73DHLT', loai: 'Xét làm đồ án, khóa luận tốt nghiệp' },
  { stt: 4, dot: 'XÉT TN T12.2024 VP', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 5, dot: 'XÉT TN T10.2024 (VY)', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 6, dot: 'XÉT TN DHCQ T5.2025 VY', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 7, dot: 'Xét TN T10_2025', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 8, dot: 'XÉT TN DHCQ T10.2025 VY', loai: 'Xét tốt nghiệp tổng thể' },
  { stt: 9, dot: 'XÉT TỐT NGHIỆP T10 (NHÁP)', loai: 'Xét tốt nghiệp tổng thể' },
];

export const tracuuKetQuaDangKyData = [
  { tenMon: 'Môn Kiến trúc máy tính', maMon: 'Kiến trúc máy tính-1-2-25(N06)/75DCTT21_75DCTT22', lyThuyet: '27/04/2026 - 05/07/2026', tongSo: 130, thu: '3,6', daDangKy: 128, hocPhi: '1,560,000', color: '#22c55e' },
  { tenMon: 'Môn Quân sự chung', maMon: 'Quân sự chung-1-2-25(N26)/75DCHT22_75DCTT23_7...', lyThuyet: '27/04/2026 - 28/06/2026', tongSo: 304, thu: '7', daDangKy: 293, hocPhi: '1,040,000', color: '#3b82f6' },
  { tenMon: 'Môn Kỹ thuật chiến đấu bộ binh và chiến thuật', maMon: 'Kỹ thuật chiến đấu bộ binh và chiến thuật-1-2-25(N26...', lyThuyet: '27/04/2026 - 28/06/2026', tongSo: 304, thu: '2,7', daDangKy: 293, hocPhi: '1,040,000', color: '#7c3aed' },
  { tenMon: 'Môn Khoa học dữ liệu và trí tuệ nhân tạo', maMon: 'Khoa học dữ liệu và trí tuệ nhân tạo-1-2-25(N06)/75D...', lyThuyet: '26/01/2026 - 12/04/2026', tongSo: 64, thu: '6,7', daDangKy: 64, hocPhi: '1,560,000', color: '#8b5cf6' },
  { tenMon: 'Môn Kỹ năng mềm', maMon: 'Kỹ năng mềm-1-2-25(N69)/75DCTT21_75DCTT22_75...', lyThuyet: '27/04/2026 - 05/07/2026', tongSo: 259, thu: '5', daDangKy: 250, hocPhi: '1,560,000', color: '#22c55e' },
  { tenMon: 'Môn Pickleball', maMon: 'Pickleball-1-2-25(N26)/75DCHT22_75DCTT23_75DC...', lyThuyet: '27/04/2026 - 05/07/2026', tongSo: 304, thu: '3,4', daDangKy: 293, hocPhi: '1,040,000', color: '#dc2626' },
  { tenMon: 'Môn Quản lý dự án', maMon: 'Quản lý dự án-1-2-25(N06)/75DCTT21', lyThuyet: '26/01/2026 - 12/04/2026', tongSo: 64, thu: '3,4', daDangKy: 62, hocPhi: '1,560,000', color: '#f97316' },
  { tenMon: 'Môn Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam', maMon: 'Đường lối quốc phòng và an ninh của Đảng Cộng sản ...', lyThuyet: '27/04/2026 - 28/06/2026', tongSo: 313, thu: '2,7', daDangKy: 293, hocPhi: '1,040,000', color: '#ec4899' },
  { tenMon: 'Môn Công tác quốc phòng và an ninh', maMon: 'Công tác quốc phòng và an ninh-1-2-25(N58)/75DCH...', lyThuyet: '27/04/2026 - 28/06/2026', tongSo: 313, thu: '2', daDangKy: 293, hocPhi: '1,040,000', color: '#1e293b' },
  { tenMon: 'Môn Cầu lông', maMon: 'Cầu lông-1-2-25(N02)/75DCHT22_75DCTT23_75DCH...', lyThuyet: '27/04/2026 - 05/07/2026', tongSo: 313, thu: '2', daDangKy: 293, hocPhi: '1,040,000', color: '#1e293b' },
  { tenMon: 'Môn Công nghệ phần mềm', maMon: 'Công nghệ phần mềm-1-2-25(N05)/75DCTT21', lyThuyet: '26/01/2026 - 12/04/2026', tongSo: 64, thu: '3,4,5', daDangKy: 64, hocPhi: '1,560,000', color: '#0891b2' },
  { tenMon: 'Môn Toán chuyên ngành', maMon: 'Toán chuyên ngành-1-2-25(N02)/75DCTT21', lyThuyet: '26/01/2026 - 12/04/2026', tongSo: 64, thu: '2,5,7', daDangKy: 62, hocPhi: '1,560,000', color: '#9333ea' },
];
