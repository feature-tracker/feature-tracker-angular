import {Component, input} from '@angular/core';
import {Breadcrumb} from 'primeng/breadcrumb';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    Breadcrumb,
    NgIf,
    RouterLink,
    NgClass,
  ],
  templateUrl: './breadcrumb.html',
  standalone: true,
})
export class FTBreadcrumb {
  items = input<MenuItem[]>([]);
}
