import { AccountModel } from './../../model/account.model';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../model/usuario.model';
import { UsuariosService } from '../../services/usuario/usuarios.service';
import { ServicioService } from '../../services/servicios/servicio.service';
import * as dayjs from 'dayjs';
import { Disponibilidad } from './enums/disponibilidad.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IServicio } from '../../model/servicio.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ICategoria } from '../../model/categoria.model';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  isSaving = false;
  disponibilidadValues = Object.keys(Disponibilidad);
  categoriaCollection: ICategoria[] = [];

  editForm = this.formBuilder.group({
    id: [],
    titulo: [null, [Validators.required, Validators.maxLength(60)]],
    descripcion: [null, [Validators.required]],
    disponibilidad:[null, [Validators.required, Validators.min(0)]],
    preciohora:[null, [Validators.required, Validators.min(0)]],
    preciotraslado: [null, [Validators.required, Validators.min(0)]],
    fechacreacion: [null, [Validators.required]],
    fechaactualizacion: [null, [Validators.required]],
    destacado: [null, [Validators.required]],
    categorias: [],
  });

  constructor(
    private servicioService: ServicioService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(({servicio}) => {
      if(servicio.id === undefined){
        let today = dayjs().startOf('day');
        servicio.fechacreacion = today;
        servicio.fechaactualizacion = today;
      }

      this.updateForm(servicio);

      //this.loadCategorias();
    })

  }

  updateForm(servicio: IServicio): void{
    this.editForm.patchValue({
      id : servicio.id,
      titulo : servicio.titulo,
      descripcion : servicio.descripcion,
      disponibilidad : servicio.disponibilidad,
      preciohora: servicio.preciohora,
      preciotraslado : servicio.preciotraslado,
      fechacreacion : servicio.fechacreacion ? servicio.fechacreacion.format("YYYY-MM-DDTHH:mm"): null,
      fechaactualizacion : servicio.fechaactualizacion ? servicio.fechaactualizacion.format("YYYY-MM-DDTHH:mm"): null,
      destacado :  servicio.destacado,
      categorias : servicio.categorias
    });

    this.categoriaCollection = this.categoriaService.addCategoriaToCollectionIfMissing(
      this.categoriaCollection, ...(servicio.categorias ?? [])
    );
  }























  checkAuthorities(authorities:string[] | undefined): boolean{
    let authority = authorities?.find(role => role == "ROLE_ESPECIALISTA");
    if(!authority){
      return false;
    }
    return true;
  }
/*
  this.accountService.identify(true).subscribe( account => {
    this.account = account
    if(!this.checkAuthorities(this.account?.authorities)){
      this.router.navigate(['cuenta-especialista']);
    }
  })
*/
}
