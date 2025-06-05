import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FeatureDto, Product, ReleaseDto} from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  http = inject(HttpClient);
  basePath = environment.apiPath;

  getProducts() {
    return this.http.get<Product[]>(this.basePath+'/features/api/products');
  }

  getProductByCode(productCode: string) {
    return this.http.get<Product>(this.basePath+'/features/api/products/'+productCode);
  }

  getProductReleases(productCode: string) {
    return this.http.get<ReleaseDto[]>(this.basePath+'/features/api/releases?productCode='+productCode);
  }

  getProductFeatures(productCode: string) {
    return this.http.get<FeatureDto[]>(this.basePath+'/features/api/features?productCode='+productCode);
  }
}
