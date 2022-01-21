import { ICompany } from './company';

export interface IPriority {
  company: ICompany;
  companyId: string;
  id: string;
  name: string;
  companyName?: string;
}

export class PriorityDTO {
  id: string;
  name: string;
  company: Partial<ICompany> = {
    id: '',
  };

  constructor(formValue: IPriority) {
    this.id = formValue.id;
    this.name = formValue.name;
    formValue.companyId
      ? (this.company.id = formValue.companyId)
      : (this.company = null);
  }
}
