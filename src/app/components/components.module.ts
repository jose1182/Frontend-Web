import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecuperarPasswordLinkComponent } from './recuperar-password-link/recuperar-password-link.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ServiciosByCategoriaComponent } from './servicios-by-categoria/servicios-by-categoria.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarPasswordComponent,
    HomeComponent,
    RecuperarPasswordLinkComponent,
    NotfoundComponent,
    ServiciosByCategoriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
