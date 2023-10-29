import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialExpensesEncomiendaComponent } from './special-expenses-encomienda.component';

describe('SpecialExpensesEncomiendaComponent', () => {
  let component: SpecialExpensesEncomiendaComponent;
  let fixture: ComponentFixture<SpecialExpensesEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialExpensesEncomiendaComponent]
    });
    fixture = TestBed.createComponent(SpecialExpensesEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
