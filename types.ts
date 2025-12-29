
export enum TaskType {
  CONFIRM = 'CONFIRM',
  SUBMIT_DATA = 'SUBMIT_DATA',
  ACCEPT = 'ACCEPT',
  EXCEPTION = 'EXCEPTION',
  PROGRESS = 'PROGRESS',
}

export enum TransactionStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  WAITING_CONFIRMATION = 'Waiting Confirmation',
  COMPLETED = 'Completed',
  REJECTED = 'Rejected',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: TaskType;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  source: 'HR Outsourcing' | 'Finance Outsourcing';
}

export interface Transaction {
  id: string;
  name: string;
  type: string;
  status: TransactionStatus;
  date: string;
  owner: string;
}

export enum WorkCategory {
  HR_TAX = 'HR_TAX',
  FINANCE = 'FINANCE',
  DATA = 'DATA',
  EXCEPTION = 'EXCEPTION',
}

export interface WorkItem {
  id: string;
  label: string;
  category: WorkCategory;
  iconName: string;
}
