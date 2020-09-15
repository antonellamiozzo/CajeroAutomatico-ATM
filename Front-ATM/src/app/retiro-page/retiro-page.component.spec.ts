import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetiroPageComponent } from './retiro-page.component';

describe('RetiroPageComponent', () => {
  let component: RetiroPageComponent;
  let fixture: ComponentFixture<RetiroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetiroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetiroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
