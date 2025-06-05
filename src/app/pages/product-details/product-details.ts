import {Component, inject, OnInit} from '@angular/core';
import {FeatureService} from '../../service/feature.service';
import {FeatureDto, Product, ReleaseDto} from '../../models/feature.model';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [
    NgIf,
    RouterLink,
    TableModule,
    CardModule,
    ButtonModule,
    TabsModule,
    InputText,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './product-details.html',
  standalone: true,
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
    authService = inject(AuthService);
    featureService = inject(FeatureService);
    router = inject(ActivatedRoute);
    route = inject(Router);
    fb = inject(FormBuilder);

  error : string | null = null;
  createReleaseForm = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  createFeatureForm = this.fb.group({
    code: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', []],
    assignedTo: ['', []],
  });

    showCreateReleaseForm = false;
    showCreateFeatureForm = false;

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
        //console.log("productCode->", productCode);
        if (productCode) {
          this.product.code = productCode;
          this.loadProduct();
          this.loadProductReleases();
          this.loadProductFeatures();
        } else {
          this.error = 'Failed to load product details.';
        }
      });
    }

    loadProduct() {
      this.featureService.getProductByCode(this.product.code).subscribe((product) => {
        this.product = product;
      })
    }

    loadProductReleases() {
      this.featureService.getProductReleases(this.product.code).subscribe((releases) => {
        this.releases = releases;
      })
    }

    loadProductFeatures() {
      this.featureService.getProductFeatures(this.product.code).subscribe((features) => {
        this.features = features;
      })
    }

  toggleCreateReleaseForm() {
      this.showCreateReleaseForm = !this.showCreateReleaseForm;
  }

  toggleCreateFeatureForm() {
      this.showCreateFeatureForm = !this.showCreateFeatureForm;
  }

  handleCreateRelease() {
    this.featureService.createRelease({
      productCode: this.product.code,
      code: this.createReleaseForm.value.code ||"",
      description: this.createReleaseForm.value.description ||"",
    }).subscribe({
      next: response => {
        //console.log("response:", response)
        this.loadProductReleases();
        this.toggleCreateReleaseForm();
        this.createReleaseForm.reset();
      },
      error: () => {
        this.error = "Failed to create release."
      }
    });
  }

  handleCreateFeature() {
    this.featureService.createFeature({
      productCode: this.product.code,
      releaseCode: "IJ-2023.3.8", //TODO: get from release dropdown
      code: this.createFeatureForm.value.code ||"",
      title: this.createFeatureForm.value.title ||"",
      description: this.createFeatureForm.value.description ||"",
      assignedTo: this.createFeatureForm.value.assignedTo ||"",
    }).subscribe({
      next: response => {
        //console.log("response:", response)
        this.loadProductFeatures();
        this.toggleCreateFeatureForm();
        this.createFeatureForm.reset();
      },
      error: () => {
        this.error = "Failed to create feature."
      }
    });
  }

}
