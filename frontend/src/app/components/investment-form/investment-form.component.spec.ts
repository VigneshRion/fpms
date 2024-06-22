import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { InvestmentService } from '../../services/investment.service';
import { of } from 'rxjs';

describe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let investmentService: InvestmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [InvestmentFormComponent],
      providers: [InvestmentService],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    investmentService = TestBed.inject(InvestmentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize investmentForm with default values', () => {
    fixture.detectChanges();
    expect(component.investmentForm).toBeDefined();
    expect(component.investmentForm.valid).toBeFalsy();
  });
});

describe('InvestmentFormComponent - Form Validation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [InvestmentFormComponent],
      providers: [InvestmentService],
    }).compileComponents();
  });

  it('should require assetType field', () => {
    const fixture = TestBed.createComponent(InvestmentFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const assetType = component.investmentForm.controls['assetType'];
    expect(assetType.valid).toBeFalsy();

    assetType.setValue('Stock');
    expect(assetType.valid).toBeTruthy();
  });

  it('should require quantity field to be greater than 0', () => {
    const fixture = TestBed.createComponent(InvestmentFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const quantity = component.investmentForm.controls['quantity'];
    expect(quantity.valid).toBeFalsy();

    quantity.setValue(0);
    expect(quantity.valid).toBeFalsy();

    quantity.setValue(10);
    expect(quantity.valid).toBeTruthy();
  });

  it('should require purchasePrice field to be 0 or more', () => {
    const fixture = TestBed.createComponent(InvestmentFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const purchasePrice = component.investmentForm.controls['purchasePrice'];
    expect(purchasePrice.valid).toBeFalsy();

    purchasePrice.setValue(-1);
    expect(purchasePrice.valid).toBeFalsy();

    purchasePrice.setValue(100);
    expect(purchasePrice.valid).toBeTruthy();
  });

  it('should require date field', () => {
    const fixture = TestBed.createComponent(InvestmentFormComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const date = component.investmentForm.controls['date'];
    expect(date.valid).toBeFalsy();

    date.setValue('2024-06-22');
    expect(date.valid).toBeTruthy();
  });
});

describe('InvestmentFormComponent - Form Submission', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let investmentService: InvestmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [InvestmentFormComponent],
      providers: [InvestmentService],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    investmentService = TestBed.inject(InvestmentService);

    spyOn(investmentService, 'addInvestment').and.returnValue(
      of<any>({
        user: '6675905154c28e1086224aff',
        assetType: 'BTC',
        quantity: 1,
        purchasePrice: 25000,
        date: '2024-06-22T00:00:00.000Z',
        _id: '667619e47ca1520a86ef1c0b',
        __v: 0,
      })
    );
  });

  it('should call addInvestment method on form submission', () => {
    fixture.detectChanges();
    component.investmentForm.setValue({
      assetType: 'Stock',
      quantity: 10,
      purchasePrice: 100,
      date: '2024-06-22',
    });

    const submitBtn = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitBtn.click();

    expect(investmentService.addInvestment).toHaveBeenCalled();
  });

  it('should reset form after successful submission', () => {
    fixture.detectChanges();
    component.investmentForm.setValue({
      assetType: 'Stock',
      quantity: 10,
      purchasePrice: 100,
      date: '2024-06-22',
    });

    const submitBtn = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    submitBtn.click();

    expect(component.investmentForm.value).toEqual({
      assetType: '',
      quantity: '',
      purchasePrice: '',
      date: '',
    });
  });
});

describe('InvestmentFormComponent - InvestmentService', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let investmentService: InvestmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [InvestmentFormComponent],
      providers: [InvestmentService],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    investmentService = TestBed.inject(InvestmentService);

    spyOn(investmentService, 'getInvestments').and.returnValue(of([]));
  });

  it('should fetch investments on component initialization', () => {
    fixture.detectChanges();
    expect(investmentService.getInvestments).toHaveBeenCalled();
  });
});
