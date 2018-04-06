import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from '../models/index';

@Injectable()
export class UserService {

  private baseUrl = 'http://akashtiwari.com:3002/users';

  constructor(private http: Http) { }

  createUser(user: IUser): Observable<IUser> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    user['id'] = undefined;
    return this.http.post(this.baseUrl, user, options)
        .do(data => console.log('createSong: ' + JSON.stringify(data)))
        .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  initializeUser(): IUser {
    // Return an initialized user object
    return {
      id: 0,
      username: null,
      password: null,
      first_name: null,
      last_name: null
    };
  }
}
