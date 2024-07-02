import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerHomeComponent } from './lecturer-home.component';

describe('LecturerHomeComponent', () => {
  let component: LecturerHomeComponent;
  let fixture: ComponentFixture<LecturerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LecturerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
