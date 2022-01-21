import { ITask } from './tasks';
import { IUserGroup, User } from './users';
import { ITaskType } from './taskType';

export class NewTaskDTO implements Partial<ITask> {
  title: string;
  branch: string;
  classification: string;
  company: string;
  description: string;
  group: string;
  owner: User;
  requestedById: string;
  schedule: false;
  subclassification: string;
  ticket: string;
  taskType: {};

  constructor(formValue: RawFormValue) {
    this.title = formValue.title;
    this.branch = formValue.branch;
    this.classification = formValue.classification;
    this.company = formValue.company;
    this.subclassification = formValue.subclassification;
    this.description = formValue.description;
    this.owner = formValue.owner;
    this.group = formValue.group.id;
    this.requestedById = formValue.requestedById;
    this.schedule = formValue.schedule;
    this.ticket = formValue.ticket;
    this.taskType = formValue.taskType;
  }
}

export interface RawFormValue {
  title: string;
  branch: string;
  classification: string;
  company: string;
  description: string;
  owner: User;
  group: IUserGroup;
  requestedById: string;
  schedule: false;
  subclassification: string;
  ticket: string;
  taskType: ITaskType;
}
