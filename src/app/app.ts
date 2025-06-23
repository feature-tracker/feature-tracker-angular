import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavBar} from './components/navbar/navbar';
import {Sidenav} from './components/sidenav/sidenav';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavBar, Sidenav, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit() {
  }
}
