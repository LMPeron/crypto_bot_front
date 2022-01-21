import { User } from './users';

export class NewWorkingTimeDTO {
  id?: string;
  branchId: string;
  companyId: string;
  date: string;
  startHour: string;
  endHour: string;
  taskId: string;
  user: User;

  constructor(formValue: NewWorkingTime) {
    this.branchId = formValue.branchId;
    this.companyId = formValue.companyId;
    this.date =
      formValue.date !== null
        ? new Date(formValue.date).toISOString()
        : new Date(formValue.startHour).toISOString();
    this.startHour = new Date(formValue.startHour).toISOString();
    this.endHour =
      formValue.endHour !== null
        ? new Date(formValue.endHour).toISOString()
        : null;
    this.taskId = formValue.taskId;
    this.user = formValue.user;
  }
}

export interface NewWorkingTime {
  id?: string;
  branchId: string;
  companyId: string;
  date: string;
  startHour: string;
  endHour: string;
  taskId: string;
  user?: User;
}
