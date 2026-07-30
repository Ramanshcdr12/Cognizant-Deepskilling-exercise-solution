import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../../services/course';
import * as CourseActions from './course.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
