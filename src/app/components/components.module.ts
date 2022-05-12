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


import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar.component';
import { PricingComponent } from './pricing/pricing.component';
import { BusquedaHomeComponent } from './busqueda-home/busqueda-home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { PasarelaPagoComponent } from './pasarela-pago/pasarela-pago.component';
import { ListaComponent } from './lista/lista.component';
import { ContratosComponent } from './contratos/contratos.component';
import { DetalleContratoComponent } from './detalle-contrato/detalle-contrato.component';
import { ToastComponent } from './toast/toast.component';
import { NgbAlert, NgbAlertModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleConversacionComponent } from './detalle-conversacion/detalle-conversacion.component';
import { ConversacionesComponent } from './conversaciones/conversaciones.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { DeleteServiceModalComponent } from './delete-service-modal/delete-service-modal.component';


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
    PerfilEditarComponent,
    PricingComponent,
    CrearServicioComponent,
    PasarelaPagoComponent,
    ListaComponent,
    ContratosComponent,
    DetalleContratoComponent,
    ToastComponent,
    ConversacionesComponent,
    DetalleConversacionComponent,
    FavoritosComponent,
    DeleteServiceModalComponent
  ],
  exports:[PricingComponent, ToastComponent],
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
    MatNativeDateModule,
    NgbToastModule,
    NgbAlertModule

  ]
})
export class ComponentsModule { }
