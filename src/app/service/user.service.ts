import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserDto} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  basePath = environment.apiPath;

  getUsers() {
    return this.http.get<UserDto[]>(this.basePath + '/users/api/users');
  }
}
