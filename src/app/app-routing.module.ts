import { PerfilPropioComponent } from './components/perfil-propio/perfil-propio.component';
import { PerfilEditarComponent } from './components/perfil-editar/perfil-editar.component';
import { PerfilVisitadoComponent } from './components/perfil-visitado/perfil-visitado.component';
import { HomeComponent } from './components/home/home.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuperarPasswordLinkComponent } from './components/recuperar-password-link/recuperar-password-link.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ServiciosByCategoriaComponent } from './components/servicios-by-categoria/servicios-by-categoria.component';
import { DetalleServicioComponent } from './components/detalle-servicio/detalle-servicio.component';
import { BusquedaHomeComponent } from './components/busqueda-home/busqueda-home.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CrearServicioComponent } from './components/crear-servicio/crear-servicio.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { PasarelaPagoComponent } from './components/pasarela-pago/pasarela-pago.component';
import { ServicioRoutingResolveService } from './components/crear-servicio/route/servicio/servicio-routing-resolve.service';
import { ContratosComponent } from './components/contratos/contratos.component';
import { DetalleContratoComponent } from './components/detalle-contrato/detalle-contrato.component';
import { ConversacionesComponent } from './components/conversaciones/conversaciones.component';
import { DetalleConversacionComponent } from './components/detalle-conversacion/detalle-conversacion.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { AuthguardGuard } from './guards/authguard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'es/:buscar-servicios',
    component: BusquedaHomeComponent
  },
  {
    path: 'reset-password',
    component: RecuperarPasswordComponent
  },
  {
    path: 'lista/servicios/:id',
    component: ServiciosByCategoriaComponent
  },
  {
    path: 'detalle/servicios/:id',
    component: DetalleServicioComponent
  },
  {
    path: 'crear-servicio/new',
    component: CrearServicioComponent,
    resolve:{
      servicio: ServicioRoutingResolveService
    }
  },
  {
    path: 'crear-servicio/update/:id',
    component: CrearServicioComponent,
    canActivate: [AuthguardGuard],
    resolve:{
      servicio: ServicioRoutingResolveService
    }
  },
  {
    path:'perfil-propio/:vista',
    component: PerfilPropioComponent
  },
  {
    path:'perfil-editar',
    component: PerfilEditarComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path:'perfil-visitado/:id',
    component: PerfilVisitadoComponent
  },
  {
    path: 'account/reset/:finish',
    component: RecuperarPasswordLinkComponent
  },
  {
    path: 'edit-profile/edit/:id',
    component: EditProfileComponent
  },
  {
    path: 'cuenta-especialista',
    component: PricingComponent
  },
  {
    path: 'payment-credit-card',
    component: PasarelaPagoComponent
  },
  {
    path: 'contratos/:id',
    component: ContratosComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'contrato/:id',
    component: DetalleContratoComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'conversaciones',
    component: ConversacionesComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'nueva-conversacion/:idUser',
    component: ConversacionesComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'conversacion/:id/:idUser',
    component: DetalleConversacionComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'favoritos',
    component: FavoritosComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: '404',
    component: NotfoundComponent},
  {
    path: '**',
    redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
