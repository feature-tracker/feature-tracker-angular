import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FeatureDto, Product, ReleaseDto} from '../../models/feature.model';
import {FeatureService} from '../../service/feature.service';
import {UserService} from '../../service/user.service';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TextareaModule} from 'primeng/textarea';
import {UserDto} from '../../models/user.model';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {FTBreadcrumb} from '../../components/breadcrumb/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-feature-details',
  imports: [
    NgIf,
    ReactiveFormsModule,
    TextareaModule,
    BreadcrumbModule,
    FTBreadcrumb,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './feature-details.html',
})
export class FeatureDetails implements OnInit {
  router = inject(ActivatedRoute);
  featureService = inject(FeatureService);
  userService = inject(UserService);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  items: MenuItem[] =  [
    { icon: 'pi pi-home', route: '/' }
  ];

  productCode = '';
  featureCode = '';
  product: Product | null = null;
  feature: FeatureDto | null = null;
  error: string | null = null;
  isFavorite: boolean = false;

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
      this.isFavorite = feature.isFavorite;
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

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.featureService.toggleFavorite(this.featureCode, this.isFavorite).subscribe(() => {
      const msg = this.isFavorite ? 'Added to favorites' : 'Removed from favorites';
      this.messageService.add({ severity: 'info', summary: 'Info', detail: msg, life: 3000 });
    });
  }
}
