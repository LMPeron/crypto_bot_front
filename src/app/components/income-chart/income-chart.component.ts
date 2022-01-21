import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any;
  fill: ApexFill;
  tooltip: ApexTooltip;
  colors: any;
  theme: ApexTheme;
  toolbar: any,
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'ngx-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.scss'],
})
export class IncomeChartComponent implements OnInit {
  @Input() data: any;
  options: Partial<ChartOptions>;

  chartHeight: number = 300;
  barWidth: string = '100%';

  constructor(
  ) { }


  // FAZER FUNCAO PARA VERIFICAR TAMANHO DA TELA COMPARANDO COM A ANTERIOR PARA NAO GASTAR MEMORIA TUDO NOSSO

  ngOnInit(): void {
    this.startOptions()
    this.defineOptionsValue()
    this.defineSeriesValues()
  }

  defineSeriesValues() {
    this.data.forEach((d: any) => {
      this.options.series[0].data.push(d)
    })
  }

  defineOptionsValue() {
    if (screen.width < 768) {
      this.options.chart.height = 200
      this.options.plotOptions.bar.columnWidth = '150%'
    } else {
      this.options.plotOptions.bar.columnWidth = '100%'
    }


  }

  startOptions() {
    this.options = {
      chart: {
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        },
        brush: {
          enabled: false
        },
        height: this.chartHeight,
        type: "line",
        background: 'transparent'
      },

      theme: {
        mode: 'dark'
      },
      series: [
        {
          name: "Progressão diária",
          type: 'column',
          data: []
        },
      ],
      plotOptions: {
        bar: {
          columnWidth: this.barWidth,
        }
      },
      labels: [],

      colors: [
        ({ value, seriesIndex, w }) => {
          if (value >= 0) {
            return '#6AFC60'
          } else {
            return '#FA3C3C'
          }
        }
      ],

      yaxis: {
        labels: {
          formatter: (value) => {
            return value + "%";
          }
        },

      },

      grid: {
        show: true,
        borderColor: '#90A4AE30',
        column: {
          opacity: 0.1
        },
        row: {
          opacity: 0.1
        },
      },

      xaxis: {
        axisBorder: {
          show: false
        },
        categories: [],
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
    }
  }

}



