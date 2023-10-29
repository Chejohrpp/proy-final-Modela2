import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomiendaGestionComponent } from './encomienda-gestion.component';

describe('EncomiendaGestionComponent', () => {
  let component: EncomiendaGestionComponent;
  let fixture: ComponentFixture<EncomiendaGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncomiendaGestionComponent]
    });
    fixture = TestBed.createComponent(EncomiendaGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
