import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection
} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthInterceptor} from './service/auth.interceptor';
import {MessageService} from 'primeng/api';
import {CustomPreset} from './custom.preset';

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
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: CustomPreset,
            }
        }),
        MessageService,
    ]
};
