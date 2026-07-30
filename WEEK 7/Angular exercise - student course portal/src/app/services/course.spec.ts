import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const },
    { id: 2, name: 'Database Systems', code: 'CS202', credits: 3, gradeStatus: 'pending' as const }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test 1: getCourses() success handling
  it('should retrieve courses from the API via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  // Test 2: getCourses() error handling with retry verification
  it('should handle error responses from the API gracefully after retries', () => {
    let errorResponse: any;
    
    service.getCourses().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        errorResponse = error;
      }
    });

    // 1st request fails
    const req1 = httpMock.expectOne('http://localhost:3000/courses');
    req1.flush('Server Error', { status: 500, statusText: 'Server Error' });

    // 2nd request (1st retry) fails
    const req2 = httpMock.expectOne('http://localhost:3000/courses');
    req2.flush('Server Error', { status: 500, statusText: 'Server Error' });

    // 3rd request (2nd retry) fails, propagating error
    const req3 = httpMock.expectOne('http://localhost:3000/courses');
    req3.flush('Server Error', { status: 500, statusText: 'Server Error' });

    expect(errorResponse).toBeTruthy();
    expect(errorResponse.message).toContain('Failed to load courses. Please try again.');
  });
});
