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
import dayjs from 'dayjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
})
export class ConversacionesComponent implements OnInit {

  id!: number;
  idUser!: number;
  idReceptor!: number;
  idConversacion!: number | undefined;
  conversaciones!: IConversacion[];
  mensajes!: MensajeModel[];
  mensajesConversacion = new Array<MensajeModel[]>();
  conversacionsList= new Array<IConversacionsList>();
  accountModel!: AccountModel | undefined;
  usuarioReceptor!: IUsuario;

  constructor(
    private conversacionesService: ConversacionesService,
    private usuarioService: UsuariosService,
    private usuarioUpdateService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {  
    this.idConversacion = 0;
  }

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

          //Si llega el idUser es porque queremos crear la conversación con él si no existe ya, y en tal caso redireccionar a ella
          this.route.paramMap.subscribe((params: Params) => {
            if(params.get('idUser')){
              this.idUser = params.get('idUser');
              console.log(this.idUser);
              this.buscarConversacion(this.idUser);
            }
          })

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
        for (var mensaje of this.mensajes) {
          mensaje.fecha = dayjs(mensaje.fecha);
          //console.log(mensaje.fecha);
        }
        //último mensaje de esta conversación
        //console.log(this.mensajes.length);
        let ultimoMensaje: IMensaje | undefined = this.mensajes.pop();
        //console.log(ultimoMensaje);
        //Se obtiene el id del receptor
        //console.log(ultimoMensaje?.receptor?.id);

        let usuarioReceptorMensaje: IUsuario | undefined;

        if(ultimoMensaje?.receptor?.id && ultimoMensaje?.receptor?.id != this.accountModel?.id){
          this.usuarioService.getUsuarioById(ultimoMensaje?.receptor?.id).subscribe( usuario => { 
            if(usuario){
              usuarioReceptorMensaje = usuario;
              //console.log('receptor: ' + JSON.stringify(usuarioReceptorMensaje.nombre));
              //console.log('conversacion: ' + ultimoMensaje?.conversacion?.id);
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
      }
    })
  }
  //Se forma el objeto conversacionList que contendrá el id de la conversación, el último mensaje y el id del usuario receptor de la misma
  guardarInfoConversacion(id: number, mensaje: IMensaje, usuario: IUsuario){
    let conversacion = new ConversacionsList();
    conversacion.id = id;
    conversacion.mensaje = mensaje;
    conversacion.usuario = usuario;
    this.conversacionsList.push(conversacion);
    console.log(conversacion);

  }
  
  //Pasamos el id del usuario y tenemos que ver si ha habido interacciones anteriormente con él y en qué conversación
  buscarConversacion(id: number){
    this.conversacionesService.getConversacionsByUser(id).subscribe(conversaciones => {
      if(conversaciones){
        let conversacionesReceptor = conversaciones
        console.log(conversacionesReceptor);
        
        for(let i = 0; i < conversacionesReceptor.length; i++) {
          console.log(conversacionesReceptor[i]);
          
        }
        
        if(this.idConversacion == 0){
          //No existe, así que se crea la conversación
          this.crearConversacion();

          //Vemos por qué ID va y cogemos la última creada:
          this.conversacionesService.getConversacions().subscribe(conversaciones => {
            if(conversaciones){
              this.conversaciones = conversaciones;
              console.log(this.conversaciones.length);
              this.idConversacion = this.conversaciones.length;

              //Actualizamos la información del usuario con esta conversación:
               //Actualizamos el usuario para que tenga esa conversación bien relacionada:
               this.usuarioService.getUsuarioById(this.accountModel?.id).subscribe( usuario => { 
                if(usuario){
                  console.log('emisor: ' + JSON.stringify(usuario.nombre));
                  this.usuarioUpdateService.update(usuario).subscribe(usuario => {
                    console.log('Usuario actualizado');
                  })    
                
                }
              })  
              

          //Y nos lleva a dicha conversación
              this.router.navigate(['conversacion', this.idConversacion, id]);
            }
          })         
        }
      }
    })
  }

  crearConversacion(){
     this.conversacionesService.nuevaConversacion().subscribe();
  } 


}
