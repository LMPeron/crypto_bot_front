export interface IExternalTicket {
  active: boolean;
  branchId: string;
  branchName: string;
  classificationId: string;
  classificationName: string;
  companyId: string;
  companyName: string;
  id: string;
  name: string;
  priorityId: string;
  priorityName: string;
  requestedById: string;
  requestedByName: string;
  subclassificationId: string;
  subclassificationName: string;
  ticketType: string;
  token: string;
  urgencyId: string;
  urgencyName: string;
}

export class ExternalTickerConfDTO {
  active: boolean;
  branchId: string;
  classificationId: string;
  companyId: string;
  id: string;
  name: string;
  priorityId: string;
  requestedById: string;
  subclassificationId: string;
  ticketType: string;
  token: string;
  urgencyId: string;
  constructor(formValue: IExternalTicket) {
    this.active = formValue.active;
    this.branchId = formValue.branchId;
    this.classificationId = formValue.classificationId;
    this.companyId = formValue.companyId;
    this.id = formValue.id;
    this.name = formValue.name;
    this.priorityId = formValue.priorityId;
    this.requestedById = formValue.requestedById;
    this.subclassificationId = formValue.subclassificationId;
    this.ticketType = formValue.ticketType;
    this.token = formValue.token;
    this.urgencyId = formValue.urgencyId;
  }
}
