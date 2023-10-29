import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchExpensesEncomiendaComponent } from './branch-expenses-encomienda.component';

describe('BranchExpensesEncomiendaComponent', () => {
  let component: BranchExpensesEncomiendaComponent;
  let fixture: ComponentFixture<BranchExpensesEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchExpensesEncomiendaComponent]
    });
    fixture = TestBed.createComponent(BranchExpensesEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
