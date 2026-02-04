
import React from 'react';

interface HospitalLogoProps {
  className?: string;
}

const HospitalLogo: React.FC<HospitalLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} flex items-center justify-center overflow-hidden transition-transform active:scale-95`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* 고든병원 정밀 로고 재구성 */}
        
        {/* 1. G 심볼 (이미지의 두께와 곡률 반영) */}
        <path 
          d="M74.5 34.5C69.5 27.5 61.5 23.5 51.5 23.5C35 23.5 21.5 37 21.5 53.5C21.5 70 35 83.5 51.5 83.5C66.5 83.5 79 73 80.5 58H54" 
          stroke="#003066" 
          strokeWidth="9" 
          strokeLinecap="butt" 
          fill="none"
        />
        
        {/* 2. 척추 형상 (이미지의 S자 곡선과 마디 형태 반영) */}
        <g fill="#B18C4D">
          {/* 각 마디를 이미지의 기울기와 위치에 맞춰 좌표 계산 */}
          <path d="M47 82.5 L51.5 83.5 L52.5 81.5 L48 80.5 Z" />
          <path d="M46.2 78.5 L51.8 79.8 L52.8 77.8 L47.2 76.5 Z" />
          <path d="M45.5 74.5 L52 76.1 L53 74.1 L46.5 72.5 Z" />
          <path d="M45.1 70.5 L52.2 72.4 L53.2 70.4 L46.1 68.5 Z" />
          <path d="M45.4 66.5 L53.4 68.7 L54.4 66.7 L46.4 64.5 Z" />
          <path d="M46.4 62.5 L55.4 65 L56.4 63 L47.4 60.5 Z" />
          <path d="M48 58.5 L57.5 61.3 L58.5 59.3 L49 56.5 Z" />
          <path d="M49.8 54.5 L59.5 57.6 L60.5 55.6 L50.8 52.5 Z" />
          <path d="M51.3 50.5 L60.3 53.4 L61.3 51.4 L52.3 48.5 Z" />
          <path d="M51.8 46.5 L59.8 48.9 L60.8 46.9 L52.8 44.5 Z" />
          <path d="M51.3 42.5 L58.3 44.4 L59.3 42.4 L52.3 40.5 Z" />
          <path d="M50.3 38.5 L56.3 40 L57.3 38 L51.3 36.5 Z" />
          <path d="M49.2 34.5 L54.5 35.8 L55.5 33.8 L50.2 32.5 Z" />
          <path d="M48.5 30.5 L53 31.6 L54 29.6 L49.5 28.5 Z" />
          <path d="M47.8 26.5 L51.5 27.4 L52.5 25.4 L48.8 24.5 Z" />
          <path d="M47.5 22.5 L50 23.2 L51 21.2 L48.5 20.5 Z" />
        </g>
      </svg>
    </div>
  );
};

export default HospitalLogo;
