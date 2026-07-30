import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesCount = 0;
  enrolledCount = 0;

  // Explaining the difference between bindings:
  /*
    DIFFERENCE BETWEEN BINDINGS:
    - [property] is One-Way Data Binding (Component -> DOM). It binds a component class property 
      to a DOM element attribute. Changes in the component update the DOM, but user interactions 
      with the DOM do not update the component property.
    - [(ngModel)] is Two-Way Data Binding (DOM <=> Component). It synchronizes the DOM element state 
      (like input value) and the component property. Any changes made by the user in the input field 
      immediately update the component property, and changes in the component property update the input.
  */

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    
    // Subscribe to CourseService HTTP Observable to get dynamic count
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesCount = courses.length;
      },
      error: (err) => {
        console.error('Error fetching courses count for home page:', err);
      }
    });

    // Subscribe to EnrollmentService HTTP Observable to get dynamic enrolled count
    this.enrollmentService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCount = courses.length;
      },
      error: (err) => {
        console.error('Error fetching enrolled count for home page:', err);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
