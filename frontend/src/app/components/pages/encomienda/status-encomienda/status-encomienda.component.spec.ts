import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEncomiendaComponent } from './status-encomienda.component';

describe('StatusEncomiendaComponent', () => {
  let component: StatusEncomiendaComponent;
  let fixture: ComponentFixture<StatusEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusEncomiendaComponent]
    });
    fixture = TestBed.createComponent(StatusEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
