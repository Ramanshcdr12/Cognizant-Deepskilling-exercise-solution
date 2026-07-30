import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgStyle, NgClass, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, UpperCasePipe],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {
  courseId!: number;
  course: Course | undefined;
  enrolled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.courseId = Number(idParam);
      
      // Fetch course details via HTTP
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: (err) => {
          console.error('Error fetching course detail:', err);
        }
      });

      // Subscribe to enrolled IDs from NgRx Store
      this.store.select(selectEnrolledIds).subscribe((ids) => {
        this.enrolled = ids.includes(this.courseId);
      });
    }
  }

  onEnrollToggle(): void {
    if (this.course) {
      if (this.enrolled) {
        this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
      } else {
        this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
