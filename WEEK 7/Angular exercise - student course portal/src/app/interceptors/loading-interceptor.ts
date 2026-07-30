import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  
  // Show global loader spinner on request start
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide global loader spinner on completion or error
      loadingService.hide();
    })
  );
};
