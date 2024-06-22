import { Component } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { InvestmentService } from '../../services/investment.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};

interface AssetAllocation {
  assetType: string;
  totalValue: number;
}

@Component({
  selector: 'app-asset-allocation',
  templateUrl: './asset-allocation.component.html',
  styleUrl: './asset-allocation.component.scss',
})
export class AssetAllocationComponent {
  public chartSeries: ApexNonAxisChartSeries = [];
  public chartOptions: any = {};

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.fetchAssetAllocations();
  }

  fetchAssetAllocations(): void {
    this.investmentService
      .getAssetAllocations()
      .subscribe((data: AssetAllocation[]) => {
        this.chartSeries = data.map((item) => item?.totalValue);
        this.chartOptions = {
          chart: {
            type: 'pie',
            width: 400,
          },
          labels: data.map((item) => item?.assetType),
          title: {
            text: 'Asset Allocation',
          },
        };
      });
  }
}
