import { AccountModel } from './../../model/account.model';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  account! : AccountModel | null

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      this.account = account
      console.log(this.account?.authorities) ;

      if(!this.checkAuthorities(this.account?.authorities)){
        this.router.navigate(['cuenta-especialista']);
      }
    })

  }


  checkAuthorities(authorities:string[] | undefined): boolean{

    let authority = authorities?.find(role => role == "ROLE_ESPECIALISTA");

    if(!authority){
      return false;
    }
    return true;
  }


}
