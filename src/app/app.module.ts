import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './interceptors/auth-http.interceptor';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ServicesModule } from './services/services.module';
import { AuthguardGuard } from './guards/authguard.guard';

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
    ServicesModule
  ],
  providers: [AuthguardGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
