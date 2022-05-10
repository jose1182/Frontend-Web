import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dayjs from 'dayjs';
import { AccountModel } from 'src/app/model/account.model';
import { Conversacion, IConversacion } from 'src/app/model/conversacion.model';
import { IMensaje, MensajeModel } from 'src/app/model/mensaje.model';
import { AccountService } from 'src/app/services/account.service';
import { ConversacionesService } from 'src/app/services/conversaciones/conversaciones.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsuario, Usuario } from 'src/app/model/usuario.model';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-conversacion',
  templateUrl: './detalle-conversacion.component.html',
  styleUrls: ['./detalle-conversacion.component.css']
})
export class DetalleConversacionComponent implements OnInit {

  id!: number;
  idReceptor!: number | undefined;
  idNuevaConv!: number | undefined;
  mensajes!: IMensaje[];
  accountModel!: AccountModel | undefined;
  mensajeForm!: FormGroup;
  emisor!: IUsuario;
  receptor!: IUsuario;
  conversacion!: Conversacion;
  success = false;

  constructor(
    private conversacionesService: ConversacionesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private accountService: AccountService,
    private usuarioService: UsuariosService,
    private fb: FormBuilder,
  ) { 
    this.mensajeForm = this.fb.group({
      mensaje:['',[Validators.required, Validators.maxLength(254)]]
    })
  }

  ngOnInit(): void {
    this.checkLogin();
  }
  
  checkLogin(): void {
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account
        console.log("Logueado para ver las conversaciones");
        this.getMensajesConversacion();
      } else {
        console.log('No has iniciado sesión');
        this.router.navigate(['home']);
      }
    })
  }

  getMensajesConversacion(): void {
    this.route.paramMap.subscribe((params: Params) => {
      if(params.get('id')){
        console.log('hola')
        this.id = params.get('id');
        //this.conversacion = this.id
        //console.log(this.id);
        // A partir del id de la conversación se buscan sus mensajes
        this.conversacionesService.getMensajesByConvId(this.id).subscribe(mensajes => {
          if(mensajes != []){
            this.mensajes = mensajes;
            console.log(this.mensajes);
            if(this.mensajes){
              if(this.mensajes[0].emisor?.id == this.accountModel?.id 
                || this.mensajes[0].receptor?.id == this.accountModel?.id ){
                  console.log('Estos son tus mensajes usuario ' + this.accountModel?.id);
                  //Se busca el id del receptor de los mensajes y que no coincida con el usuario logueado
                  this.getReceptor();
                  this.getEmisor();         
                  
                  for (var mensaje of this.mensajes) {
                    mensaje.fecha = dayjs(mensaje.fecha);
                    //console.log(mensaje.fecha);
                  }
              } else {
                //this.router.navigate(['conversaciones']);
              }
            }
          } 
        })
      } else {
        if(params.get('idUser')){
          if(this.emisor && this.receptor){
            this.getReceptor();
            this.getEmisor();
          }
          
          //Crear nueva conversación
          this.crearConversacion();
          
          //Nos lleva a dicha conversación
          this.router.navigate(['conversacion', this.idNuevaConv, 'user', this.receptor.id]);
          //Se genera un Nuevo mensaje AUTOMÁTICO para esta Conversación
        }
      }
    })
   
  }
  
  // función getter para un fácil acceso a los campos del formulario
  get f() { return this.mensajeForm.controls; }

  crearNuevoMensaje(texto: string = ''): void {
    console.log(this.mensajeForm.value.mensaje);
    this.getEmisor();
    this.getReceptor();
    if(this.emisor && this.receptor){
      this.getEmisor();
      this.getReceptor();
      texto == '' ? 'Hola, este mensaje es de prueba.' : texto;
      this.conversacionesService.nuevoMensaje(this.construirMensaje(this.mensajeForm.value.mensaje, this.emisor, this.receptor, this.id)).subscribe(data => {
        this.refresh();
      })
    }
    
  }

  construirMensaje(texto: string, emisor: IUsuario, receptor: IUsuario, id: number): IMensaje {

    return { 
      ...new MensajeModel(),
      texto: texto,
      fecha: dayjs(new Date,"YYYY-MM-DDTHH:mm"),
      emisor: emisor,
      receptor: receptor,
      conversacion: { id: id }
    }
  }

  crearConversacion(){
    this.conversacionesService.nuevaConversacion().subscribe(); 
 } 

  getEmisor(): IUsuario {
    if(this.accountModel){
      this.usuarioService.getUsuarioById(this.accountModel?.id).subscribe( usuario => { 
        if(usuario){
          this.emisor = usuario;
          console.log('emisor: ' + JSON.stringify(this.emisor.nombre));
          
        }
      })
    }
    return this.emisor;
  }

  getReceptor(): IUsuario {
      this.route.paramMap.subscribe((params: Params) => {
        if(params.get('idUser')){
          this.idReceptor = params.get('idUser');
          console.log('IDUSER: '+ this.idReceptor);
          if(this.accountModel){
            this.usuarioService.getUsuarioById(this.idReceptor).subscribe( usuario => { 
              if(usuario){
                this.receptor = usuario;
                console.log('receptor: ' + JSON.stringify(this.receptor.nombre)); 
              }
            })
          }
        }
      })
      return this.receptor;
  }



  refresh(): void {
		this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
		//console.log(decodeURI(this.location.path()));
		this.router.navigate([decodeURI(this.location.path())]);
		});
	}

}
