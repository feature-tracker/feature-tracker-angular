import {Component, inject, OnInit} from '@angular/core';
import {FeatureService} from '../../service/feature.service';
import {FeatureDto, Product, ReleaseDto} from '../../models/feature.model';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {InputText} from 'primeng/inputtext';
import {Select, SelectModule} from 'primeng/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {UserDto} from '../../models/user.model';

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
    Select,
  ],
  templateUrl: './product-details.html',
  standalone: true,
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  authService = inject(AuthService);
  featureService = inject(FeatureService);
  userService = inject(UserService);
  router = inject(ActivatedRoute);
  route = inject(Router);
  fb = inject(FormBuilder);

  error: string | null = null;
  createReleaseForm = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  featureStatuses = [
    {label: 'New', value: 'NEW'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'On Hold', value: 'ON_HOLD'},
    {label: 'Released', value: 'RELEASED'},
  ];

  allUsers: UserDto[] = [];

  releaseStatuses = [
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Released', value: 'RELEASED'},
  ];

  createFeatureForm = this.fb.group({
    code: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', []],
    assignedTo: ['', []],
  });

  showCreateFeatureForm = false;
  showEditFeatureForm = false;
  showCreateReleaseForm = false;
  showEditReleaseForm = false;

  product: Product = {
    id: 0,
    code: '',
    name: '',
    description: '',
    createdBy: '',
    disabled: false,
    imageUrl: '',
  };

  editFeatureForm = this.fb.group({
    code: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', []],
    status: ['', [Validators.required]],
    assignedTo: ['', []],
  });

  editReleaseForm = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  releases: ReleaseDto[] = []
  features: FeatureDto[] = []

  ngOnInit(): void {
    this.loadUsers();
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

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
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

  showCreateReleaseFormHandler() {
    this.hideAllForms();
    this.showCreateReleaseForm = true;
  }

  showCreateFeatureFormHandler() {
    this.hideAllForms();
    this.showCreateFeatureForm = true;
  }

  hideAllForms() {
    this.showCreateFeatureForm = false;
    this.showEditFeatureForm = false;
    this.showCreateReleaseForm = false;
    this.showEditReleaseForm = false;
  }

  handleCreateRelease() {
    this.featureService.createRelease({
      productCode: this.product.code,
      code: this.createReleaseForm.value.code || "",
      description: this.createReleaseForm.value.description || "",
    }).subscribe({
      next: response => {
        //console.log("response:", response)
        this.loadProductReleases();
        this.showCreateReleaseForm = false;
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
      code: this.createFeatureForm.value.code || "",
      title: this.createFeatureForm.value.title || "",
      description: this.createFeatureForm.value.description || "",
      assignedTo: this.createFeatureForm.value.assignedTo || "",
    }).subscribe({
      next: response => {
        //console.log("response:", response)
        this.loadProductFeatures();
        this.showCreateFeatureForm = false;
        this.createFeatureForm.reset();
      },
      error: () => {
        this.error = "Failed to create feature."
      }
    });
  }

  editFeature(feature: FeatureDto) {
    this.hideAllForms();
    this.showEditFeatureForm = true;
    this.editFeatureForm.patchValue({
      code: feature.code,
      title: feature.title,
      description: feature.description,
      status: feature.status,
      assignedTo: feature.assignedTo,
    });
  }

  handleUpdateFeature() {
    this.featureService.updateFeature(
      this.editFeatureForm.value.code || "",
      {
        title: this.editFeatureForm.value.title || "",
        description: this.editFeatureForm.value.description || "",
        status: this.editFeatureForm.value.status || "",
        assignedTo: this.editFeatureForm.value.assignedTo || "",
      }).subscribe({
      next: response => {
        this.hideAllForms();
        this.loadProductFeatures();
      },
      error: () => {
        this.error = "Failed to update feature."
      }
    });
  }

  editRelease(release: ReleaseDto) {
    this.hideAllForms();
    this.showEditReleaseForm = true;
    this.editReleaseForm.patchValue({
      code: release.code,
      description: release.description,
      status: release.status,
    });
  }

  handleUpdateRelease() {
    this.featureService.updateRelease(
      this.editReleaseForm.value.code || "",
      {
        description: this.editReleaseForm.value.description || "",
        status: this.editReleaseForm.value.status || "",
      }).subscribe({
      next: response => {
        this.hideAllForms();
        this.loadProductReleases();
      },
      error: () => {
        this.error = "Failed to update release."
      }
    });
  }

}
