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
import { PerfilVisitadoComponent } from './perfil-visitado/perfil-visitado.component';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';
import { PerfilPropioComponent } from './perfil-propio/perfil-propio.component';
import { ServiciosByCategoriaComponent } from './servicios-by-categoria/servicios-by-categoria.component';
import { DetalleServicioComponent } from './detalle-servicio/detalle-servicio.component';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaHomeComponent } from './busqueda-home/busqueda-home.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarPasswordComponent,
    HomeComponent,
    RecuperarPasswordLinkComponent,
    NotfoundComponent,
    ServiciosByCategoriaComponent,
    PerfilVisitadoComponent,
    PerfilEditarComponent,
    PerfilPropioComponent,
    DetalleServicioComponent,
    NavbarComponent,
    BusquedaHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule
  ]
})
export class ComponentsModule { }
