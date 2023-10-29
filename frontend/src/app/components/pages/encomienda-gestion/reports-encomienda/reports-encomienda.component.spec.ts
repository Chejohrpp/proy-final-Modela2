import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsEncomiendaComponent } from './reports-encomienda.component';

describe('ReportsEncomiendaComponent', () => {
  let component: ReportsEncomiendaComponent;
  let fixture: ComponentFixture<ReportsEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportsEncomiendaComponent]
    });
    fixture = TestBed.createComponent(ReportsEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
