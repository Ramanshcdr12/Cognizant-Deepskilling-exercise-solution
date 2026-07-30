import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CourseList } from './course-list';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

describe('CourseList Component (NgRx Connected)', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;
  
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const },
    { id: 2, name: 'Database Systems', code: 'CS202', credits: 3, gradeStatus: 'pending' as const }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList, CourseCard, HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            course: {
              courses: mockCourses,
              loading: false,
              error: null
            },
            enrollment: {
              enrolledCourseIds: []
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Rendered cards match initial state
  it('should render course cards corresponding to the mock state', () => {
    fixture.detectChanges();
    const cardElements = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cardElements.length).toBe(2);
  });

  // Test 2: Loading indicator visibility on loading state
  it('should show loading indicator when loading is true', () => {
    // Simulate loading state in NgRx store
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null
      },
      enrollment: {
        enrolledCourseIds: []
      }
    });

    fixture.detectChanges();

    // Query for loader element
    const loaderElement = fixture.debugElement.query(By.css('.loading-state'));
    expect(loaderElement).toBeTruthy();
    expect(loaderElement.nativeElement.textContent).toContain('Loading courses...');
  });
});
