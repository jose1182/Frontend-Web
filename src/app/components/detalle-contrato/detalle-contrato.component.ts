import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IServicio } from 'src/app/model/servicio.model';
import { ContratosService } from 'src/app/services/contratos/contratos.service';
import { ServiciosService } from 'src/app/services/servicios/servicios.service';
import { IContrato } from '../../model/contrato.model';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './detalle-contrato.component.html',
  styleUrls: ['./detalle-contrato.component.css']
})
export class DetalleContratoComponent implements OnInit {

  id!: number;
  contrato!: IContrato;
  servicio!: IServicio;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contratosService: ContratosService,
    private servicioService: ServiciosService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      if(params.get('id')){
        this.id = params.get('id');
        console.log('Contrato: ' + this.id);

        this.contratosService.getContratoById(this.id).subscribe(contrato => {
          if(contrato){
            this.contrato = contrato;
            console.log(this.contrato);

            if(contrato.servicio){
            this.servicioService.getServiceById(contrato.servicio.id).subscribe(servicio => {
              if(servicio){
                this.servicio = servicio;
                console.log(this.servicio);
              }
            })
          }
          }
        })
      }
    })
  }

}
