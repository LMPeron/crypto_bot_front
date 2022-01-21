export interface ICoin {

      id?: string;
      symbol: string;
      active: boolean;
      status: string;
}

export class CoinDTO implements ICoin {

      id?: string;
      symbol: string;
      active: boolean;
      status: string;

      constructor(formValue: ICoin) {
            this.id = formValue.id;
            this.symbol = formValue.symbol;
            this.active = formValue.active;
            this.status = formValue.status;
      }
}

export interface RawFormValue {

      id?: string;
      symbol: string;
      active: boolean;
      status: string;
}