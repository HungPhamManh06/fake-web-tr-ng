import React, { useState } from 'react';
import api from '../api';

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'giang_vien' | 'sinh_vien';
  full_name: string;
  email?: string;
  phone?: string;
  ma_sv?: string;
  ma_gv?: string;
  lop?: string;
  nganh?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const DEMO_ACCOUNTS = [
  { role: 'admin', username: 'admin', password: 'admin123', label: '👑 Quản trị viên', color: '#ef4444' },
  { role: 'giang_vien', username: 'gv001', password: 'gv123', label: '👨‍🏫 Giảng viên', color: '#f97316' },
  { role: 'sinh_vien', username: '75dctt21355', password: 'sv123', label: '🎓 Sinh viên', color: '#3b82f6' },
];

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useOffline, setUseOffline] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError('Vui lòng nhập đầy đủ thông tin'); return; }
    setLoading(true);
    setError('');

    // Thử API thật trước
    if (!useOffline) {
      try {
        const res = await api.login(username, password);
        localStorage.setItem('qldsv_token', res.token);
        onLogin(res.user);
        return;
      } catch (err: unknown) {
        // Nếu backend không khả dụng → fallback offline
        const isNetworkError = err instanceof Error && (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('Failed'));
        if (isNetworkError) {
          setUseOffline(true);
        } else {
          setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
          setLoading(false);
          return;
        }
      }
    }

    // Offline fallback
    const offlineAccounts: Record<string, User & { password: string }> = {
      'admin': { id: 1, username: 'admin', password: 'admin123', role: 'admin', full_name: 'Quản trị viên' },
      'gv001': { id: 2, username: 'gv001', password: 'gv123', role: 'giang_vien', full_name: 'Nguyễn Thị Thuận', ma_gv: 'GV001' },
      'gv002': { id: 3, username: 'gv002', password: 'gv123', role: 'giang_vien', full_name: 'Dương Thị Hồng Anh', ma_gv: 'GV002' },
      'gv003': { id: 4, username: 'gv003', password: 'gv123', role: 'giang_vien', full_name: 'Trần Văn Tâm', ma_gv: 'GV003' },
      '75dctt21355': { id: 7, username: '75dctt21355', password: 'sv123', role: 'sinh_vien', full_name: 'Phạm Mạnh Hùng', ma_sv: '75DCTT21355', lop: '75DCTT21', nganh: 'Công nghệ thông tin' },
    };

    const acc = offlineAccounts[username];
    if (acc && acc.password === password) {
      const { password: _, ...user } = acc;
      void _;
      localStorage.setItem('qldsv_token', 'offline_token');
      onLogin(user);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
    setLoading(false);
  };

  const fillDemo = (u: string, p: string) => { setUsername(u); setPassword(p); setError(''); };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a2448 0%, #2d3a6b 50%, #1a2448 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.5)' }}>

        {/* LEFT - Banner */}
        <div style={{ background: 'linear-gradient(160deg, #1e3a8a, #3b82f6, #6366f1)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🎓</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>ĐẠI HỌC THÁI NGUYÊN</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Thai Nguyen University</div>
              </div>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.3, marginBottom: '16px' }}>Hệ Thống Quản Lý Điểm Sinh Viên</h1>
            <p style={{ opacity: 0.8, fontSize: '14px', lineHeight: 1.6 }}>Tra cứu điểm, đăng ký học phần, quản lý học phí và nhiều tiện ích khác dành cho sinh viên, giảng viên và quản trị viên.</p>
          </div>

          <div>
            <div style={{ marginBottom: '16px', fontSize: '13px', opacity: 0.7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Tài khoản demo</div>
            {DEMO_ACCOUNTS.map(acc => (
              <div key={acc.username} onClick={() => fillDemo(acc.username, acc.password)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px', cursor: 'pointer', transition: 'background 0.2s', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: acc.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{acc.label}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7 }}>{acc.username} / {acc.password}</div>
                </div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>Click để điền →</div>
              </div>
            ))}
            {useOffline && (
              <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)', fontSize: '12px', color: '#fbbf24' }}>
                ⚠️ Chế độ offline - Backend chưa kết nối
              </div>
            )}
          </div>
        </div>

        {/* RIGHT - Form */}
        <div style={{ background: 'white', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e2d5a', marginBottom: '8px' }}>Đăng nhập</h2>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Nhập thông tin tài khoản của bạn</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13.5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ❌ {error}
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Tên đăng nhập
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>👤</span>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nhập MSSV, mã GV hoặc admin"
                  style={{ width: '100%', padding: '11px 12px 11px 38px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Mật khẩu
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔒</span>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu"
                  style={{ width: '100%', padding: '11px 44px 11px 38px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = '#3b82f6'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94a3b8' }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #1e2d5a, #3b82f6)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', letterSpacing: '0.5px' }}>
              {loading ? '⏳ Đang đăng nhập...' : '🚀 Đăng nhập'}
            </button>
          </form>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Hệ thống Quản lý Điểm Sinh viên © 2025<br />
              Đại học Thái Nguyên
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
