export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  createdDate: string;
  history?: any[];
  useremail?: string;
}
