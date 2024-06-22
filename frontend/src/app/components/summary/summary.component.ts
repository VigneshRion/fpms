import { Component } from '@angular/core';
import { InvestmentService } from '../../services/investment.service';

interface InvestmentSummary {
  todayTotal: number;
  last7DaysTotal: number;
  last30DaysTotal: number;
  totalTillNow: number;
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  investmentSummary: InvestmentSummary | undefined;

  constructor(private investmentService: InvestmentService) {}

  ngOnInit(): void {
    this.fetchInvestmentSummary();
  }

  fetchInvestmentSummary(): void {
    this.investmentService.getInvestmentSummary().subscribe(
      (investments) => {
        this.investmentSummary = investments;
      },
      (error) => {
        console.error('Error fetching investments:', error);
      }
    );
  }
}
