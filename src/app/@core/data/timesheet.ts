import { User } from './users';

export interface ITimesheet {
  id?: string;
  taskId: string;
  branchId: string;
  companyId: string;
  date: Date;
  startHour: Date;
  endHour: Date;
  user: User;
}
