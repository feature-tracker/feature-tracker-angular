import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import Keycloak from 'keycloak-js';
import {UserProfile} from '../models/user.model';

export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  router = inject(Router);
  keycloak?: Keycloak;

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      missingRole: 'You do not have sufficient rights to access this area.'
    };
    return messages[key];
  }

  async init() {
    this.keycloak = new Keycloak(environment.keycloakConfig);
    await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
    });
  }

  checkAccessAllowed(route: ActivatedRouteSnapshot) {
    const roles = route.data['roles'];
    if (roles && !this.isLoggedIn()) {
      // show login page
      const targetUrl = this.router.getCurrentNavigation()?.finalUrl?.toString();
      this.login(targetUrl);
      return false;
    } else if (roles && !this.hasAnyRole(roles)) {
      // show error page with message
      this.router.navigate(['/error'], {
            state: {
              errorStatus: '403',
              msgError: this.getMessage('missingRole')
            }
          });
      return false;
    }
    return true;
  }

  async login(targetUrl?: string) {
    await this.keycloak?.login({
      redirectUri: location.origin + (targetUrl || '/')
    });
  }

  isLoggedIn() {
    return this.keycloak?.authenticated;
  }

  async getUserProfile() {
    const profile = await this.keycloak?.loadUserInfo();
    let userProfile = profile as UserProfile;
    userProfile.roles = this.getCurrentUserRoles()
    return userProfile;
  }

  getCurrentUserRoles() {
    if(!this.isLoggedIn()) return [];
    const realmRoles = this.keycloak?.realmAccess?.roles || [];
    return realmRoles.filter(role => role.startsWith("ROLE_") || role.startsWith("SCOPE_"));
  }

  isCurrentUserAdmin() {
    return this.hasAnyRole([ROLE_ADMIN]);
  }

  hasAnyRole(requiredRoles: string[]) {
    const currentRoles = this.getCurrentUserRoles();
    return requiredRoles.some((requiredRole) => currentRoles.includes(requiredRole));
  }

  async getToken() {
    if (!this.isLoggedIn()) {
      return null;
    }
    if (this.keycloak?.isTokenExpired()) {
      // update token before continuing
      try {
        await this.keycloak.updateToken();
      } catch (error) {
        return null;
      }
    }
    return this.keycloak?.token;
  }

  async logout() {
    await this.keycloak?.logout({
      redirectUri: location.origin + '?logoutSuccess=true'
    });
  }

}
