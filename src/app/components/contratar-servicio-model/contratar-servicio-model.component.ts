import { Component, OnInit } from '@angular/core';
import { ContratosService } from '../../services/contratos/contratos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IContrato } from '../../model/contrato.model';

@Component({
  selector: 'app-contratar-servicio-model',
  templateUrl: './contratar-servicio-model.component.html',
  styleUrls: ['./contratar-servicio-model.component.css']
})
export class ContratarServicioModelComponent implements OnInit {

  contrato!: IContrato

  constructor(
    private contratosService: ContratosService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.activeModal.dismiss()
  }

  confirmContratar(){
    this.contratosService.create(this.contrato).subscribe(()=>{
      this.activeModal.close('contratar')
    })
  }
}
