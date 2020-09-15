import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinRequestPageComponent } from './pin-request-page.component';

describe('PinRequestPageComponent', () => {
  let component: PinRequestPageComponent;
  let fixture: ComponentFixture<PinRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
