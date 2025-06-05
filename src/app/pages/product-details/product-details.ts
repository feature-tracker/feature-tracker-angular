import {Component, inject, OnInit} from '@angular/core';
import {FeatureService} from '../../service/feature.service';
import {FeatureDto, Product, ReleaseDto} from '../../models/feature.model';
import {NgIf} from '@angular/common';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-product-details',
  imports: [
    NgIf,
    TableModule,
    CardModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
    authService = inject(AuthService);
    featureService = inject(FeatureService);
    router = inject(ActivatedRoute);
    route = inject(Router);

    product: Product = {
      id: 0,
      code: '',
      name: '',
      description: '',
      createdBy: '',
      disabled: false,
      imageUrl: '',
    };

    releases: ReleaseDto[] = []
    features: FeatureDto[] = []

    ngOnInit(): void {
      this.router.paramMap.subscribe(params => {
        const productCode = params.get('productCode');
        if (productCode) {
          this.featureService.getProductByCode(productCode).subscribe((product) => {
            this.product = product;
          })
          this.featureService.getProductReleases(productCode).subscribe((releases) => {
            this.releases = releases;
          })
          this.featureService.getProductFeatures(productCode).subscribe((features) => {
            this.features = features;
          })
        } else {
          //this.error = true;
          //this.loading = false;
        }
      });

    }

}
