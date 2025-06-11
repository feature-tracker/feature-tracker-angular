import {ActivatedRouteSnapshot, Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {ProductDetails} from "./pages/product-details/product-details";
import {NotFound} from './pages/not-found/not-found';
import {FeatureDetails} from './pages/feature-details/feature-details';
import {ReleaseDetails} from './pages/release-details/release-details';
import {inject} from '@angular/core';
import {AuthService} from './service/auth.service';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'products/:productCode', component: ProductDetails},
  {path: 'products/:productCode/features/:featureCode', component: FeatureDetails},
  {path: 'products/:productCode/releases/:releaseCode', component: ReleaseDetails},
  {path: 'not-found', component: NotFound},
  {path: '**', component: NotFound}
];

// add authentication check to all routes
for (const route of routes) {
  route.canActivate = [(route: ActivatedRouteSnapshot) => inject(AuthService).checkAccessAllowed(route)];
}
