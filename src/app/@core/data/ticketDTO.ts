import { ITicket } from './tickets';

export class TicketDTO implements ITicket {
  ownerNameId: string;
  requestedById: string;
  company: string;
  summary: string;
  description: string;
  branch?: string;
  type?: string;
  draft?: boolean;
  subclassification?: string;
  classification?: string;
  urgencyId?: string;
  priorityId?: string;

  constructor(formValue: RawFormValue) {
    this.summary = formValue.summary;
    this.description = formValue.description;
    this.company = formValue.company;
    this.branch = formValue.branch;
    this.requestedById = formValue.requestedById;
    this.ownerNameId = formValue.ownerNameId;
    this.type = formValue.type;
    this.classification = formValue.classification;
    this.subclassification = formValue.subclassification;
    this.urgencyId = formValue.urgencyId;
    this.priorityId = formValue.priorityId;
    this.draft = false;
  }
}

export interface RawFormValue {
  summary: string;
  description: string;
  company: string;
  branch: string;
  requestedById: string;
  ownerNameId: string;
  type: string;
  classification: string;
  subclassification: string;
  urgencyId: string;
  priorityId: string;
}
