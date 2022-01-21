import { IComment } from './comment';
import { IProject } from './project';
import { IStatus } from './status';
import { IUserMini } from './users';

export interface IProjectTask {
  id?: string;
  title?: string;
  description?: string;
  creationDate?: Date;
  createdBy?: string;
  project?: Partial<IProject>;
  owner?: IUserMini;
  number: number;
  status?: IStatus;


  dueDate?: Date;
  realAnswerDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  cancelDate?: Date;

  commentList?: IComment[];
  _rev?: any;

}

export class IProjectTaskDTO {
  title?: string;
  description?: string;
  project: Partial<IProject>;
  owner: IUserMini;

  constructor(formValue: RawFormValue) {
    this.title = formValue.title;
    this.description = formValue.description;
    this.project = formValue.project;
    this.owner = formValue.owner;
  }
}

export interface RawFormValue {
  title: string;
  description: string;
  owner: IUserMini;
  project: Partial<IProject>;
}
