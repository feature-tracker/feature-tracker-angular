import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {ProductDetails} from "./pages/product-details/product-details";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'products/:productCode', component: ProductDetails },
  { path: '**', redirectTo: 'home'}
];
