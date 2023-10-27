import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomiendaComponent } from './encomienda.component';

describe('EncomiendaComponent', () => {
  let component: EncomiendaComponent;
  let fixture: ComponentFixture<EncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncomiendaComponent]
    });
    fixture = TestBed.createComponent(EncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
