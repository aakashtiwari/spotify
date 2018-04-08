import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../services/index';

import { IUser } from '../models/IUser';

@Component({
  selector: 'app-register',
  moduleId: module.id.toString(),
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: IUser;
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.createUser(this.model)
        .subscribe(
            data => {
                this.setToken(data);
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

  private setToken(data) {
    let token = JSON.parse(data._body).auth_token;
    localStorage.setItem('auth_token',token);
  }
}