import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {FeatureService} from '../../service/feature.service';
import {Product} from '../../models/feature.model';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, Menu, RouterLink],
  templateUrl: './sidenav.html',
})
export class Sidenav implements OnInit {
  items: MenuItem[] | undefined;

  featureService = inject(FeatureService);
  products: Product[] = [];

  ngOnInit() {
    this.featureService.getProducts().subscribe((products) => {
      this.products = products;
      let items: MenuItem[] = [];
      products.forEach((product) => {
        items.push({
          label: product.name,
          route: '/products/' + product.code,
        })
      });

      this.items = [
        {
          label: 'Home',
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-home',
              route: '/',
            },
          ]
        },
        {
          label: 'Products',
          items: items
        }
      ];
    })
  }
}
