import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AgGridModule } from 'ag-grid-angular';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AssetAllocationComponent } from './asset-allocation/asset-allocation.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';
import { PerformanceMetricsComponent } from './performance-metrics/performance-metrics.component';
import { SummaryComponent } from './summary/summary.component';
import { InvestmentFormComponent } from './investment-form/investment-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AssetAllocationComponent,
    MarketTrendsComponent,
    PerformanceMetricsComponent,
    SummaryComponent,
    InvestmentFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    AgGridModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
