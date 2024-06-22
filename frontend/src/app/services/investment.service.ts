import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../models/investment.model';

interface InvestmentSummary {
  todayTotal: number;
  last7DaysTotal: number;
  last30DaysTotal: number;
  totalTillNow: number;
}

interface AssetAllocation {
  assetType: string;
  totalValue: number;
}

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  isInvestmentForm: Boolean = false;
  private apiUrl = 'http://localhost:5001/api/user';

  constructor(private http: HttpClient) {}

  addInvestment(investmentData: Investment): Observable<Investment> {
    return this.http.post<Investment>(
      `${this.apiUrl}/investments/add`,
      investmentData
    );
  }

  getInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.apiUrl}/investments/list`);
  }

  getInvestmentSummary(): Observable<InvestmentSummary> {
    return this.http.get<InvestmentSummary>(
      `${this.apiUrl}/investments/summary`
    );
  }

  getAssetAllocations(): Observable<AssetAllocation[]> {
    return this.http.get<AssetAllocation[]>(
      `${this.apiUrl}/investments/allocations`
    );
  }

  getMetrics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/investments/metrics`);
  }

  getMarketTrend(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/investments/trend`);
  }
}
