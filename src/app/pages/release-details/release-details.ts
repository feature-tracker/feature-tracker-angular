import {Component, inject, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FeatureService} from '../../service/feature.service';
import {UserService} from '../../service/user.service';
import {MenuItem} from 'primeng/api';
import {Product, ReleaseDto} from '../../models/feature.model';
import {UserDto} from '../../models/user.model';
import {Textarea} from 'primeng/textarea';
import {FTBreadcrumb} from '../../comonents/breadcrumb/breadcrumb';

@Component({
  selector: 'app-release-details',
  imports: [
    Card,
    NgIf,
    ReactiveFormsModule,
    Textarea,
    FTBreadcrumb
  ],
  templateUrl: './release-details.html',
})
export class ReleaseDetails implements OnInit {
  router = inject(ActivatedRoute);
  featureService = inject(FeatureService);
  userService = inject(UserService);

  items: MenuItem[] =  [
    { icon: 'pi pi-home', route: '/' }
  ];

  productCode = '';
  releaseCode = '';
  product: Product | null = null;
  release: ReleaseDto | null = null;
  error: string | null = null;

  allUsers: UserDto[] = [];
  releases: ReleaseDto[] = []

  releaseStatuses = [
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Released', value: 'RELEASED'},
  ];

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const productCode = params.get('productCode');
      const releaseCode = params.get('releaseCode');
      this.productCode = productCode || '';
      this.releaseCode = releaseCode || '';
      if (releaseCode) {
        this.loadProduct();
        this.loadRelease();
        this.loadUsers();
      } else {
        this.error = 'Failed to load release details.';
      }
    });
  }

  loadProduct() {
    this.featureService.getProductByCode(this.productCode).subscribe((product) => {
      this.product = product;
      this.items =  [
        { icon: 'pi pi-home', route: '/' },
        { label: product.name, route: '/products/' + product.code },
        { label: 'Releases' },
      ];
    })
  }

  loadRelease() {
    this.featureService.getReleaseByCode(this.releaseCode).subscribe(release => {
      this.release = release;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

}
