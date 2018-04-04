import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  
  private loggedIn = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', { username: username, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        this.loggedIn.next(true);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    this.loggedIn.next(false);
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}