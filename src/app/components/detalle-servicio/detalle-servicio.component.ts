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
    private accountService : AccountService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: Params) => {
    this.id = params.get('id');
    if(this.id){
      this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        console.log("Account: ", account)
        this.usuarioService.getUsuarioById(account?.id).subscribe(usuario => {
        if(usuario){
          this.usuario = usuario
          console.log(this.usuario.id)
        }
        })
      });
    }
  })



  //Get Servicxe By Id from URL
  this.getServiceById()


  }

  getServiceById() : void {
    this.serviceService.getServiceById(this.id).subscribe( (service) => {
      this.service = service
    },(error) => {
        console.log("error: ", error)
    })
  }

  goDetailPerfil(id: number | undefined): void {
    this.router.navigate(['perfil-visitado', id]);
  }


  contratar():void{

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
      usuario: this.usuario,
      servicio: this.service
    }
  }

  goToConversacion() { 
    //Manda el id de usuario para crear la conversación
    if(this.service?.usuario?.id){
      console.log(this.service.usuario.id);
      this.router.navigate(['nueva-conversacion', this.service.usuario.id]);
    }

  }
  
  addFavorito(){
    //Añadimos el servicio a la lista de favoritos del usuario que hay logueado
    console.log('Servicio: ' + this.id);
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account

        if(this.accountModel){
          console.log(this.accountModel);
          
          this.usuarioService.getUsuarioById(this.accountModel?.id).subscribe( usuario => { 
            
            if(usuario){
              this.usuarioLogin = usuario;
              if(this.usuarioLogin){      
                console.log('usuario: ' + JSON.stringify(this.usuarioLogin.nombre));
                    
                //Se llama al servicio de favoritos para hacer el post con los datos del nuevo favorito:
                if(this.service && this.usuarioLogin){
                  console.log(this.service);
                  this.favoritosService.nuevoFavorito(this.construirFavorito(this.usuarioLogin, this.service)).subscribe();
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
}

//https://jossef.github.io/material-design-icons-iconfont/
