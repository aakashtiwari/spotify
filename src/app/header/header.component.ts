import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

	isLoggedIn$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  	this.isLoggedIn$ = this.authenticationService.isLoggedIn;
  }
}
