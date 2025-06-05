import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NavBar} from './comonents/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
  }
}
