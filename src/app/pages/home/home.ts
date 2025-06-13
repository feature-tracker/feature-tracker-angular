import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureService} from "../../service/feature.service";
import {Router} from "@angular/router";
import {Product} from "../../models/feature.model";
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ CommonModule,DataView, ButtonModule, ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  featureService = inject(FeatureService);
  router = inject(Router);

  products: Product[] =  [];

  ngOnInit() {
      this.featureService.getProducts().subscribe((products) => {
        this.products = products;
      })
  }
}
