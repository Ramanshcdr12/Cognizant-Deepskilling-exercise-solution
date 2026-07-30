import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {
  coursesCount = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.refreshCount();
  }

  refreshCount(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.coursesCount = courses.length;
      },
      error: (err) => {
        console.error('Error refreshing course summary widget count:', err);
      }
    });
  }

  addSampleCourse(): void {
    const nextId = this.coursesCount + 1;
    const mockCourse = {
      name: `Advanced Cloud Computing ${nextId}`,
      code: `CS${nextId}0${nextId}`,
      credits: 3,
      gradeStatus: 'pending' as const,
      enrolled: false
    };

    // Call POST request to save mock course to db.json mock API database
    this.courseService.createCourse(mockCourse).subscribe({
      next: () => {
        // Refresh count to pull newly added course
        this.refreshCount();
        console.log('Sample course added to mock REST API!');
      },
      error: (err) => {
        console.error('Error creating sample course:', err);
      }
    });
  }
}
