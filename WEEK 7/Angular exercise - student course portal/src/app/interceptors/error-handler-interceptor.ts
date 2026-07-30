import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Global Error Interceptor Caught:', error);
      
      if (error.status === 401) {
        console.warn('Unauthorized! Redirecting to home/login.');
        router.navigate(['/']);
      } else if (error.status === 500) {
        alert('Server Error (500): A global server error has occurred. Please try again later.');
      }
      
      return throwError(() => error);
    })
  );
};
