import {Component, inject, OnInit} from '@angular/core';
import {FeatureService} from '../../service/feature.service';
import {Product, ReleaseDto} from '../../models/feature.model';
import {ActivatedRoute} from "@angular/router";
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {ReleasesTab} from './releases-tab/releases-tab';
import {FeaturesTab} from './features-tab/features-tab';
import {UserDto} from '../../models/user.model';
import {UserService} from '../../service/user.service';
import {MenuItem} from 'primeng/api';
import {FTBreadcrumb} from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    TabsModule,
    ReactiveFormsModule,
    ReleasesTab,
    FeaturesTab,
    FTBreadcrumb,
  ],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  featureService = inject(FeatureService);
  userService = inject(UserService);
  router = inject(ActivatedRoute);

  allUsers: UserDto[] = [];
  releases: ReleaseDto[] = []

  items: MenuItem[] =  [
    { icon: 'pi pi-home', route: '/' }
  ];

  error: string | null = null;

  product: Product = {
    id: 0,
    code: '',
    name: '',
    description: '',
    createdBy: '',
    disabled: false,
    imageUrl: '',
  };

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const productCode = params.get('productCode');
      if (productCode) {
        this.product.code = productCode;
        this.loadProduct();
        this.loadUsers();
        this.loadProductReleases();
      } else {
        this.error = 'Failed to load product details.';
      }
    });
  }

  loadProduct() {
    this.featureService.getProductByCode(this.product.code).subscribe((product) => {
      this.product = product;
      this.items =  [
        { icon: 'pi pi-home', route: '/' },
        { label: product.name },
      ];
    })
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.allUsers = users;
    })
  }

  loadProductReleases() {
    this.featureService.getProductReleases(this.product.code).subscribe((releases) => {
      this.releases = releases;
    })
  }

  onTabChange() {
    this.loadProductReleases()
    this.loadUsers()
  }

  onReleaseChanged() {
    this.loadProductReleases()
  }
}
