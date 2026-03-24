import { useState } from 'react';

const PageLichHoc = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [calMonth, setCalMonth] = useState({ y: 2026, m: 2 }); // March 2026

  const BASE_MON = new Date(2026, 2, 23);
  const weekStart = new Date(BASE_MON);
  weekStart.setDate(BASE_MON.getDate() + weekOffset * 7);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d;
  });

  const today = new Date(2026, 2, 25);
  const HOUR_HEIGHT = 62;
  const TOP_HOUR = 6;
  const hours = Array.from({ length: 16 }, (_, i) => i + 6);
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const COL_W = 70;

  type Ev = {
    day: number; sH: number; sM: number; eH: number; eM: number;
    title: string; code: string; room: string; gv: string; color: string; tiet: string; online?: boolean;
  };

  const events: Ev[] = [
    { day: 1, sH: 6, sM: 45, eH: 9, eM: 25, tiet: 'Tiết 1-3', title: 'Quản lý dự án', code: 'Quản lý dự án-1-2-25(N06)/75DCTT21', room: 'A3.402', gv: 'Nguyễn Thị', color: '#f97316' },
    { day: 1, sH: 9, sM: 30, eH: 12, eM: 10, tiet: 'Tiết 4-6', title: 'Công nghệ phần mềm', code: 'Công nghệ phần mềm-1-2-25(N05)/75DCTT21', room: 'A3.402', gv: 'Nguyễn H...', color: '#1e2d5a' },
    { day: 3, sH: 6, sM: 45, eH: 10, eM: 20, tiet: 'Tiết 1-4', title: 'Toán chuyên ngành', code: 'Toán chuyên ngành-1-2-25(N02)/75DCTT21', room: 'C2.202', gv: 'Hoàng Văn Cẩn', color: '#f97316' },
    { day: 3, sH: 10, sM: 25, eH: 12, eM: 10, tiet: 'Tiết 5-6', title: 'Công nghệ phần mềm', code: 'Công nghệ phần mềm-1-2-25(N05)/75DCTT21', room: 'C2.2...', gv: '', color: '#1e2d5a' },
    { day: 3, sH: 12, sM: 45, eH: 16, eM: 20, tiet: 'Tiết 7-10', title: 'Quản lý dự án', code: 'Quản lý dự án-1-2-25(N06)/75DCTT21', room: 'C2.202', gv: 'Nguyễn Thị Ngọc Bích', color: '#3b5bdb' },
    { day: 4, sH: 8, sM: 35, eH: 12, eM: 10, tiet: 'Tiết 3-6', title: 'Khoa học dữ liệu và trí...', code: 'Khoa học dữ liệu và trí tuệ nhân tạo-1-2-25(N06)/75DCTT21', room: '', gv: 'Nguyễn Du...', color: '#f97316', online: true },
    { day: 4, sH: 10, sM: 25, eH: 12, eM: 10, tiet: 'Tiết 5-6', title: 'Khoa học dữ liệu và trí...', code: 'Khoa học dữ liệu và trí tuệ nhân tạo-1-2-25(N06)/75DCTT21', room: '', gv: 'Nguyễn Duy Cương', color: '#1e2d5a', online: true },
    { day: 5, sH: 6, sM: 45, eH: 9, eM: 25, tiet: 'Tiết 1-3', title: 'Khoa học dữ liệu và trí...', code: 'Khoa học dữ liệu và trí tuệ nhân tạo-1-2-25(N06)/75DCTT21', room: '', gv: 'Nguyễn Du...', color: '#f97316', online: true },
    { day: 5, sH: 12, sM: 45, eH: 15, eM: 25, tiet: 'Tiết 7-9', title: 'Toán chuyên ngành', code: 'Toán chuyên ngành-1-2-25(N02)/75DCTT21', room: 'A2.102', gv: 'Hoàng V...', color: '#f97316' },
  ];

  const toMin = (h: number, m: number) => h * 60 + m;

  // Mini calendar
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y: number, m: number) => { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; };
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const daysInMonth = getDaysInMonth(calMonth.y, calMonth.m);
  const firstDay = getFirstDay(calMonth.y, calMonth.m);
  const weekDayHdrs = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'Cn'];

  const prevMonth = () => setCalMonth(p => p.m === 0 ? { y: p.y - 1, m: 11 } : { y: p.y, m: p.m - 1 });
  const nextMonth = () => setCalMonth(p => p.m === 11 ? { y: p.y + 1, m: 0 } : { y: p.y, m: p.m + 1 });

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', height: '100%' }}>
      {/* Main calendar grid */}
      <div style={{ flex: 1, background: 'white', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Title bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1e2d5a', flex: 1 }}>Lịch cá nhân</div>
        </div>

        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <div style={{ minWidth: 700, position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: `${COL_W}px repeat(7, 1fr)`, borderBottom: '2px solid #e2e8f0', position: 'sticky', top: 0, background: 'white', zIndex: 20 }}>
              <div style={{ padding: '10px 8px', fontSize: 11, color: '#64748b', borderRight: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <span>⏱</span><span style={{ fontSize: 10 }}>GMT+7</span>
              </div>
              {weekDates.map((d, i) => {
                const isToday = d.toDateString() === today.toDateString();
                return (
                  <div key={i} style={{ padding: '6px 4px', textAlign: 'center', borderRight: i < 6 ? '1px solid #e2e8f0' : 'none', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{dayLabels[i]}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isToday ? 'white' : '#1e293b', background: isToday ? '#f97316' : 'transparent', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1px' }}>
                      {String(d.getDate()).padStart(2, '0')}/{String(d.getMonth() + 1).padStart(2, '0')}/{d.getFullYear()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Week prev/next buttons row */}
            <div style={{ display: 'flex', gap: 8, padding: '6px 12px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
              <button onClick={() => setWeekOffset(w => w - 1)} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: 6, padding: '3px 12px', cursor: 'pointer', fontSize: 14, color: '#1e2d5a' }}>‹ Tuần trước</button>
              <button onClick={() => setWeekOffset(0)} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: 6, padding: '3px 12px', cursor: 'pointer', fontSize: 13, color: '#64748b' }}>Hôm nay</button>
              <button onClick={() => setWeekOffset(w => w + 1)} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: 6, padding: '3px 12px', cursor: 'pointer', fontSize: 14, color: '#1e2d5a' }}>Tuần sau ›</button>
            </div>

            {/* Time grid + events */}
            <div style={{ position: 'relative' }}>
              {/* Hour lines */}
              {hours.map(h => (
                <div key={h} style={{ display: 'grid', gridTemplateColumns: `${COL_W}px repeat(7, 1fr)`, height: HOUR_HEIGHT, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ padding: '4px 8px', fontSize: 11, color: '#94a3b8', borderRight: '1px solid #e2e8f0', textAlign: 'right', paddingTop: 2, boxSizing: 'border-box' }}>{h}:00</div>
                  {Array.from({ length: 7 }).map((_, ci) => (
                    <div key={ci} style={{ borderRight: ci < 6 ? '1px solid #f8fafc' : 'none' }} />
                  ))}
                </div>
              ))}

              {/* Events */}
              <div style={{ position: 'absolute', top: 0, left: COL_W, right: 0, height: hours.length * HOUR_HEIGHT, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {Array.from({ length: 7 }).map((_, dayIdx) => (
                  <div key={dayIdx} style={{ position: 'relative', borderRight: dayIdx < 6 ? '1px solid #f1f5f9' : 'none' }}>
                    {events.filter(e => e.day === dayIdx).map((ev, ei) => {
                      const topMin = toMin(ev.sH, ev.sM) - toMin(TOP_HOUR, 0);
                      const durMin = toMin(ev.eH, ev.eM) - toMin(ev.sH, ev.sM);
                      const top = (topMin / 60) * HOUR_HEIGHT;
                      const height = Math.max((durMin / 60) * HOUR_HEIGHT, 38);
                      return (
                        <div key={ei} style={{
                          position: 'absolute', left: 2, right: 2, top, height,
                          background: ev.color, borderRadius: 6, padding: '4px 6px',
                          overflow: 'hidden', cursor: 'pointer', zIndex: 5, boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{ev.title}</div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.9)' }}>
                            {String(ev.sH).padStart(2, '0')}:{String(ev.sM).padStart(2, '0')} - {String(ev.eH).padStart(2, '0')}:{String(ev.eM).padStart(2, '0')} ({ev.tiet})
                          </div>
                          {height > 58 && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.82)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.code}</div>}
                          {height > 80 && ev.room && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.82)' }}>{ev.room}</div>}
                          {height > 100 && <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.82)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.online ? 'Trực tuyến' : ''} {ev.gv}</div>}
                          <div style={{ position: 'absolute', bottom: 3, right: 3, display: 'flex', gap: 2 }}>
                            {['−', '⊕', '+'].map(s => (
                              <span key={s} style={{ background: 'rgba(255,255,255,0.28)', borderRadius: '50%', width: 15, height: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'white', cursor: 'pointer' }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini calendar */}
      <div style={{ width: 210, background: '#1a2448', borderRadius: 12, padding: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.2)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'white', flex: 1 }}>{monthNames[calMonth.m]}-{calMonth.y}</div>
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1 }}>‹</button>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 16, padding: '0 4px', lineHeight: 1 }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 4 }}>
          {weekDayHdrs.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, padding: '2px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} style={{ height: 26 }} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday2 = calMonth.y === today.getFullYear() && calMonth.m === today.getMonth() && day === today.getDate();
            return (
              <div key={day} style={{
                textAlign: 'center', fontSize: 11,
                color: isToday2 ? '#1e2d5a' : 'rgba(255,255,255,0.85)',
                background: isToday2 ? '#f97316' : 'transparent',
                borderRadius: '50%', width: 26, height: 26,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', cursor: 'pointer',
                fontWeight: isToday2 ? 700 : 400
              }}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageLichHoc;
