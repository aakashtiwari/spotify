import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MusicModule } from './music/music.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AlertService, AuthenticationService, UserService } from './services/index';
import { JwtInterceptor } from './helpers/index';
import { AlertComponent } from './directives/index';

// used to create fake backend
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '**', redirectTo: 'home'}
    ]),
    MusicModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
