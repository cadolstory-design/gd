
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface UserManagementProps {
  users: User[];
  onAddUser: (user: User) => void;
  onDeleteUser: (employeeId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUser, onDeleteUser }) => {
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newDept, setNewDept] = useState('간호본부');
  const [newPosition, setNewPosition] = useState('사원');
  const [newRole, setNewRole] = useState<UserRole>('staff');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newName || !newPw) return;

    onAddUser({
      employeeId: newId,
      name: newName,
      password: newPw,
      department: newDept,
      position: newPosition,
      role: newRole
    });

    setNewId('');
    setNewName('');
    setNewPw('');
    setNewPosition('사원');
    setNewRole('staff');
  };

  const departments = ['간호본부', '외래진료팀', '행정지원팀', '원무과', '영상의학팀', '원장실'];
  const positions = ['원장', '부원장', '실장', '과장', '팀장', '수간호사', '주임간호사', '간호사', '사원'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="text-blue-600">👤</span> 신규 직원/관리자 등록
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="사번"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003066]"
              required
            />
            <input
              type="text"
              placeholder="이름"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003066]"
              required
            />
          </div>
          
          <input
            type="text"
            placeholder="비밀번호"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003066]"
            required
          />

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">부서 설정</label>
            <select 
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003066]"
            >
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">직위 설정</label>
            <select 
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003066]"
            >
              {positions.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase">사용 권한</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNewRole('staff')}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${newRole === 'staff' ? 'bg-[#003066] text-white border-[#003066]' : 'bg-white text-slate-400 border-slate-200'}`}
              >
                일반 직원
              </button>
              <button
                type="button"
                onClick={() => setNewRole('admin')}
                className={`py-2 text-xs font-bold rounded-lg border transition-all ${newRole === 'admin' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-400 border-slate-200'}`}
              >
                관리자
              </button>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-[#003066] text-white font-bold rounded-xl shadow-lg hover:bg-black transition-all active:scale-95 mt-2">
            사용자 등록하기
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-400 px-1 flex justify-between items-center">
          <span>등록된 멤버 목록 ({users.length})</span>
          <span className="text-[10px] text-blue-500 font-bold uppercase">Active System</span>
        </h3>
        {users.map(u => (
          <div key={u.employeeId} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center transition-all hover:border-[#003066]/30">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-bold text-slate-800 text-sm">{u.name} {u.position}</p>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase ${u.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {u.role === 'admin' ? 'ADMIN' : 'STAFF'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{u.employeeId} | {u.department}</p>
              <p className="text-[10px] text-[#B18C4D] font-mono mt-1">🔑 PW: {u.password}</p>
            </div>
            {u.employeeId !== 'admin' && (
              <button 
                onClick={() => onDeleteUser(u.employeeId)}
                className="text-slate-300 hover:text-red-500 p-2 transition-colors"
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
  );
};

export default UserManagement;
