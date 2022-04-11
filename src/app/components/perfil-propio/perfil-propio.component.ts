import { UsuarioModel } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-perfil-propio',
  templateUrl: './perfil-propio.component.html',
  styleUrls: ['./perfil-propio.component.css']
})
export class PerfilPropioComponent implements OnInit {
  
  public perfil!: UsuarioModel;

  constructor(public accountService: AccountService) { 

  }

  ngOnInit(): void {
      
      this.accountService.fetch2(1).subscribe( (response) => {
       
        this.perfil = response
      })
  }

  onSubmit(){} 

}
