import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardRequestPageComponent } from './credit-card-request-page.component';

describe('CreditCardRequestPageComponent', () => {
  let component: CreditCardRequestPageComponent;
  let fixture: ComponentFixture<CreditCardRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
