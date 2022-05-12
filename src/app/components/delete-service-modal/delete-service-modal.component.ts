import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IServicio } from '../../model/servicio.model';
import { ServicioService } from '../../services/servicios/servicio.service';

@Component({
  selector: 'app-delete-service-modal',
  templateUrl: './delete-service-modal.component.html',
  styleUrls: ['./delete-service-modal.component.css']
})
export class DeleteServiceModalComponent implements OnInit {

  servicio!: IServicio

  constructor(
    private servcioService : ServicioService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.activeModal.dismiss();
  }

  confirmDelete(id: number):void{




    this.servcioService.delete(id).subscribe(()=>{
      this.activeModal.close('delete')
    })
  }

}
