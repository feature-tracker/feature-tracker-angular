import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {
  CreateFeaturePayload,
  CreateReleasePayload,
  FeatureDto,
  Product,
  ReleaseDto,
  UpdateFeaturePayload, UpdateReleasePayload
} from '../models/feature.model';

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

  createRelease(payload: CreateReleasePayload) {
    return this.http.post(this.basePath+'/features/api/releases', payload);
  }

  updateRelease(releaseCode:string, payload: UpdateReleasePayload) {
    return this.http.put(this.basePath+'/features/api/releases/'+releaseCode, payload);
  }

  createFeature(payload: CreateFeaturePayload) {
    return this.http.post(this.basePath+'/features/api/features', payload);
  }

  updateFeature(featureCode:string, payload: UpdateFeaturePayload) {
    return this.http.put(this.basePath+'/features/api/features/'+featureCode, payload);
  }

  getFeatureByCode(featureCode: string) {
    return this.http.get<FeatureDto>(this.basePath+'/features/api/features/'+featureCode);
  }

  getReleaseByCode(releaseCode: string) {
    return this.http.get<ReleaseDto>(this.basePath+'/features/api/releases/'+releaseCode);
  }
}
