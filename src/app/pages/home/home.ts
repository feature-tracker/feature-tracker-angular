import {Component, OnInit} from '@angular/core';
import {BadgeModule} from 'primeng/badge';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {CommonModule} from '@angular/common';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ BadgeModule, AvatarModule, InputTextModule, CommonModule,
    TableModule, TagModule, RatingModule, ButtonModule, FormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  ngOnInit() {

  }
}
