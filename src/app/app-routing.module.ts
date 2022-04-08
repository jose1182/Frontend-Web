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
    path:'perfil-propio',
    component: PerfilPropioComponent
  },
  {
    path:'perfil-editar',
    component: PerfilEditarComponent
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
