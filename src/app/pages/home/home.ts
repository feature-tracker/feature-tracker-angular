import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureService} from "../../service/feature.service";
import {Router} from "@angular/router";
import {Product} from "../../models/feature.model";

@Component({
  selector: 'app-home',
  imports: [ CommonModule,],
  templateUrl: './home.html',
  styleUrl: './home.css'
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
