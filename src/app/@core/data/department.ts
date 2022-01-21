import { ICompany } from './company';

export interface IDepartment {
  branch: ICompany;
  company: ICompany;
  description: string;
  id: string;
}

export class DepartmentDTO {
  branch: ICompany;
  company: ICompany;
  description: string;
  id: string;
  constructor(formValue: IDepartment) {
    this.branch = formValue.branch;
    this.company = formValue.company;
    this.description = formValue.description;
    this.id = formValue.id;
  }
}
