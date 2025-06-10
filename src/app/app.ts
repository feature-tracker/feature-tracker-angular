import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavBar} from './comonents/navbar/navbar';
import {Sidenav} from './comonents/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavBar, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit() {
  }
}
