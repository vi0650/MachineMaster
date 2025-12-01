import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStatusInfoComponent } from './machine-status-info.component';

describe('MachineStatusInfoComponent', () => {
  let component: MachineStatusInfoComponent;
  let fixture: ComponentFixture<MachineStatusInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineStatusInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineStatusInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
