import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHonorariumEncomiendaComponent } from './create-honorarium-encomienda.component';

describe('CreateHonorariumEncomiendaComponent', () => {
  let component: CreateHonorariumEncomiendaComponent;
  let fixture: ComponentFixture<CreateHonorariumEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHonorariumEncomiendaComponent]
    });
    fixture = TestBed.createComponent(CreateHonorariumEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
