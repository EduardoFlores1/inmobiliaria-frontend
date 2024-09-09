import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errMessage = "";

      if(err.error instanceof ErrorEvent) {
        errMessage = `Error: ${err.error.message}`;
      }else {
        errMessage = `Error: ${err.error.status}, Message: ${err.error.data?.reason || 'Error al procesar'}`
      }

      return throwError(() => errMessage);
    })
  );
};
