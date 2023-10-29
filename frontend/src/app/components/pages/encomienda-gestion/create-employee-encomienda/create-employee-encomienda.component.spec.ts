import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeEncomiendaComponent } from './create-employee-encomienda.component';

describe('CreateEmployeeEncomiendaComponent', () => {
  let component: CreateEmployeeEncomiendaComponent;
  let fixture: ComponentFixture<CreateEmployeeEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeeEncomiendaComponent]
    });
    fixture = TestBed.createComponent(CreateEmployeeEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
