import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { Conversacion, IConversacion } from 'src/app/model/conversacion.model';
import { MensajeModel } from 'src/app/model/mensaje.model';
import { IUsuario } from 'src/app/model/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { ConversacionesService } from 'src/app/services/conversaciones/conversaciones.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
})
export class ConversacionesComponent implements OnInit {

  id!: number;
  idUser!: number | undefined;
  idReceptor!: number;
  conversaciones!: IConversacion[];
  mensajes!: MensajeModel[];
  mensajesConversacion = new Array<MensajeModel[]>(); 
  accountModel!: AccountModel | undefined;
  usuarioReceptor!: IUsuario;

  constructor(
    private conversacionesService: ConversacionesService,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {  }

  ngOnInit(): void {
    this.checkLogin();
  }

  goToViewDetail(id: number): void {
    this.router.navigate(['conversacion', this.accountModel?.id, id]);
  }

  checkLogin(): void {
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account
        console.log("Logueado para ver las conversaciones");
        if(this.accountModel.id){
          this.getConversacionsIdList(this.accountModel.id);

        }
        
      } else {
        console.log('No has iniciado sesión');
        this.router.navigate(['home']);
      }
    })
  }

  getConversacionsIdList(id: number): void {
  
    this.conversacionesService.getConversacionsByUser(id).subscribe(conversaciones => {
      if(conversaciones){
        this.conversaciones = conversaciones
        console.log(this.conversaciones);
        for(let i = 0; i < this.conversaciones.length; i++) {
          if(this.conversaciones[i].id){
            this.getMensajesConversacion(this.conversaciones[i].id);
          }
        }
        console.log(this.mensajesConversacion);
        this.getUsuarioMensajes();
      }
    })
  }

  getMensajesConversacion(id: number | undefined){ 
    this.conversacionesService.getMensajesByConvId(id).subscribe(mensajes => {
      if(mensajes != []){
        this.mensajes = mensajes;
        this.mensajesConversacion.push(this.mensajes);
      }
    })
  }
//Se obtiene el id del usuario receptor a partir de los mensajes de esa conversación
  getUsuarioMensajes(){
    for(let i = 0; i < this.mensajesConversacion.length; i++) {
      for(let j = 0; j < this.mensajesConversacion[i].length; j++) {
        console.log(this.mensajesConversacion[i]);
        if(this.mensajesConversacion[i][j].id){
          let id = this.mensajesConversacion[i][j].receptor?.id;
          if(id != this.accountModel?.id){
              console.log('Estos son tus mensajes con el usuario ' + id);
              this.usuarioService.getUsuarioById(id).subscribe( usuario => { 
                if(usuario){
                  this.usuarioReceptor = usuario;
                  console.log('receptor: ' + JSON.stringify(this.usuarioReceptor.nombre));  
                }
              })
            }    
        }
        i=0;
      }
    }
  }

  crearConversacion(){
     this.conversacionesService.nuevaConversacion().subscribe(data => {console.log(data)}, error => {console.log(error)});
  } 

}
