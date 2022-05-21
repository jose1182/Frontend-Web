import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { Conversacion, IConversacion } from 'src/app/model/conversacion.model';
import { ConversacionsList, IConversacionsList } from 'src/app/model/listaConversaciones.model';
import { IMensaje, MensajeModel } from 'src/app/model/mensaje.model';
import { IUsuario, updateConversacions } from 'src/app/model/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { ConversacionesService } from 'src/app/services/conversaciones/conversaciones.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import * as dayjs from 'dayjs'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { DATE_TIME_FORMAT } from 'src/app/config/input.constants';

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

  //Probando actualización usuario
  isSaving = false;

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
              this.idReceptor = params.get('idUser');
              //console.log(this.idReceptor);
              this.buscarConversacion(this.idReceptor);
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
          if(this.accountModel?.id != undefined){
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
          }
         
        } else {
          if(this.idReceptor != undefined){
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
  public buscarConversacion(id: number){
    this.conversacionesService.getConversacionsByUser(id).subscribe(conversaciones => {
      if(conversaciones){
        let conversacionesReceptor = conversaciones
        if(conversacionesReceptor == null){
          console.log('Esto está vacío macho: ' + conversacionesReceptor)
        }
        //console.log('Conversaciones con el usuario receptor: ')
        for(let i = 0; i < conversacionesReceptor.length; i++) {
          for(let j = 0; j < this.conversaciones.length; j++) {
            
            if(this.conversaciones[j].id==conversacionesReceptor[i].id){
              this.idConversacion = this.conversaciones[j].id;
              console.log('Conversación en común:' + this.conversaciones[j].id);
            }
          }
          
        }
        //console.log('Conversaciones del usuario emisor: ')
        
        
        if(this.idConversacion == 0){
          //No existe, así que se crea la conversación
          this.crearConversacion();

          //Vemos por qué ID va y cogemos la última creada:
          this.conversacionesService.getConversacions().subscribe(conversaciones => {
            if(conversaciones){
              this.conversaciones = conversaciones;
              //console.log(this.conversaciones.length);
              this.idConversacion = this.conversaciones.length;

              //Actualizamos la información de los usuario para que tengan esa conversación bien relacionada:
              //El emisor
              if(this.accountModel?.id != undefined){
                this.usuarioService.getUsuarioById(this.accountModel.id).subscribe( usuario => { 
                  if(usuario){
                    if(usuario.conversacions){
                      if(usuario.conversacions.length > 0){
                         let conver: IConversacion = new Conversacion(this.idConversacion);
                         //Se actualiza mediante la función del modelo del usuario:
                         updateConversacions(usuario, conver);
                       }
                     }
                     console.log('emisor: ' + JSON.stringify(usuario.nombre));
                     
                     //console.log('FN: ' + dayjs(usuario.fn, DATE_TIME_FORMAT));
                     this.save(usuario);
                  
                   }
                 })  
              }
              //El receptor
              if(this.idReceptor != undefined){
                this.usuarioService.getUsuarioById(this.idReceptor).subscribe( usuario => { 
                  if(usuario){
                    if(usuario.conversacions){
                      if(usuario.conversacions.length > 0){
                         let conver: IConversacion = new Conversacion(this.idConversacion);
                         //Se actualiza mediante la función del modelo del usuario:
                         updateConversacions(usuario, conver);
                       }
                     }
                     console.log('receptor: ' + JSON.stringify(usuario.nombre));;
                     this.save(usuario);
                  
                   }
                 })  
              }
             
          //Y nos lleva a dicha conversación
              this.router.navigate(['conversacion', this.idConversacion, id]);
            }
          })         
        } else {
            //Y nos lleva a dicha conversación
            this.router.navigate(['conversacion', this.idConversacion, id]);
        }
        
      }
    })
  }

  save(usuario: IUsuario): void {
    
    if (usuario.id !== undefined) {
      this.usuarioService.update(usuario).subscribe(usuario => {
        console.log(usuario);
      });
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    //
  }

  previousState(): void {
    window.history.back();
  }

  crearConversacion(){
    console.log('Conversacion creada'); 
    this.conversacionesService.nuevaConversacion().subscribe();
  } 


}
