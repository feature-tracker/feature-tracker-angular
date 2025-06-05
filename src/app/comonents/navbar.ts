import {Component, HostListener, inject, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
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
  authenticationService = inject(AuthenticationService);

  isDropdownOpen = false;

  user = {
    name: '',
    initials: '',
    email: ''
  };

  projectName = 'Feature Tracker';

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.authenticationService.getUserProfile().then((profile) => {
        this.user = {
          name: profile.name,
          initials: profile.given_name.charAt(0) + profile.family_name.charAt(0),
          email: profile.email
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
