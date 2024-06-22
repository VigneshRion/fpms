import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AppState } from '../../../store/reducers';
import { logout } from '../../../store/actions/auth.action';
import { AuthService } from '../../../services/auth.service';
import { InvestmentService } from '../../../services/investment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  investments: any[] = [];
  columnDefs: ColDef[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    public investmentService: InvestmentService
  ) {
    this.columnDefs = [
      {
        field: 'assetType',
        headerName: 'Asset Type',
        sortable: true,
        filter: true,
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        sortable: true,
        filter: true,
      },
      {
        field: 'purchasePrice',
        headerName: 'Purchase Price',
        cellRenderer: (data: any) => {
          return `$${data?.value?.toFixed(2)}`;
        },
        sortable: true,
        filter: true,
      },
      {
        field: 'date',
        headerName: 'Date',
        cellRenderer: (data: any) => {
          return data?.value ? new Date(data?.value).toLocaleDateString() : '';
        },
        sortable: true,
        filter: true,
      },
    ];
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(error);
      }
    );

    this.fetchInvestments();
  }

  fetchInvestments(): void {
    this.investmentService.getInvestments().subscribe(
      (investments) => {
        this.investments = investments;
      },
      (error) => {
        console.error('Error fetching investments:', error);
      }
    );
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  investForm(): void {
    this.investmentService.isInvestmentForm = true;
  }
}
