import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalsEncomiendaComponent } from './monthly-goals-encomienda.component';

describe('MonthlyGoalsEncomiendaComponent', () => {
  let component: MonthlyGoalsEncomiendaComponent;
  let fixture: ComponentFixture<MonthlyGoalsEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyGoalsEncomiendaComponent]
    });
    fixture = TestBed.createComponent(MonthlyGoalsEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
