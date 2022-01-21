import { IProjectTask } from 'src/app/@core/data/projectTask';
import { IProject } from 'src/app/@core/data/project';


export interface ISprint {
      id?: string;
      name: string;
      project: IProject;
      creationDate: Date;
      startDate: Date;
      endDate: Date;
      finishDate: Date;
      projectTaskList: IProjectTask[];
}

export class SprintDTO implements ISprint {

      id?: string;
      name: string;
      project: IProject;
      creationDate: Date;
      endDate: Date;
      startDate: Date;
      finishDate: Date;
      active: boolean;
      projectTaskList: IProjectTask[];

      constructor(formValue: ISprint) {
            this.id = formValue.id;
            this.name = formValue.name;
            this.project = formValue.project;
            this.creationDate = formValue.creationDate;
            this.startDate = formValue.startDate;
            this.endDate = formValue.endDate;
            this.finishDate = formValue.finishDate;
            this.projectTaskList = formValue.projectTaskList;
      }
}

export interface RawFormValue {
      id?: string;
      name: string;
      project: IProject;
      creationDate: Date;
      startDate: Date;
      endDate: Date;
      finishDate: Date;
      projectTaskList: IProjectTask[];
}