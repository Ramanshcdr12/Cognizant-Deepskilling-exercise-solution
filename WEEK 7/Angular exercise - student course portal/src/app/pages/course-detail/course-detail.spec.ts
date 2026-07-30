import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CourseDetail } from './course-detail';
import { CourseService } from '../../services/course';

describe('CourseDetailComponent', () => {
  let component: CourseDetail;
  let fixture: ComponentFixture<CourseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetail, HttpClientTestingModule],
      providers: [
        CourseService,
        provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1' // mock ID parameter
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
