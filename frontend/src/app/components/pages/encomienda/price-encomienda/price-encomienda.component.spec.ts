import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEncomiendaComponent } from './price-encomienda.component';

describe('PriceEncomiendaComponent', () => {
  let component: PriceEncomiendaComponent;
  let fixture: ComponentFixture<PriceEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceEncomiendaComponent]
    });
    fixture = TestBed.createComponent(PriceEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
