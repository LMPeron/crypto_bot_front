import { ICompany } from './company';
import { ITaskType } from './taskType';
import { IProduct } from './product';

export interface ISla {
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

  classId: string;
  classification: IProduct;
  subclasId: string;
  subclassification: IProduct;
  matrix: boolean;
  matrixlist: [];
}

export class SlaDTO {
  id: string;
  scheduleId: string;
  taskType: Partial<ITaskType> = {
    id: '',
  };
  timeToAnswer: number;
  timeToSolve: number;

  classification: Partial<IProduct> = {
    id: '',
  };

  subclassification: Partial<IProduct> = {
    id: '',
  };
  matrix: boolean;
  matrixlist: [];
  company: Partial<ICompany> = {
    id: '',
  };
  branch: Partial<ICompany> = {
    id: '',
  };

  classId: string;
  subclasId: string;
  cId: string;
  bId: string;

  constructor(formValue: ISla) {
    formValue.cId ? (this.company.id = formValue.cId) : (this.company = null);
    formValue.bId ? (this.branch.id = formValue.bId) : (this.branch = null);
    formValue.tId ? (this.taskType.id = formValue.tId) : (this.taskType = null);
    formValue.classId
      ? (this.classification.id = formValue.classId)
      : (this.classification = null);
    formValue.subclasId
      ? (this.subclassification.id = formValue.subclasId)
      : (this.subclassification = null);
    this.id = formValue.id;
    this.scheduleId = formValue.scheduleId;
    this.matrix = formValue.matrix;

    this.timeToAnswer = formValue.timeToAnswer;
    this.timeToSolve = formValue.timeToSolve;

    this.classId = formValue.classId;
    this.subclasId = formValue.subclasId;
    this.cId = formValue.cId;
    this.bId = formValue.bId;
    this.matrixlist = formValue.matrixlist;
  }
}
