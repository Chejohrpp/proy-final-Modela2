import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusGlobalComponent } from './surplus-global.component';

describe('SurplusGlobalComponent', () => {
  let component: SurplusGlobalComponent;
  let fixture: ComponentFixture<SurplusGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurplusGlobalComponent]
    });
    fixture = TestBed.createComponent(SurplusGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
