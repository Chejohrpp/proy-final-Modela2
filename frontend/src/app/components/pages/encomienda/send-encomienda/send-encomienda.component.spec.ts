import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEncomiendaComponent } from './send-encomienda.component';

describe('SendEncomiendaComponent', () => {
  let component: SendEncomiendaComponent;
  let fixture: ComponentFixture<SendEncomiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendEncomiendaComponent]
    });
    fixture = TestBed.createComponent(SendEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
