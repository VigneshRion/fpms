import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-form',
  templateUrl: './investment-form.component.html',
  styleUrls: ['./investment-form.component.scss'],
})
export class InvestmentFormComponent implements OnInit {
  investmentForm!: FormGroup;
  investments: any[] = [];
  columnDefs: ColDef[];

  constructor(
    private fb: FormBuilder,
    private investmentService: InvestmentService,
    private router: Router
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
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      purchasePrice: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
    });

    this.fetchInvestments();
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {
      this.investmentService.addInvestment(this.investmentForm.value).subscribe(
        (response) => {
          console.log('Investment added:', response);
          this.fetchInvestments();
          this.investmentForm.reset();
        },
        (error) => {
          console.error('Error adding investment:', error);
        }
      );
    }
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

  goBack(): void {
    this.investmentService.isInvestmentForm = false;
    this.router.navigate(['/dashboard']);
  }
}
