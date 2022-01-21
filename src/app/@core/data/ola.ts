import { ICompany } from './company';
import { ITaskType } from './taskType';

export interface IOla {
  bId: string;
  branch: ICompany;
  cId: string;
  company: ICompany;
  id: string;
  scheduleId: string;
  tId: string;
  taskType: ITaskType;
  timeToAnswer: number;
  timeToSolve: number;
  taskTypeName?: string;
}

export class OlaDTO {
  id: string;
  scheduleId: string;
  taskType: Partial<ITaskType> = {
    id: '',
  };
  timeToAnswer: number;
  timeToSolve: number;
  company: Partial<ICompany> = {
    id: '',
  };
  branch: Partial<ICompany> = {
    id: '',
  };

  constructor(formValue: IOla) {
    formValue.cId ? (this.company.id = formValue.cId) : (this.company = null);
    formValue.bId ? (this.branch.id = formValue.bId) : (this.branch = null);
    formValue.tId ? (this.taskType.id = formValue.tId) : (this.taskType = null);
    this.id = formValue.id;
    this.scheduleId = formValue.scheduleId;

    this.timeToAnswer = formValue.timeToAnswer;
    this.timeToSolve = formValue.timeToSolve;
  }
}
