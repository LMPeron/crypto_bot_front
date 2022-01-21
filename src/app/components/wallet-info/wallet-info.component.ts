import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.scss'],
})
export class WalletInfoComponent {
  @Input() BTCPrice: number;
  @Input() lastTotalBalance: number;
  @Input() lastDayIncome: number;
  @Input() dailyHistory: any;

  constructor(
  ) { }

  moneyFilter(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

}
