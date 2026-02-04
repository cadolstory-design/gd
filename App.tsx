
import React, { useState, useEffect } from 'react';
import { User, Notice, HospitalEvent, ViewType } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import AdminPush from './components/AdminPush';
import UserManagement from './components/UserManagement';
import HospitalLogo from './components/HospitalLogo';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.LOGIN);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  
  // 직원 목록 관리
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('gordon_users');
    return saved ? JSON.parse(saved) : [
      { employeeId: 'admin', name: '박관리', role: 'admin', department: '병원전산팀', position: '팀장', password: 'admin' },
      { employeeId: '2024001', name: '홍길동', role: 'staff', department: '원장실', position: '원장', password: '1234' }
    ];
  });

  // 일정 목록 관리
  const [events, setEvents] = useState<HospitalEvent[]>(() => {
    const saved = localStorage.getItem('gordon_events');
    const today = new Date().toISOString().split('T')[0];
    if (saved) return JSON.parse(saved);
    
    return [
      { id: 'evt-1', title: '전체 컨퍼런스', date: today, type: 'meeting' },
      { id: 'evt-2', title: '원장님 수술 참관', date: today, type: 'surgery' },
      { id: 'evt-3', title: '개원 기념일', date: '2024-05-25', type: 'holiday' },
    ];
  });

  // 로컬 스토리지 저장 (데이터가 바뀔 때마다 실행)
  useEffect(() => {
    localStorage.setItem('gordon_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('gordon_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const hasSeenGuide = localStorage.getItem('gordon_install_guide');
    if (isMobile && !hasSeenGuide) {
      setShowInstallGuide(true);
    }
  }, []);

  const addUser = (newUser: User) => {
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.employeeId !== id));
  };

  const addEvent = (newEvent: HospitalEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  // 삭제 함수 (더 강력한 필터링)
  const deleteEvent = (id: string) => {
    setEvents(prev => {
      const filtered = prev.filter(e => e.id !== id);
      return [...filtered]; // 새 배열로 반환하여 리렌더링 강제
    });
  };

  const [notices] = useState<Notice[]>([
    { id: '1', title: '고든병원 상반기 소방교육 안내', content: '6월 15일 오후 4시 강당에서 전 직원 대상 소방교육이 있습니다.', author: '행정지원팀', date: '2024-05-15', isImportant: true },
    { id: '2', title: '신규 의료장비 도입 안내', content: '최신 MRI 장비가 도입되어 교육 세션이 예정되어 있습니다.', author: '의공학팀', date: '2024-05-18', isImportant: false },
    { id: '3', title: '여름휴가 신청 기간 공지', content: '부서별 일정 조율 후 5월 말까지 신청 바랍니다.', author: '인사과', date: '2024-05-10', isImportant: true }
  ]);

  const [globalPush, setGlobalPush] = useState<{ title: string; message: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const foundUser = users.find(u => u.employeeId === employeeId && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setCurrentView(ViewType.DASHBOARD);
    } else {
      setError('사번 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewType.LOGIN);
    setEmployeeId('');
    setPassword('');
  };

  const closeInstallGuide = () => {
    setShowInstallGuide(false);
    localStorage.setItem('gordon_install_guide', 'true');
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8fafc] p-6">
          <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,48,102,0.15)] space-y-10 animate-in fade-in zoom-in">
            <div className="text-center">
              <HospitalLogo className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-2xl font-black text-[#003066]">GORDON PORTAL</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Staff Access Only</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="사번"
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#003066] font-medium"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#003066] font-medium"
                required
              />
              {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
              <button type="submit" className="w-full py-4 bg-[#003066] text-white rounded-2xl font-bold shadow-lg">로그인</button>
            </form>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case ViewType.DASHBOARD:
        return <Dashboard user={user} notices={notices} events={events} />;
      case ViewType.CALENDAR:
        return <CalendarView user={user} events={events} onAddEvent={addEvent} onDeleteEvent={deleteEvent} />;
      case ViewType.ADMIN_PUSH:
        return <AdminPush onSend={(t, m) => setGlobalPush({title: t, message: m})} />;
      case ViewType.USER_MANAGEMENT:
        return <UserManagement users={users} onAddUser={addUser} onDeleteUser={deleteUser} />;
      case ViewType.NOTICES:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#003066] px-1">📢 공지사항</h2>
            {notices.map(n => (
              <div key={n.id} className={`p-5 rounded-2xl border ${n.isImportant ? 'bg-orange-50 border-orange-200' : 'bg-white border-slate-100'}`}>
                <h3 className="font-bold text-slate-800">{n.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{n.content}</p>
                <div className="flex justify-between text-[10px] text-slate-400 mt-4">
                  <span>{n.author}</span>
                  <span>{n.date}</span>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <Dashboard user={user} notices={notices} events={events} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView} user={user} onLogout={handleLogout}>
      {globalPush && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white border-l-4 border-[#003066] shadow-2xl rounded-xl p-5 z-50 animate-in slide-in-from-top-10">
          <div className="flex justify-between">
            <div className="pr-4">
              <h4 className="font-bold text-slate-800 text-sm">{globalPush.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{globalPush.message}</p>
            </div>
            <button onClick={() => setGlobalPush(null)} className="text-slate-300">✕</button>
          </div>
        </div>
      )}
      {renderContent()}
    </Layout>
  );
};

export default App;
