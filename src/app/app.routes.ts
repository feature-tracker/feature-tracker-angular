import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {ProductDetails} from "./pages/product-details/product-details";
import {NotFound} from './pages/not-found/not-found';
import {FeatureDetails} from './pages/feature-details/feature-details';
import {ReleaseDetails} from './pages/release-details/release-details';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home},
  {path: 'products/:productCode', component: ProductDetails},
  {path: 'products/:productCode/features/:featureCode', component: FeatureDetails},
  {path: 'products/:productCode/releases/:releaseCode', component: ReleaseDetails},
  {path: 'not-found', component: NotFound},
  {path: '**', redirectTo: '/not-found'}
];
