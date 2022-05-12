import { IUsuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { IServicio, Servicio } from '../../model/servicio.model';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { DeleteServiceModalComponent } from '../delete-service-modal/delete-service-modal.component';
@Component({
  selector: 'app-perfil-propio',
  templateUrl: './perfil-propio.component.html',
  styleUrls: ['./perfil-propio.component.css']
})
export class PerfilPropioComponent implements OnInit {

  service: IServicio | null= null;
  accountModel!: AccountModel | null;
  usuarioModel!: IUsuario ;
  id: number | null | undefined;
  criteria: BusquedaServicio [] = [];
  servicios!: IServicio[];
  numDestacados!: any;
  maxNumDestacados = 5;
  maxdestalcanzados = false;
  private readonly destroy$ = new Subject<void>();
  isEspecialista: boolean | undefined;
  constructor(
    private accountService: AccountService,
    private userService: UsuariosService,
    private serviciosService: ServiciosService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {

    this.accountService.identify(true).subscribe( account => {
      this.id = account?.id;
      console.log("accou: ", account)
      this.accountModel = account;

      this.criteria.push({param: "usuarioId.equals", val: this.id})

      this.listaServicios();

      if (this.id){
        this.userData(this.id);
      }

      this.isEspecialista =  account?.authorities.includes('ROLE_ESPECIALISTA');

    })

  }

  delete(servicio: IServicio):void{
    console.log("delte-----", servicio)
    const modalRef =  this.modalService.open(DeleteServiceModalComponent,{size: 'lg', backdrop: 'static'})
    modalRef.componentInstance.servicio =  servicio;
    modalRef.closed.subscribe(reason => {
      this.listaServicios();
    })
  }

  userData(id: number){
    this.userService.getUsuarioById(id).subscribe( user => {
      this.usuarioModel = user;
    })
  }

  listaServicios(): void{
    //TODO falta controlar array criteria con pulsación boton, solo sebe ser posible añadir un item en array.
    this.serviciosService.servicios(this.criteria).subscribe(servicios => {
      //saving all services
      this.numDestacados = servicios.filter((servicio) => {
        return servicio.destacado == true;
      }).length;

      if(this.numDestacados >= this.maxNumDestacados){
        this.maxdestalcanzados = true;
      }
      this.servicios = servicios;
    })
  }

}
