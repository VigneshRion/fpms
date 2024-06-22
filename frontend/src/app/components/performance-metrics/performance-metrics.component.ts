import { Component, OnInit } from '@angular/core';
import { MockApiService } from '../../services/mock-api.service';

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss'],
})
export class PerformanceMetricsComponent implements OnInit {
  performanceMetricsData!: any[];
  chartOptions: any;

  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.mockApiService.getPerformanceMetricsData().subscribe((data) => {
      this.performanceMetricsData = data;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May']; // Months or time periods
    const series = this.performanceMetricsData.map((asset) => ({
      name: asset.assetType,
      data: asset.data,
    }));

    this.chartOptions = {
      series: series,
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: 'Performance (units)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' units';
          },
        },
      },
    };
  }
}
