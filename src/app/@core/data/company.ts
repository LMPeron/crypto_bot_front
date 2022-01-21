import { ITaskType } from './taskType';

export interface ICompany {
  active: boolean;
  contractedHours: number;

  id: string;
  isUrgent: boolean;
  limitReopenTime: string;
  name: string;
  parentCompany: string;
  planId: string;
  relatedCompanies: string;
  relatedUserGroup: string;

  isExpanded?: boolean;
  branchList?: ICompany[];
  branchNames?: string;
  hideOpportunity?: boolean;
  hideMessage?: boolean;
}

export interface INewCompany {
  id: string;
  name: string;
  isBranch: boolean;
  parentCompany: ICompany;
  firstTaskType: string;
  taskTypeReopen: string;
  active: boolean;
  hasContractedHours: boolean;
  isUrgent: boolean;
  relatedCompanies: ICompany[];
  contractedHours: number;
  limitReopenTime: number;
  planId: string;
  hideOpportunity: boolean;
  hideMessage: boolean;
  listProduct: [];
}

export class NewCompanyDTO {
  id: string;
  name: string;
  isBranch: boolean;
  parentCompany: ICompany;
  firstTaskType: Partial<ITaskType> = {
    id: '',
  };
  taskTypeReopen: Partial<ITaskType> = {
    id: '',
  };
  active: boolean;
  hasContractedHours: boolean;
  isUrgent: boolean;
  relatedCompanies: ICompany[];
  contractedHours: number;
  limitReopenTime: number;
  planId: string;
  hideOpportunity: boolean;
  hideMessage: boolean;
  listProduct: [];
  constructor(formValue: INewCompany) {
    this.id = formValue.id;
    this.name = formValue.name;
    this.isBranch = formValue.isBranch;
    this.parentCompany = formValue.parentCompany;
    if (formValue.firstTaskType) {
      this.firstTaskType.id = formValue.firstTaskType;
    } else {
      this.firstTaskType = null;
    }
    if (formValue.taskTypeReopen) {
      this.taskTypeReopen.id = formValue.taskTypeReopen;
    } else {
      this.taskTypeReopen = null;
    }

    this.active = formValue.active;
    this.hasContractedHours = formValue.hasContractedHours;
    this.isUrgent = formValue.isUrgent;
    this.relatedCompanies = formValue.relatedCompanies;
    this.contractedHours = formValue.contractedHours;
    this.limitReopenTime = formValue.limitReopenTime;
    this.planId = formValue.planId;
    this.hideOpportunity = formValue.hideOpportunity;
    this.hideMessage = formValue.hideMessage;
    this.listProduct = formValue.listProduct;
  }
}
