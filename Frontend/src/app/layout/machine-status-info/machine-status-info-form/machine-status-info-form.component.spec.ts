import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStatusInfoFormComponent } from './machine-status-info-form.component';

describe('MachineStatusInfoFormComponent', () => {
  let component: MachineStatusInfoFormComponent;
  let fixture: ComponentFixture<MachineStatusInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineStatusInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineStatusInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
