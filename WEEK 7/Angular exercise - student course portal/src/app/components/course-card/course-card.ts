import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [NgClass, NgStyle, UpperCasePipe, Highlight, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnInit, OnChanges {
  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: 'passed' | 'failed' | 'pending';
    enrolled?: boolean;
  };
  @Input() appHighlight = 'rgba(59, 130, 246, 0.1)';
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  enrolled = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Select and subscribe to enrolledIds$ to track enrolled state reactively
    this.store.select(selectEnrolledIds).subscribe((ids) => {
      this.enrolled = ids.includes(this.course?.id);
    });
  }

  // Getter properties keep the HTML templates clean and maintainable
  get cardClasses() {
    return {
      'card--enrolled': this.enrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      const prev = changes['course'].previousValue;
      const current = changes['course'].currentValue;
      console.log(`CourseCard [ID ${this.course?.id}] changed:`, {
        previous: prev,
        current: current
      });
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollToggle(): void {
    if (this.enrolled) {
      // Dispatch unenroll action to NgRx store
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      // Dispatch enroll action to NgRx store
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
    this.enrollRequested.emit(this.course.id);
  }
}
