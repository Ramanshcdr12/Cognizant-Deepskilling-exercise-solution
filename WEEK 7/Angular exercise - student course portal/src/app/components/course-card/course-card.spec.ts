import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseCard } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;
  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed' as const
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    component.course = mockCourse;
    fixture.detectChanges();
  });

  // Test 1: Component Creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: @Input rendering
  it('should display the course name in h3', () => {
    component.course = { 
      id: 1, 
      name: 'Data Structures', 
      code: 'CS101', 
      credits: 4, 
      gradeStatus: 'passed' as const 
    };
    fixture.detectChanges();
    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Test 3: @Output event emission
  it('should emit enrollRequested event when enroll button is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    
    spyOn(component.enrollRequested, 'emit');
    
    // Query the Enroll button (which is btn-primary in card-footer)
    const button = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Test 4: ngOnChanges console log tracing
  it('should log changes in ngOnChanges', () => {
    spyOn(console, 'log');
    
    const changesObj = {
      course: new SimpleChange(null, mockCourse, true)
    };
    
    component.ngOnChanges(changesObj);
    expect(console.log).toHaveBeenCalled();
  });
});
