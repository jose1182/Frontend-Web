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
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-detalle-conversacion',
  templateUrl: './detalle-conversacion.component.html',
  styleUrls: ['./detalle-conversacion.component.css']
})
export class DetalleConversacionComponent implements OnInit {

  id!: number;
  idReceptor!: number | undefined;
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
        console.log("Logueado para ver los contratos");
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
        this.id = params.get('id');
        //this.conversacion = this.id
        //console.log(this.id);

        this.conversacionesService.getMensajesByConvId(this.id).subscribe(mensajes => {
          if(mensajes){
            this.mensajes = mensajes;
            console.log(this.mensajes);
            if(this.mensajes){
              if(this.mensajes[0].emisor?.id == this.accountModel?.id 
                || this.mensajes[0].receptor?.id == this.accountModel?.id ){
                  console.log('Estos son tus mensajes usuario ' + this.accountModel?.id);
                  //Se busca el id del receptor de los mensajes y que no coincida con el usuario logueado
                  this.getIdReceptor();

                  //Info del usuario emisor
                  this.usuarioService.getUsuarioById(this.accountModel?.id).subscribe( usuario => { 
                    if(usuario){
                      this.emisor = usuario;
                      //console.log('emisor: ' + JSON.stringify(this.emisor)); 
                    }
                  })

                  //Info del usuario receptor
                  this.usuarioService.getUsuarioById(this.idReceptor).subscribe( usuario => {
                    if(usuario){
                      this.receptor = usuario;
                      //console.log('receptor: ' + JSON.stringify(this.receptor));
                    }
                  })
                  
                  for (var mensaje of this.mensajes) {
                    mensaje.fecha = dayjs(mensaje.fecha);
                    //console.log(mensaje.fecha);
                  }
              } else {
                this.router.navigate(['conversaciones']);
              }
            } 
          }
        })
      }
    })
   
  }
  
  // función getter para un fácil acceso a los campos del formulario
  get f() { return this.mensajeForm.controls; }

  crearNuevoMensaje(): void {
    console.log(this.mensajeForm.value.mensaje);
    this.conversacionesService.nuevoMensaje(this.construirMensaje(this.mensajeForm.value.mensaje)).subscribe(data => {
      this.refresh();
    })
  }

  construirMensaje(texto: string): IMensaje {

    return { 
      ...new MensajeModel(),
      texto: texto,
      fecha: dayjs(new Date,"YYYY-MM-DDTHH:mm"),
      emisor: this.emisor,
      receptor: this.receptor,
      conversacion: { id: this.id }
    }
  }

  getIdReceptor(): void{

    for (let i = 0; i < this.mensajes.length; i++) {
      if(this.mensajes[i].receptor?.id != this.accountModel?.id){
          //console.log(this.mensajes[i].receptor?.id);
          this.idReceptor = this.mensajes[i].receptor?.id;
        }
    }
  }

  refresh(): void {
		this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
		//console.log(decodeURI(this.location.path()));
		this.router.navigate([decodeURI(this.location.path())]);
		});
	}

}
