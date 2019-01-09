import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLogComponent } from './expenses-log.component';

describe('ExpensesLogComponent', () => {
  let component: ExpensesLogComponent;
  let fixture: ComponentFixture<ExpensesLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
