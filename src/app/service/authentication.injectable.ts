import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, lastValueFrom, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  authenticationService = inject(AuthenticationService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.addHeader(request, next));
  }

  private async addHeader(request: HttpRequest<any>, next: HttpHandler) {
    const token = await this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return await lastValueFrom(next.handle(request));
  }

}
