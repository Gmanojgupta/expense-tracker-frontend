export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface Expense {
  remarks: any;
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}


export interface AnalyticsData {
  byCategory: { category: string; _sum: { amount: number } }[];
  byMonth: { month: string; total: number }[];
  byStatus: { status: string; _count: { id: number } }[];
}
export interface Expense {
  _id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}