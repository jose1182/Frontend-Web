import { ContratoModel } from './../../model/contrato.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContratosService } from 'src/app/services/contratos/contratos.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  id!: number;
  contratos!: ContratoModel[]; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratosService: ContratosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      if(params.get('id')){
        this.id = params.get('id');
        console.log(this.id);

        this.contratosService.getContratoByUserId(this.id).subscribe(contratos => {
          if(contratos){
            this.contratos = contratos;
            console.log(this.contratos);
          }
        })
      }
    })
  }

  goToViewDetail(id: Number): void{
    this.router.navigate(['contrato', id]);
  }

}
