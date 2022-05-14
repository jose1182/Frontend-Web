import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { Conversacion, IConversacion } from 'src/app/model/conversacion.model';
import { ConversacionsList, IConversacionsList } from 'src/app/model/listaConversaciones.model';
import { IMensaje, MensajeModel } from 'src/app/model/mensaje.model';
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
  conversacion = new ConversacionsList();
  mensajes!: MensajeModel[];
  mensajesConversacion = new Array<MensajeModel[]>();
  conversacionsList= new Array<IConversacionsList>();
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

  goToViewDetail(id: number | undefined, idUser: number | undefined): void {
    this.router.navigate(['conversacion', id, idUser]);
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
            console.log(this.conversaciones[i].id)
          }
        }
        console.log(this.mensajesConversacion);
      }
    })
  }

  getMensajesConversacion(id: number | undefined){ 
    this.conversacionesService.getMensajesByConvId(id).subscribe(mensajes => {
      if(mensajes != []){
        this.mensajes = mensajes;
        //último mensaje de esta conversación
        console.log(this.mensajes.pop());
        let ultimoMensaje: IMensaje | undefined = this.mensajes.pop();
        console.log(ultimoMensaje?.texto);
        //Se obtiene el id del receptor
        console.log(ultimoMensaje?.receptor?.id);

        let usuarioReceptorMensaje: IUsuario | undefined;

        if(ultimoMensaje?.receptor?.id && ultimoMensaje?.receptor?.id != this.accountModel?.id){
          this.usuarioService.getUsuarioById(ultimoMensaje?.receptor?.id).subscribe( usuario => { 
            if(usuario){
              usuarioReceptorMensaje = usuario;
              console.log('receptor: ' + JSON.stringify(usuarioReceptorMensaje.nombre));
              console.log('conversacion: ' + ultimoMensaje?.conversacion?.id);
              if(id!=undefined && ultimoMensaje && usuarioReceptorMensaje){
                this.guardarInfoConversacion(id, ultimoMensaje, usuarioReceptorMensaje);
              }
            }
          })  
        } else {
          this.usuarioService.getUsuarioById(ultimoMensaje?.emisor?.id).subscribe( usuario => { 
            if(usuario){
              usuarioReceptorMensaje = usuario;
              console.log('receptor: ' + JSON.stringify(usuarioReceptorMensaje.nombre));
              console.log('conversacion: ' + ultimoMensaje?.conversacion?.id);
              if(id!=undefined && ultimoMensaje && usuarioReceptorMensaje){
                this.guardarInfoConversacion(id, ultimoMensaje, usuarioReceptorMensaje);
              }
            }
          })  
        }
              
        this.mensajesConversacion.push(this.mensajes);

        for(let i = 0; i < this.mensajesConversacion.length; i++) {
          //último mensaje de cada conversación
          //console.log('Mensaje: ' + this.mensajesConversacion[i]);
          //let mensaje: MensajeModel = this.mensajesConversacion[this.mensajesConversacion[i].length-1];
          //receptor
          //console.log('Receptor: ' + this.mensajesConversacion[i]);
        }
      }
    })
  }
  //Se forma el objeto conversacionList que contendrá el id de la conversación, el último mensaje y el id del usuario receptor de la misma 

  guardarInfoConversacion(id: number, mensaje: IMensaje, usuario: IUsuario){
    
    this.conversacion.id = id;
    this.conversacion.mensaje = mensaje;
    this.conversacion.usuario = usuario;
    this.conversacionsList.push(this.conversacion);
    console.log(this.conversacion);
  }

  crearConversacion(){
     this.conversacionesService.nuevaConversacion().subscribe(data => {console.log(data)}, error => {console.log(error)});
  } 

}
