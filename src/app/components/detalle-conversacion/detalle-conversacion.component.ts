import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dayjs from 'dayjs';
import { AccountModel } from 'src/app/model/account.model';
import { IConversacion } from 'src/app/model/conversacion.model';
import { MensajeModel } from 'src/app/model/mensaje.model';
import { AccountService } from 'src/app/services/account.service';
import { ConversacionesService } from 'src/app/services/conversaciones/conversaciones.service';

@Component({
  selector: 'app-detalle-conversacion',
  templateUrl: './detalle-conversacion.component.html',
  styleUrls: ['./detalle-conversacion.component.css']
})
export class DetalleConversacionComponent implements OnInit {

  id!: number;
  mensajes!: MensajeModel[];
  accountModel!: AccountModel | undefined;

  constructor(
    private conversacionesService: ConversacionesService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

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
        //console.log(this.id);

        this.conversacionesService.getMensajesByConvId(this.id).subscribe(mensajes => {
          if(mensajes){
            this.mensajes = mensajes;
            console.log(this.mensajes);
            console.log(this.mensajes[0].receptor)
            if(this.mensajes[0].receptor.id == this.accountModel?.id 
              || this.mensajes[0].emisor.id == this.accountModel?.id ){
                console.log('Estos son tus mensajes usuario ' + this.accountModel?.id);
                for (var mensaje of this.mensajes) {
                  mensaje.fecha = dayjs(mensaje.fecha);
                  console.log(mensaje.fecha);
                }
            } else {
              this.router.navigate(['conversaciones']);
            }
          }
        })
      }
    })
   
  }

}
