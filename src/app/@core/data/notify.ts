import { ICompany } from './company';

export interface INotifyConf {
  company: ICompany;
  companyId: string;
  companyName: string;
  id: string;
  notifyAddAttachment: boolean;
  notifyAddComment: boolean;
  notifyAssumeTask: boolean;
  notifyChangeStatus: boolean;
  notifyCloseTask: boolean;
  notifyCloseTicket: boolean;
  notifyNewTask: boolean;
  notifyNewTicket: boolean;
  notifyRemoveAttachment: boolean;
  notifySla25: boolean;
  notifySla50: boolean;
  notifySla60: boolean;
  notifySla70: boolean;
  notifySla75: boolean;
  notifySla80: boolean;
  notifySla85: boolean;
  notifySla90: boolean;
  notifySla95: boolean;
  notifySlaExpired: boolean;
}

export class NotifyDTO {
  id: string;
  company: Partial<ICompany> = {
    id: '',
  };
  notifyAddAttachment: boolean;
  notifyAddComment: boolean;
  notifyAssumeTask: boolean;
  notifyChangeStatus: boolean;
  notifyCloseTask: boolean;
  notifyCloseTicket: boolean;
  notifyNewTask: boolean;
  notifyNewTicket: boolean;
  notifyRemoveAttachment: boolean;
  notifySla25: boolean;
  notifySla50: boolean;
  notifySla60: boolean;
  notifySla70: boolean;
  notifySla75: boolean;
  notifySla80: boolean;
  notifySla85: boolean;
  notifySla90: boolean;
  notifySla95: boolean;
  notifySlaExpired: boolean;

  constructor(formValue: INotifyConf) {
    this.id = formValue.id;
    formValue.companyId
      ? (this.company.id = formValue.companyId)
      : (this.company = null);
    this.notifyAddAttachment = formValue.notifyAddAttachment;
    this.notifyAddComment = formValue.notifyAddComment;
    this.notifyAssumeTask = formValue.notifyAssumeTask;
    this.notifyChangeStatus = formValue.notifyChangeStatus;
    this.notifyCloseTask = formValue.notifyCloseTask;
    this.notifyCloseTicket = formValue.notifyCloseTicket;
    this.notifyNewTask = formValue.notifyNewTask;
    this.notifyNewTicket = formValue.notifyNewTicket;
    this.notifyRemoveAttachment = formValue.notifyRemoveAttachment;
    this.notifySla25 = formValue.notifySla25;
    this.notifySla50 = formValue.notifySla50;
    this.notifySla60 = formValue.notifySla60;
    this.notifySla70 = formValue.notifySla70;
    this.notifySla75 = formValue.notifySla75;
    this.notifySla80 = formValue.notifySla80;
    this.notifySla85 = formValue.notifySla85;
    this.notifySla90 = formValue.notifySla90;
    this.notifySla95 = formValue.notifySla95;
    this.notifySlaExpired = formValue.notifySlaExpired;
  }
}
