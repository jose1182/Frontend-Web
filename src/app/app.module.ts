import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ServicesModule } from './services/services.module';
import { AuthguardGuard } from './guards/authguard.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ComponentsModule,
    InterceptorsModule,
    HttpClientModule,
    ServicesModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    CookieService,
    AuthguardGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true
    },
    {
      provide: JWT_OPTIONS, useValue:JWT_OPTIONS
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
