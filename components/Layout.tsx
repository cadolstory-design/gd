
import React from 'react';
import { ViewType, User } from '../types';
import HospitalLogo from './HospitalLogo';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  setView: (view: ViewType) => void;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, user, onLogout }) => {
  if (!user) return <>{children}</>;

  const navItems = [
    { type: ViewType.DASHBOARD, label: '홈', icon: '🏠' },
    { type: ViewType.CALENDAR, label: '일정', icon: '📅' },
    { type: ViewType.NOTICES, label: '공지', icon: '📢' },
  ];

  if (user.role === 'admin') {
    navItems.push({ type: ViewType.ADMIN_PUSH, label: '푸시전송', icon: '🚀' });
    navItems.push({ type: ViewType.USER_MANAGEMENT, label: '직원관리', icon: '👥' });
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      {/* Header - 병원 고유 컬러 적용 */}
      <header className="sticky top-0 z-20 bg-[#003066] text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <HospitalLogo className="w-9 h-9 !bg-white rounded-lg shadow-sm [&_path]:stroke-[#003066]" />
          <h1 className="font-bold text-lg tracking-tight">고든병원 Portal</h1>
        </div>
        <button onClick={onLogout} className="text-[10px] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors font-bold border border-white/20 tracking-wider">LOGOUT</button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto p-4 bg-slate-50/50">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t flex justify-around py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setView(item.type)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              currentView === item.type ? 'text-[#003066] scale-110' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
