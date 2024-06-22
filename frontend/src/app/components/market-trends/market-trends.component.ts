import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api.service';

interface MarketTrendData {
  assetType: string;
  data: { date: string; price: number }[];
}

@Component({
  selector: 'app-market-trends',
  templateUrl: './market-trends.component.html',
  styleUrls: ['./market-trends.component.scss'],
})
export class MarketTrendsComponent implements OnInit {
  marketTrendsData!: MarketTrendData[];
  chartOptions: any;

  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.mockApiService.getMarketTrendsData().subscribe((data) => {
      this.marketTrendsData = data;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    const seriesData = this.marketTrendsData.map((asset) => ({
      name: asset.assetType,
      data: asset.data.map((dataPoint) => ({
        x: new Date(dataPoint.date).getTime(),
        y: dataPoint.price,
      })),
    }));

    this.chartOptions = {
      series: seriesData,
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2, 2],
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Price ($)',
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val: any) => '$' + val,
        },
      },
    };
  }
}
