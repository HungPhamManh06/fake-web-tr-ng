// ==================== API SERVICE ====================
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api';

function getToken(): string | null {
  return localStorage.getItem('qldsv_token');
}

async function request(method: string, path: string, body?: unknown) {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Lỗi máy chủ');
  return data;
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request('POST', '/auth/login', { username, password }),
  changePassword: (old_password: string, new_password: string) =>
    request('POST', '/auth/change-password', { old_password, new_password }),

  // Admin - Stats
  adminStats: () => request('GET', '/admin/stats'),
  adminAuditLog: () => request('GET', '/admin/audit-log'),

  // Admin - Users
  adminGetUsers: (params?: { role?: string; search?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return request('GET', `/admin/users${q ? '?' + q : ''}`);
  },
  adminCreateUser: (data: unknown) => request('POST', '/admin/users', data),
  adminUpdateUser: (id: number, data: unknown) => request('PUT', `/admin/users/${id}`, data),
  adminToggleUser: (id: number) => request('PUT', `/admin/users/${id}/toggle`),
  adminResetPassword: (id: number, new_password: string) =>
    request('PUT', `/admin/users/${id}/reset-password`, { new_password }),

  // Admin - Sinh viên
  adminGetSV: (params?: { search?: string; lop?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return request('GET', `/admin/sinh-vien${q ? '?' + q : ''}`);
  },
  adminCreateSV: (data: unknown) => request('POST', '/admin/sinh-vien', data),
  adminUpdateSV: (id: number, data: unknown) => request('PUT', `/admin/sinh-vien/${id}`, data),
  adminDeleteSV: (id: number) => request('DELETE', `/admin/sinh-vien/${id}`),

  // Admin - Giảng viên
  adminGetGV: () => request('GET', '/admin/giang-vien'),

  // Admin - Môn học
  adminGetMonHoc: () => request('GET', '/admin/mon-hoc'),
  adminCreateMonHoc: (data: unknown) => request('POST', '/admin/mon-hoc', data),
  adminUpdateMonHoc: (id: number, data: unknown) => request('PUT', `/admin/mon-hoc/${id}`, data),

  // Admin - Lớp học phần
  adminGetLHP: () => request('GET', '/admin/lop-hoc-phan'),

  // Admin - Phân quyền
  adminGetPhanQuyen: () => request('GET', '/admin/phan-quyen'),
  adminPhanQuyen: (data: unknown) => request('POST', '/admin/phan-quyen', data),
  adminRevokePhanQuyen: (id: number) => request('DELETE', `/admin/phan-quyen/${id}`),

  // Admin - Bảng điểm
  adminGetBangDiem: (params?: Record<string, string>) => {
    const q = new URLSearchParams(params).toString();
    return request('GET', `/admin/bang-diem${q ? '?' + q : ''}`);
  },

  // Giảng viên
  gvProfile: () => request('GET', '/gv/profile'),
  gvGetLHP: () => request('GET', '/gv/lop-hoc-phan'),
  gvGetSinhVien: (lhpId: number) => request('GET', `/gv/sinh-vien/${lhpId}`),
  gvNhapDiem: (data: unknown) => request('POST', '/gv/nhap-diem', data),
  gvNhapDiemBatch: (data: unknown) => request('POST', '/gv/nhap-diem-batch', data),

  // Sinh viên
  svProfile: () => request('GET', '/sv/profile'),
  svBangDiem: () => request('GET', '/sv/bang-diem'),
  svTKB: () => request('GET', '/sv/thoi-khoa-bieu'),
  svThongBao: () => request('GET', '/sv/thong-bao'),
  svDocThongBao: (id: number) => request('PUT', `/sv/thong-bao/${id}/doc`),

  // Shared
  health: () => request('GET', '/health'),
  getMonHoc: () => request('GET', '/mon-hoc'),
  getLHP: () => request('GET', '/lop-hoc-phan'),
};

export default api;
