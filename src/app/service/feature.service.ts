import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {PagedResult} from '../models/common.models';
import {Product} from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  http = inject(HttpClient);
  basePath = environment.apiPath;

  getProducts() {
    return this.http.get<Product[]>(this.basePath+'/features/api/products');
  }
}
