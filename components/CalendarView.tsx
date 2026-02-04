
import React, { useState } from 'react';
import { HospitalEvent, User } from '../types';

interface CalendarViewProps {
  user: User;
  events: HospitalEvent[];
  onAddEvent?: (event: HospitalEvent) => void;
  onDeleteEvent?: (id: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ user, events, onAddEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newType, setNewType] = useState<HospitalEvent['type']>('other');

  const isAdmin = user.role === 'admin';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const firstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  const days = [];
  const total = daysInMonth(year, month);
  const offset = firstDay(year, month);

  for (let i = 0; i < offset; i++) days.push(null);
  for (let i = 1; i <= total; i++) days.push(i);

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !onAddEvent) return;

    onAddEvent({
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: newTitle,
      date: newDate,
      type: newType
    });

    setNewTitle('');
    setShowAddForm(false);
  };

  const confirmDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (!onDeleteEvent) return;
    
    if (window.confirm(`'${title}' 일정을 삭제하시겠습니까?`)) {
      onDeleteEvent(id);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">{year}년 {monthNames[month]}</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 text-slate-400">◀</button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 text-slate-400">▶</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-100 shadow-inner">
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={d} className={`text-[10px] text-center font-black py-1 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>{d}</div>
        ))}
        {days.map((day, idx) => {
          const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
          const dayEvents = day ? events.filter(e => e.date === dateStr) : [];
          const isToday = day && new Date().toISOString().split('T')[0] === dateStr;

          return (
            <div key={idx} className={`h-16 rounded-xl relative p-1 ${day ? 'bg-white shadow-sm' : ''}`}>
              {day && (
                <>
                  <span className={`text-[10px] font-bold block text-center ${isToday ? 'bg-[#003066] text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto' : 'text-slate-600'}`}>{day}</span>
                  <div className="mt-1 flex flex-wrap gap-0.5 justify-center">
                    {dayEvents.map(e => (
                      <div key={e.id} className={`w-1 h-1 rounded-full ${e.type === 'surgery' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black text-[#003066] uppercase tracking-wider">Schedule List</h3>
          {isAdmin && (
            <button onClick={() => setShowAddForm(!showAddForm)} className="text-[10px] font-bold bg-[#003066] text-white px-4 py-2 rounded-full">
              {showAddForm ? '취소' : '+ 일정 추가'}
            </button>
          )}
        </div>

        {isAdmin && showAddForm && (
          <form onSubmit={handleAddSubmit} className="bg-white p-5 rounded-[2rem] border shadow-xl mb-6 space-y-3">
            <input type="text" placeholder="일정 제목" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-sm outline-none" required />
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl text-sm" required />
            <select value={newType} onChange={e => setNewType(e.target.value as any)} className="w-full p-3 bg-slate-50 rounded-xl text-sm">
              <option value="meeting">회의/컨퍼런스</option>
              <option value="surgery">수술/시술</option>
              <option value="holiday">공휴일</option>
              <option value="other">기타</option>
            </select>
            <button type="submit" className="w-full py-3 bg-[#003066] text-white rounded-xl font-bold">등록</button>
          </form>
        )}

        <div className="space-y-3">
          {events
            .filter(e => {
              const d = new Date(e.date);
              return d.getMonth() === month && d.getFullYear() === year;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(e => (
              <div key={e.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-black ${e.type === 'surgery' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <span className="text-[8px] uppercase">{new Date(e.date).toLocaleString('ko-KR', {weekday: 'short'})}</span>
                    <span className="text-base">{new Date(e.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{e.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{e.type}</p>
                  </div>
                </div>
                {isAdmin && (
                  <button 
                    onClick={(event) => confirmDelete(event, e.id, e.title)}
                    className="p-2 text-slate-200 hover:text-red-500 active:scale-90 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
