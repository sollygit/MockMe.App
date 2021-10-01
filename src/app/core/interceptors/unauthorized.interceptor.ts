import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.clearLocalStorage();
          this.router.navigate(['login'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url },
          });
        }
        if (err.status === 400) {
          this.snackBar.open(err.error, 'Error', { duration: 3000 });
        }
        if (!environment.production) {
          console.error(err);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        return throwError(error);
      })
    );
  }
}
