import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NotificationComponent } from '../../components/notification/notification';
import { Course } from '../../models/course.model';
import { unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe, NotificationComponent],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile implements OnInit {
  student = {
    name: 'Ramansh',
    email: 'ramansh@college.edu',
    id: 'S202642',
    gpa: '3.8',
    major: '.NET Full Stack Engineering'
  };

  // Expose enrolled courses Observable from NgRx Store (using cross-slice selector)
  enrolledCourses$!: Observable<Course[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Select enrolled courses using the cross-slice selector
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  unenroll(courseId: number): void {
    // Dispatch unenroll action to NgRx Store
    this.store.dispatch(unenrollFromCourse({ courseId }));
  }
}
