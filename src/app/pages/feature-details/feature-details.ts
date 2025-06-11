import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FeatureDto, Product, ReleaseDto} from '../../models/feature.model';
import {FeatureService} from '../../service/feature.service';
import {UserService} from '../../service/user.service';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TextareaModule} from 'primeng/textarea';
import {UserDto} from '../../models/user.model';
import {Fluid} from 'primeng/fluid';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {FTBreadcrumb} from '../../comonents/breadcrumb/breadcrumb';

@Component({
  selector: 'app-feature-details',
  imports: [
    Card,
    InputText,
    NgIf,
    ReactiveFormsModule,
    TextareaModule,
    Fluid,
    BreadcrumbModule,
    FTBreadcrumb,
  ],
  templateUrl: './feature-details.html',
})
export class FeatureDetails implements OnInit {
  router = inject(ActivatedRoute);
  featureService = inject(FeatureService);
  userService = inject(UserService);

  items: MenuItem[] =  [
    { icon: 'pi pi-home', route: '/' }
  ];

  productCode = '';
  featureCode = '';
  product: Product | null = null;
  feature: FeatureDto | null = null;
  error: string | null = null;

  allUsers: UserDto[] = [];
  releases: ReleaseDto[] = []

  featureStatuses = [
    {label: 'New', value: 'NEW'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'On Hold', value: 'ON_HOLD'},
    {label: 'Released', value: 'RELEASED'},
  ];

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const productCode = params.get('productCode');
      const featureCode = params.get('featureCode');
      this.productCode = productCode || '';
      this.featureCode = featureCode || '';
      if (featureCode) {
        this.loadProduct();
        this.loadFeature();
        this.loadUsers();
        this.loadProductReleases();
      } else {
        this.error = 'Failed to load feature details.';
      }
    });
  }

  loadProduct() {
    this.featureService.getProductByCode(this.productCode).subscribe((product) => {
      this.product = product;
      this.items =  [
        { icon: 'pi pi-home', route: '/' },
        { label: product.name, route: '/products/' + product.code },
        { label: 'Features' },
      ];
    })
  }

  loadFeature() {
    this.featureService.getFeatureByCode(this.featureCode).subscribe(feature => {
      this.feature = feature;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

  loadProductReleases() {
    this.featureService.getProductReleases(this.productCode).subscribe((releases) => {
      this.releases = releases;
    })
  }

  getFullNameByUsername(username: string): String {
    let user = this.allUsers.find(user => user.username == username)
    return user?.fullName ?? username;
  }
}
