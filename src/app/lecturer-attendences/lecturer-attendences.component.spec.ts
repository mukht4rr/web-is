import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerAttendencesComponent } from './lecturer-attendences.component';

describe('LecturerAttendencesComponent', () => {
  let component: LecturerAttendencesComponent;
  let fixture: ComponentFixture<LecturerAttendencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerAttendencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerAttendencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
