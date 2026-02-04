
export type UserRole = 'admin' | 'staff';

export interface User {
  employeeId: string;
  name: string;
  role: UserRole;
  department: string;
  position: string; // 직위 필드 추가 (ex: 원장, 수간호사, 팀장 등)
  password?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  isImportant: boolean;
}

export interface HospitalEvent {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'holiday' | 'surgery' | 'other';
  description?: string;
}

export enum ViewType {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  CALENDAR = 'CALENDAR',
  NOTICES = 'NOTICES',
  ADMIN_PUSH = 'ADMIN_PUSH',
  USER_MANAGEMENT = 'USER_MANAGEMENT'
}
