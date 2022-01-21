export interface IProduct {
  active: boolean;
  contractedHours: number;

  id: string;
  isType: boolean;
  name: string;
  parentProductId: string;
  parentProduct?: string;
  companies?: string[];
  product?: string;
}

export class ProductDTO {
  id: string;
  name: string;
  active: boolean;
  parentProduct: string;
  hasContractedHours = false;
  companies?: string[];

  constructor(formValue: IProduct) {
    this.active = formValue.active;
    this.id = formValue.id;
    this.name = formValue.name;
    this.companies = formValue.companies;

    this.parentProduct = formValue.product;
  }
}
