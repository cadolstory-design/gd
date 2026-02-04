
import React, { useState } from 'react';

interface AdminPushProps {
  onSend: (title: string, message: string) => void;
}

const AdminPush: React.FC<AdminPushProps> = ({ onSend }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    setSending(true);
    // Simulate API delay
    setTimeout(() => {
      onSend(title, message);
      setSending(false);
      setTitle('');
      setMessage('');
      alert('전체 직원에게 푸시 알림이 전송되었습니다.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-xl border border-red-100">
        <h2 className="text-red-700 font-bold mb-1 flex items-center gap-2">
          ⚠️ 관리자 전용 푸시 전송
        </h2>
        <p className="text-xs text-red-600">이곳에서 작성하는 내용은 모든 고든병원 직원의 앱 상단에 즉시 알림으로 표시됩니다. 신중하게 전송해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">알림 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            placeholder="예: [긴급] 오늘 오후 컨퍼런스 취소 안내"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">알림 내용</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm h-32"
            placeholder="상세 내용을 입력하세요..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
            sending ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
          }`}
        >
          {sending ? '전송 중...' : '전체 직원 푸시 발송 🚀'}
        </button>
      </form>

      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 mb-3">최근 전송 이력</h3>
        <div className="space-y-3">
          <div className="border-l-2 border-slate-200 pl-3">
            <p className="text-xs font-bold text-slate-700">식당 메뉴 변경 안내</p>
            <p className="text-[10px] text-slate-400">2024-05-20 09:30</p>
          </div>
          <div className="border-l-2 border-slate-200 pl-3">
            <p className="text-xs font-bold text-slate-700">화재 예방 점검 실시</p>
            <p className="text-[10px] text-slate-400">2024-05-18 14:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPush;
