import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusGenericComponent } from './surplus-generic.component';

describe('SurplusGenericComponent', () => {
  let component: SurplusGenericComponent;
  let fixture: ComponentFixture<SurplusGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurplusGenericComponent]
    });
    fixture = TestBed.createComponent(SurplusGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
