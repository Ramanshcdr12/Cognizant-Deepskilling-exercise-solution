import { Injectable } from '@angular/core';
import { CourseService } from './course';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    // Retrieve courses from CourseService and filter to only enrolled IDs
    return this.courseService.getCourses().pipe(
      map((courses) => courses.filter((c) => this.enrolledCourseIds.includes(c.id)))
    );
  }
}
