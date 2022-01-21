import { ICompany } from './company';

export interface IJustification {
  agreementType: string;
  branch: ICompany;
  companyName?: string;
  company: ICompany;
  description: string;
  id: string;
  justificationType: string;
}

export class JustificationDTO {
  agreementType: string;
  branch: Partial<ICompany> = { id: '' };

  company: Partial<ICompany> = { id: '' };
  description: string;
  id: string;
  justificationType: string;

  constructor(form: IJustification) {
    this.agreementType = form.agreementType;
    if (form.branch) {
      this.branch.id = form.branch.id;
    } else {
      this.branch = null;
    }
    if (form.company) {
      this.company.id = form.company.id;
    } else {
      this.company = null;
    }

    this.company = form.company;
    this.description = form.description;
    this.id = form.id;
    this.justificationType = form.justificationType;
  }
}
