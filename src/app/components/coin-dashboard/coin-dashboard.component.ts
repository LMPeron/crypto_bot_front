import { WalletService } from './../../@core/services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/@core/services/coin.service';
import { UserService } from 'src/app/@core/services/user.service';
import { AnalyticsService } from 'src/app/@core/services/analytics.service';
import * as moment from 'moment'

@Component({
  selector: 'ngx-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.scss'],
})
export class CoinDashboardComponent implements OnInit {

  coinList: any;
  setupList: any;
  selectedCoin: number = -1;

  playing: boolean = false

  cash: number;
  rsi_buy: number;
  rsi_sell: number;
  stop_limit: number;
  log: string;

  BTCPrice: number = 0;

  loading = true

  lastTotalBalance: number;
  lastDayIncome: number;
  dailyHistory: any;

  tradeList: any;

  profit: number = 0;
  profitByDay = [];
  avgPerformance: number = 0;

  constructor(
    private coinService: CoinService,
    private walletService: WalletService,
    private userService: UserService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // this.getAllCoins()
    // this.getBTCPrice()
    this.getWalletInfo()


    // this.getAllUsers()
    // this.createUser()
    // this.updateUser()

    this.getTrades()
   
  }

  getTrades() {
    this.analyticsService.getTrades().subscribe(
      (res: any) => {
        this.tradeList = res
        this.setProfit()
        this.setProfitByDay()
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  setProfit() {
    this.tradeList.forEach((e): void => {
      this.profit += e.profit
    });
  }

  setProfitByDay() {
    let now = new Date()
    var d = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    Array.from({ length: d.getDate() }, (x, i) => {
      let day = this.tradeList.filter((e) => {
        return e.date == `${moment(now).format("YYYY-MM")}-${(i + 1) < 10 ? '0' + (i + 1) : i + 1}`
      })
      this.profitByDay.push(day)
    });

    this.profitByDay = this.profitByDay.map((e) => {
      let sum = 0
      for (const t of e) {
        sum += t.profit
      }
      return sum
    })
    
    this.loading = false
  }

  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe(
  //     (res) => {
  //       console.log(res)
  //     },
  //     (err) => {
  //       console.log(err)
  //     }
  //   )
  // }

  createUser() {
    let userTest = {
      name: "teste",
      api_key: "teste",
      secret: "teste",
    }

    this.userService.createUser(userTest).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }


  updateUser() {
    let userTest = {
      id: 3,
      name: "teste",
      api_key: "teste",
      secret: "teste",
      active: false
    }

    this.userService.updateUser(userTest).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getBTCPrice() {
    this.coinService.getBTCPrice().subscribe(
      (res: any) => {
        this.BTCPrice = res
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getWalletInfo() {
    this.walletService.getWalletHistory().subscribe(
      (res: any) => {
        this.lastTotalBalance = res[res.length - 1].data.totalAssetOfBtc * this.BTCPrice
        this.lastDayIncome = this.lastTotalBalance - (res[res.length - 2].data.totalAssetOfBtc * this.BTCPrice)

        this.dailyHistory = res
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getAllCoins() {
    this.coinService.getAllCoin().subscribe(
      (res) => {
        this.coinList = res
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  changeCoinActive(coin: any) {
    this.coinService.setCoinActive(coin).subscribe(
      (res) => {
        console.log(res)
        this.getAllCoins()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  changeSelectedCoin(id: number) {
    this.selectedCoin = this.selectedCoin !== id ? id : -1
  }

  changeSelectedSetup(setup: any) {
    this.cash = setup.cash
    this.rsi_buy = setup.rsi_buy
    this.rsi_sell = setup.rsi_sell
    this.stop_limit = setup.stop_limit
    this.log = setup.log
  }

  addSetup(coinId: number) {
    this.coinService.addSetup(coinId).subscribe(
      (res) => {
        console.log(res)
        this.getAllCoins()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  deleteSetup(setupId: number) {
    this.coinService.deleteSetup(setupId).subscribe(
      (res) => {
        console.log(res)
        this.getAllCoins()
      },
      (err) => {
        console.log(err)
      }

    )
  }

  saveSetup(setupId: number) {
    let setup = {
      id: setupId,
      cash: this.cash,
      rsi_buy: this.rsi_buy,
      rsi_sell: this.rsi_sell,
      stop_limit: this.stop_limit,
      log: this.log
    }

    this.coinService.updateSetup(setup).subscribe(
      (res) => {
        console.log(res)
        this.getAllCoins()
      },
      (err) => {
        console.log(err)
      }

    )
  }

  start() {
    this.playing = true

    this.coinService.start().subscribe(
      (res) => {
        console.log("Iniciando.", res)
      },
      (err) => {
        console.log(err)
      }
    )

  }

  stop() {
    this.playing = false

    this.coinService.stop().subscribe(
      (res) => {
        console.log("parando", res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
