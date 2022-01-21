import { IWorkspace } from 'src/app/@core/data/workspace';
import { IContact } from './contact';
import { IPriority } from './priority';
import { IClassification } from './classification';
import { ICompany } from './company';
import { IProject } from './project';
import { IProjectStatus } from './projectStatus';
import { IUserMini } from './users';
import { IComment } from './comment';
import { IExpense } from './expense';
import { IRules } from './rules';

export class ProjectDTO implements IProject {
  id: string;
  name: string;
  description?: string;
  createdBy?: IUserMini;
  owner?: IUserMini;
  status?: IProjectStatus;
  creationDate?: Date;
  dueDate?: Date;
  dueStartDate?: Date;
  realAnswerDate?: Date;
  answerDate?: Date;
  company?: ICompany;
  companyClient: ICompany;
  clientName: string;
  number: number;
  usersInvolved: IUserMini[];
  isRegisteredClient: boolean;
  classification?: IClassification;
  priority?: IPriority;
  stakeholders?: IContact[];
  justification?: string;
  premise?: string;
  restrictions?: string;
  acceptanceCriteria?: string;
  risks?: string;
  estimatedRevenue?: number;
  realRevenue?: number;
  estimatedSpend?: number;
  realSpend?: number;
  estimatedEffort?: number;
  workspace?: IWorkspace;
  attachmentList?: any[];
  requestedBy?: string;
  reopenDate?: Date;
  startDate?: Date;
  finishDate?: Date;
  rules?: IRules;
  commentList?: IComment[];
  expenseList?: IExpense[];
  _rev?: any;
  totalHours?: number;


  constructor(formValue: RawFormValue) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.description = formValue.description;
    this.dueStartDate = formValue.dueStartDate;
    this.dueDate = formValue.dueDate;
    this.company = formValue.company;
    this.owner = formValue.owner;
    this.companyClient = formValue.companyClient;
    this.clientName = formValue.clientName;
    this.usersInvolved = formValue.usersInvolved;
    this.status = formValue.status;
    this.classification = formValue.classification;
    this.priority = formValue.priority;
    this.justification = formValue.justification;
    this.premise = formValue.premise;
    this.restrictions = formValue.restrictions;
    this.acceptanceCriteria = formValue.acceptanceCriteria;
    this.risks = formValue.risks;
    this.estimatedRevenue = formValue.estimatedRevenue;
    this.realRevenue = formValue.realRevenue;
    this.estimatedSpend = formValue.estimatedSpend;
    this.realSpend = formValue.realSpend;
    this.estimatedEffort = formValue.estimatedEffort;
    this.workspace = formValue.workspace;
    this.createdBy = formValue.createdBy;
    this.creationDate = formValue.creationDate
    this.isRegisteredClient = formValue.isRegisteredClient;
    this.stakeholders = formValue.stakeholders;
  }

}

export interface RawFormValue {
  id?: string;
  name: string;
  description: string;
  dueStartDate: Date;
  dueDate: Date;
  owner: IUserMini;
  requestedBy: string;
  company: ICompany;
  companyClient: ICompany;
  clientName: string;
  usersInvolved: IUserMini[];
  status: IProjectStatus;
  classification?: IClassification;
  priority?: IPriority;
  justification?: string;
  premise?: string;
  restrictions?: string;
  acceptanceCriteria?: string;
  risks?: string;
  estimatedRevenue?: number;
  realRevenue?: number;
  estimatedSpend?: number;
  realSpend?: number;
  estimatedEffort?: number;
  workspace?: IWorkspace;
  createdBy?: IUserMini,
  creationDate?: Date,
  isRegisteredClient: boolean;
  stakeholders?: IContact[];

}
