import { ICompany } from './company';

export interface IUrgency {
  company: ICompany;
  companyName?: string;
  companyId: string;
  id: string;
  name: string;
}

export class UrgencyDTO {
  id: string;
  name: string;
  company: Partial<ICompany> = {
    id: '',
  };

  constructor(formValue: IUrgency) {
    this.id = formValue.id;
    this.name = formValue.name;
    formValue.companyId
      ? (this.company.id = formValue.companyId)
      : (this.company = null);
  }
}
