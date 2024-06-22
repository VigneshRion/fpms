import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  constructor() {}

  // Mock data for performance metrics
  getPerformanceMetricsData(): Observable<any[]> {
    const performanceMetricsData = [
      { assetType: 'Asset A', data: [100, 120, 90, 140, 110] },
      { assetType: 'Asset B', data: [80, 70, 110, 90, 100] },
      { assetType: 'Asset C', data: [120, 130, 110, 140, 130] },
    ];
    return of(performanceMetricsData);
  }

  // Mock data for market trends
  getMarketTrendsData(): Observable<any[]> {
    const marketTrendsData = [
      {
        assetType: 'Asset A',
        data: [
          { date: '2024-06-01', price: 100 },
          { date: '2024-06-02', price: 120 },
        ],
      },
      {
        assetType: 'Asset B',
        data: [
          { date: '2024-06-01', price: 80 },
          { date: '2024-06-02', price: 90 },
        ],
      },
      {
        assetType: 'Asset C',
        data: [
          { date: '2024-06-01', price: 120 },
          { date: '2024-06-02', price: 130 },
        ],
      },
    ];
    return of(marketTrendsData);
  }
}
