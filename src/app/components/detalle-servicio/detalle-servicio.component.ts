import { Favoritos, IFavorito } from 'src/app/model/favoritos.model';
import { ContratosService } from 'src/app/services/contratos/contratos.service';
import { UsuariosService } from './../../services/usuario/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { IUsuario, Usuario } from '../../model/usuario.model';
import { IServicio } from '../../model/servicio.model';
import { Contrato, IContrato } from '../../model/contrato.model';
import * as dayjs from 'dayjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContratarServicioModelComponent } from '../contratar-servicio-model/contratar-servicio-model.component';
import { ToastService } from '../../services/_services/toast.service';
import { AccountService } from '../../services/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  id!: number | undefined;
  service: IServicio | null = null;
  usuario!: IUsuario;
  usuarioLogin!: IUsuario;
  contratos!: IContrato[];
  accountModel!: AccountModel;
  favorito!: IFavorito;
  esFavorito: boolean = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiciosService,
    private usuarioService: UsuariosService,
    private router: Router,
    private contratosService: ContratosService,
    private favoritosService: FavoritosService,
    private modalService : NgbModal,
    private toastService : ToastService,
    private accountService : AccountService,
    private location: Location
  ) { }

  ngOnInit(): void {

      this.checkLogin();
      
      //Get Servicxe By Id from URL
      this.getServiceById()

  }

  checkLogin(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      if(this.id){
        this.accountService
        .getAuthenticationState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(account => {
          //console.log("Account: ", account)
          this.usuarioService.getUsuarioById(account?.id).subscribe(usuario => {
          if(usuario){
            this.usuarioLogin = usuario
            //console.log(this.usuario.id)
          }
          })
        });
      }
    })
  }

  getServiceById() : void {
    this.serviceService.getServiceById(this.id).subscribe( (service) => {
      this.service = service
      if(this.service){
        console.log(this.service)
        if(this.service.id){
          this.comprobarFavorito(this.service.id);
          if(this.service.usuario){
            //console.log(this.service.usuario.id);
            this.usuarioService.getUsuarioById(this.service.usuario.id).subscribe( usuario => {
              if(usuario){
                this.usuario = usuario;
                console.log(usuario);
              }
            })
          }
        }        
      }
    },(error) => {
        console.log("error: ", error)
    })
  }

  goDetailPerfil(id: number | undefined): void {
    this.router.navigate(['perfil-visitado', id]);
  }


  contratar():void{
    if(this.usuarioLogin){
    this.contratosService.getContratoByServiceId(this.createContracto())
      .subscribe({
        next: contratos => {
          this.contratos = contratos
        },
          error: error => { console.log(error) },
           complete: () => {
            if(this.contratos?.length >= 1){
              this.showModal()
            }else {
              this.contratosService.create(this.createContracto()).subscribe(()=>{
                this.showSuccess()
              })
            }
           }
      })
    } else {
      this.router.navigate(['login']);
    }

  }

  showSuccess() {
    this.toastService.show('Servicio Contratado con éxito!', {
      classname: 'bg-success text-light',
      delay: 5000 ,
      autohide: true,
      headertext: 'Contratar Servicio'
    });
  }


  showModal():void{
    const modalRef =  this.modalService.open(ContratarServicioModelComponent,{size: 'lg', backdrop: 'static'})
    modalRef.componentInstance.contrato =  this.createContracto();
    modalRef.closed.subscribe(reason => {
      this.showSuccess()
    })
  }

  createContracto():IContrato{
    return {
      ...new Contrato(),
      id: undefined,
      preciofinal: 10,
      fecha: dayjs().startOf('day'),
      usuario: this.usuarioLogin,
      servicio: this.service
    }
  }

  goToConversacion() { 
    //Manda el id de usuario para crear la conversación
    if(this.usuario?.id){
      console.log(this.usuario.id);
      this.router.navigate(['nueva-conversacion', this.usuario.id]);
    } else {
      this.router.navigate(['login']);
    }

  }
  
  elegirAccionFav(){
    if(this.service?.id){
      this.comprobarFavorito(this.service.id);
      console.log('Es o no favorito: ' + this.esFavorito);
      if(this.esFavorito){
        this.eliminarFav(this.service.id);
      } else {
        this.addFavorito();
      }
    } 
  }

  addFavorito(){
    //Añadimos el servicio a la lista de favoritos del usuario que hay logueado
    //console.log('Servicio: ' + this.id);
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account

        if(this.accountModel){
          //console.log(this.accountModel);
          
          this.usuarioService.getUsuarioById(this.accountModel?.id).subscribe( usuario => { 
            
            if(usuario){
              this.usuarioLogin = usuario;
              if(this.usuarioLogin){      
                //console.log('usuario: ' + JSON.stringify(this.usuarioLogin.nombre));
                    
                //Se llama al servicio de favoritos para hacer el post con los datos del nuevo favorito:
                if(this.service && this.usuarioLogin){
                  //console.log(this.service);
                  this.favoritosService.nuevoFavorito(this.construirFavorito(this.usuarioLogin, this.service)).subscribe();
                  this.esFavorito = true;
                  this.refresh();
                }

              }
            }
          })
        }

      } else {
        console.log('No has iniciado sesión para poder añadir a favoritos');
      }
    })    
  }

  construirFavorito(usuario: IUsuario, servicio: IServicio): IFavorito {
    
    return { 
      ...new Favoritos(),
      usuario: usuario,
      servicio: servicio
    }
  }

  eliminarFav(id?: number): void{
    //Saco su posición de fav en el array de favoritos y mando eliminar el que tiene ese ID(hay que sumar 1 siempre):
    let idEliminar;

    let listaFavoritos: IFavorito[] = []
    let idUser;
    //Se obtiene la lista de favoritos del usuario logueado

    //Primero el id del usuario logueado
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account

        if(this.accountModel.id){
          //console.log(this.accountModel);
          idUser = this.accountModel.id;

          //Mediante el ID del usurio llegamos hasta sus favoritos
          this.favoritosService.favoritosPorId(idUser).subscribe(favoritos => {
            if(favoritos.length > 0) {
              listaFavoritos = favoritos;
              
              if(listaFavoritos){
                //console.log(listaFavoritos);
                for(let i = 0; i < listaFavoritos.length; i++){
                  //console.log(listaFavoritos[i].servicio)
                  if(listaFavoritos[i].servicio){
                    //console.log('ID del servicio: ' + listaFavoritos[i].servicio?.id)
                    if(id == listaFavoritos[i].servicio?.id){
                      idEliminar = listaFavoritos[i].id;
                      console.log('Hay que borrar el favorito número: ' + idEliminar);
                      this.favoritosService.borrarFavorito(idEliminar).subscribe(
                        data => 
                        {
                          console.log('Borrado');
                          this.esFavorito = false;
                          this.refresh();
                        }
                      );
                      break;   
                    }         
                  }
                }
              }
            }
          })
        }
      }
    })    

  
    
  }

  comprobarFavorito(idServ: number) {
    //console.log('servicio: ' + idServ);
    let listaFavoritos: IFavorito[] = []
    let idUser;
    //Se obtiene la lista de favoritos del usuario logueado

    //Primero el id del usuario logueado
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account

        if(this.accountModel.id){
          //console.log(this.accountModel);
          idUser = this.accountModel.id;

          //Mediante el ID del usurio llegamos hasta sus favoritos
          this.favoritosService.favoritosPorId(idUser).subscribe(favoritos => {
            if(favoritos.length > 0) {
              listaFavoritos = favoritos;
              
              //Una vez tenemos la lista de fav podemos recorrerla y comparar con el que se intenta agregar:
              for(let i = 0; i < listaFavoritos.length; i++) {
                //console.log(listaFavoritos[i].servicio?.id);
                if(idServ == listaFavoritos[i].servicio?.id){
                  this.esFavorito = true;
                }
              }
            }
          })
        }
      }
    })    
  }

  refresh(): void {
    this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
    //console.log(decodeURI(this.location.path()));
    this.router.navigate([decodeURI(this.location.path())]);
    });
  }


}

//https://jossef.github.io/material-design-icons-iconfont/
