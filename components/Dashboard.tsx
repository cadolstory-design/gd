
import React, { useState, useEffect } from 'react';
import { User, Notice, HospitalEvent } from '../types';
import { getGeminiWelcomeMessage } from '../services/geminiService';

interface DashboardProps {
  user: User;
  notices: Notice[];
  events: HospitalEvent[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, notices, events }) => {
  const [welcome, setWelcome] = useState("로딩 중...");
  
  useEffect(() => {
    const fetchWelcome = async () => {
      const msg = await getGeminiWelcomeMessage(user.name, user.department, user.position);
      setWelcome(msg);
    };
    fetchWelcome();
  }, [user]);

  const today = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === today);
  const importantNotices = notices.filter(n => n.isImportant).slice(0, 2);

  const copyAppUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('앱 주소가 복사되었습니다! 직원들에게 이 주소를 공유하세요.');
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="bg-gradient-to-br from-[#003066] to-[#004a99] p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black opacity-60 uppercase tracking-widest mb-1">Gordon Hospital Portal</p>
          <h2 className="text-xl font-bold mb-4">
            {user.name} <span className="text-blue-200">{user.position}님</span> 반가워요!
          </h2>
          <p className="text-xs leading-relaxed opacity-90 italic">"{welcome}"</p>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={copyAppUrl} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left active:scale-95 transition-all">
          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">App Share</p>
          <p className="text-xs font-bold text-[#003066]">주소 복사하기 🔗</p>
        </button>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Status</p>
          <p className="text-xs font-bold text-green-500">정상 작동 중</p>
        </div>
      </div>

      <section>
        <h3 className="text-sm font-black text-slate-800 mb-3 px-1 uppercase tracking-wider flex justify-between items-center">
          <span>Today's Schedule</span>
          <span className="text-[10px] text-blue-500">{todayEvents.length}건</span>
        </h3>
        <div className="space-y-2">
          {todayEvents.length > 0 ? todayEvents.map(e => (
            <div key={e.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${e.type === 'surgery' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
              <span className="font-bold text-xs text-slate-700">{e.title}</span>
            </div>
          )) : (
            <div className="text-center py-8 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
               <p className="text-[11px] text-slate-400 font-bold uppercase">No events for today</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-black text-slate-800 mb-3 px-1 uppercase tracking-wider">Must-Read Notices</h3>
        <div className="space-y-3">
          {importantNotices.map(n => (
            <div key={n.id} className="bg-orange-50/50 p-5 rounded-[2rem] border border-orange-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] px-3 py-1 rounded-bl-xl font-black uppercase">Urgent</div>
               <h4 className="font-bold text-slate-800 text-sm mb-1">{n.title}</h4>
               <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{n.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
