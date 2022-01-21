import { Component, Input, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/@core/services/analytics.service';

@Component({
  selector: 'ngx-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
})
export class AnalyticsDashboardComponent implements OnInit {
  @Input() profit: number;
  @Input() investment: any;

  constructor(
    private analyticsService: AnalyticsService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.getInvestment()
    // this.getProfit()
  }

  getInvestment() {
    this.analyticsService.getInvestment().subscribe(
      (res: any) => {
        console.log(res)
        this.investment = res
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  // getProfit() {
  //   this.analyticsService.getProfit().subscribe(
  //     (res: any) => {
  //       console.log(res)
  //       this.profit = res
  //     },
  //     (err: any) => {
  //       console.log(err)
  //     }
  //   )
  // }

  moneyFilter(value: number) {
    return value.toFixed(2).replace(".", ",");
  }

}
