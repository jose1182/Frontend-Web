import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { Conversacion, IConversacion } from 'src/app/model/conversacion.model';
import { MensajeModel } from 'src/app/model/mensaje.model';
import { AccountService } from 'src/app/services/account.service';
import { ConversacionesService } from 'src/app/services/conversaciones/conversaciones.service';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.css']
})
export class ConversacionesComponent implements OnInit {

  id!: number;
  idReceptor!: number;
  conversaciones!: IConversacion[];
  mensajes!: MensajeModel[];
  accountModel!: AccountModel | undefined;
  idUser!: number | undefined;

  constructor(
    private conversacionesService: ConversacionesService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {  }

  ngOnInit(): void {
    this.checkLogin();
  }

  goToViewDetail(): void {
    this.router.navigate(['conversacion', this.accountModel?.id, this.idReceptor]);
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
            this.getUsuarioConversacion(this.conversaciones[i].id);
          }
        }
        
      }
    })
  }

  getUsuarioConversacion(id: number | undefined){ 
    this.conversacionesService.getMensajesByConvId(id).subscribe(mensajes => {
      if(mensajes != []){
        this.mensajes = mensajes;
        console.log(this.mensajes);
      }
    })
  }

  crearConversacion(){
     this.conversacionesService.nuevaConversacion().subscribe(data => {console.log(data)}, error => {console.log(error)});
  } 

}
