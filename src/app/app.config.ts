import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import {routes} from './app.routes';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthInterceptor} from './service/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAppInitializer(() => {
            const initFn = ((authService: AuthService) => {
                return () => authService.init();
            })(inject(AuthService));
            return initFn();
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        providePrimeNG({
            theme: {
                preset: Lara
            }
        }),
    ]
};
