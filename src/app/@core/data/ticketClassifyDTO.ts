import { ITicket } from './tickets';

export class TicketClassifyDTO implements Partial<ITicket> {
  id?: string;
  ticketType?: string;
  subclassification?: string;
  classification?: string;
  urgency?: string;
  priority?: string;

  constructor(formValue: RawFormValue) {
    this.id = formValue.id;
    this.ticketType = formValue.type;
    this.classification = formValue.classification;
    this.subclassification = formValue.subclassification;
    this.urgency = formValue.urgencyId;
    this.priority = formValue.priorityId;
  }
}

export interface RawFormValue {
  id: string;
  type: string;
  classification: string;
  subclassification: string;
  urgencyId: string;
  priorityId: string;
}
