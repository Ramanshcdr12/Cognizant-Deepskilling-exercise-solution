import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule, CourseCard, CourseSummaryWidget],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  isLoading = true;
  selectedCourseId: number | null = null;
  courses: Course[] = [];
  searchTerm = '';
  errorMessage = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read back query parameter "search" on component initialization
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (searchParam) {
      this.searchTerm = searchParam;
    }

    // Dispatch the NgRx Action to trigger loading courses from HTTP effects
    this.store.dispatch(loadCourses());

    // Subscribe to loading state selector
    this.store.select(selectCoursesLoading).subscribe((loading) => {
      this.isLoading = loading;
    });

    // Subscribe to error state selector
    this.store.select(selectCoursesError).subscribe((error) => {
      if (error) {
        this.errorMessage = error;
      }
    });

    // Subscribe to courses selector from NgRx Store
    this.store.select(selectAllCourses).subscribe((courses) => {
      this.courses = courses;
    });
  }

  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    const term = this.searchTerm.toLowerCase();
    return this.courses.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.code.toLowerCase().includes(term)
    );
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
  }

  onCardClick(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}
