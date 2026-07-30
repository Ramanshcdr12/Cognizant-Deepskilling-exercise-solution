import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone request to add mock authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};
