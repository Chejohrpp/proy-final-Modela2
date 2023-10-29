import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusEncomiendaComponent } from './surplus-encomienda.component';

describe('SurplusEncomiendaComponent', () => {
  let component: SurplusEncomiendaComponent;
  let fixture: ComponentFixture<SurplusEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurplusEncomiendaComponent]
    });
    fixture = TestBed.createComponent(SurplusEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
