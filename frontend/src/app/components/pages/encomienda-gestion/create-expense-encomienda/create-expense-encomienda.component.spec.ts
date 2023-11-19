import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseEncomiendaComponent } from './create-expense-encomienda.component';

describe('CreateExpenseEncomiendaComponent', () => {
  let component: CreateExpenseEncomiendaComponent;
  let fixture: ComponentFixture<CreateExpenseEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExpenseEncomiendaComponent]
    });
    fixture = TestBed.createComponent(CreateExpenseEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
