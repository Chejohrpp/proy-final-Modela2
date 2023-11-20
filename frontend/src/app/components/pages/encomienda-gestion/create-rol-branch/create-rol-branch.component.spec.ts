import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolBranchComponent } from './create-rol-branch.component';

describe('CreateRolBranchComponent', () => {
  let component: CreateRolBranchComponent;
  let fixture: ComponentFixture<CreateRolBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRolBranchComponent]
    });
    fixture = TestBed.createComponent(CreateRolBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
