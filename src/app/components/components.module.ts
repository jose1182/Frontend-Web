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
import { PerfilPropioComponent } from './perfil-propio/perfil-propio.component';
import { ServiciosByCategoriaComponent } from './servicios-by-categoria/servicios-by-categoria.component';
import { DetalleServicioComponent } from './detalle-servicio/detalle-servicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BusquedaHomeComponent } from './busqueda-home/busqueda-home.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';


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
    PerfilPropioComponent,
    DetalleServicioComponent,
    NavbarComponent,
    BusquedaHomeComponent,
    EditProfileComponent,
    PerfilEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ComponentsModule { }
