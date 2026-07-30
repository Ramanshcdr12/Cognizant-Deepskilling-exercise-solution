import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    // Explaining tap preference:
    /*
      WHY tap IS PREFERRED OVER map FOR SIDE EFFECTS:
      - The `tap` operator is designed specifically for side effects (such as logging, 
        analytics, or debugging) that do not modify the stream's values.
      - The `map` operator is strictly intended for data transformation. Placing side-effect 
        logic in `map` can lead to unintended bugs and violates functional programming purity.
    */
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Retry failed requests up to 2 times before throwing error
      retry(2),
      // Tap for side effect logging
      tap((courses) => console.log('Courses loaded:', courses.length)),
      // Map to filter out invalid courses (credits must be greater than 0)
      map((courses) => courses.filter((c) => c.credits > 0)),
      // Error handling catch block
      catchError((err) => {
        console.error('HTTP Error in CourseService:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error(`HTTP Error loading course ID ${id}:`, err);
        return throwError(() => new Error(`Failed to load course details for ID ${id}.`));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError((err) => {
        console.error('HTTP Error creating course:', err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError((err) => {
        console.error(`HTTP Error updating course ID ${course.id}:`, err);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error(`HTTP Error deleting course ID ${id}:`, err);
        return throwError(() => new Error('Failed to delete course.'));
      })
    );
  }
}
