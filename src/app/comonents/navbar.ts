import {Component, HostListener, inject, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: 'navbar.css'
})
export class NavBar implements OnInit {
  authService = inject(AuthService);

  isDropdownOpen = false;

  user = {
    name: '',
    initials: '',
  };

  projectName = 'Feature Tracker';

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserProfile().then((profile) => {
        this.user = {
          name: profile.name,
          initials: profile.given_name.charAt(0) + profile.family_name.charAt(0),
        };
      })
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('userDropdown');

    if (dropdown && !dropdown.contains(target)) {
      this.closeDropdown();
    }
  }
}
