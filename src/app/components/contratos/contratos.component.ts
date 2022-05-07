import { ContratoModel } from './../../model/contrato.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContratosService } from 'src/app/services/contratos/contratos.service';
import { AccountModel } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  id!: number;
  contratos!: ContratoModel[];
  accountModel!: AccountModel | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratosService: ContratosService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  goToViewDetail(id: number): void{
    this.router.navigate(['contrato', id]);
  }

  checkLogin(): void {
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account
        console.log("Logueado para ver los contratos");
        this.getContratosList();
      } else {
        console.log('No has iniciado sesión');
        this.router.navigate(['home']);
      }
    })
  }

  getContratosList(): void {
    this.route.paramMap.subscribe((params: Params) => {
      if(params.get('id')){
        this.id = params.get('id');
        //console.log(this.id);

        this.contratosService.getContratoByUserId(this.id).subscribe(contratos => {
          if(contratos){
            this.contratos = contratos;
            console.log(this.contratos);
          }
        })
      }
    })
  }

}
