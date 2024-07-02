import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendencesComponent } from './student-attendences.component';

describe('StudentAttendencesComponent', () => {
  let component: StudentAttendencesComponent;
  let fixture: ComponentFixture<StudentAttendencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAttendencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentAttendencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
