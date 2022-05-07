import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { IConversacion } from 'src/app/model/conversacion.model';
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
  conversaciones!: IConversacion[];
  mensajes!: MensajeModel[];
  accountModel!: AccountModel | undefined;
  
  constructor(
    private conversacionesService: ConversacionesService,
    private router: Router,
    private accountService: AccountService
  ) {  }

  ngOnInit(): void {
    this.checkLogin();
  }

  goToViewDetail(id: number | undefined): void {
    this.router.navigate(['conversacion', id]);
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
        /*
        if(this.conversaciones[0].id){
          this.getMensajesConversacion(this.conversaciones[0].id)
        }
        */
      }
    })
  }

 

}
