import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonorariumTableEncomiendaComponent } from './honorarium-table-encomienda.component';

describe('HonorariumTableEncomiendaComponent', () => {
  let component: HonorariumTableEncomiendaComponent;
  let fixture: ComponentFixture<HonorariumTableEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HonorariumTableEncomiendaComponent]
    });
    fixture = TestBed.createComponent(HonorariumTableEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
