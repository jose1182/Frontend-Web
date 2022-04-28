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
import { IServicio, Servicio } from '../../model/servicio.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ICategoria } from '../../model/categoria.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  isSaving = false;
  disponibilidadValues = Object.keys(Disponibilidad);
  categoriasCollection: ICategoria[] = [];
  account! : AccountModel | null;
  isEspecialista: boolean = false;
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
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(({servicio}) => {
      if(servicio.id === undefined){
        let today = dayjs().startOf('day');
        servicio.fechacreacion = today;
        servicio.fechaactualizacion = today;
      }
      this.getAuthorities();
      this.updateForm(servicio);
      this.loadCategorias();
    })

  }

      // convenience getter for easy access to form fields
      get f() { return this.editForm.controls; }

  save(): void{
    this.isSaving = true;
    const servicio = this.createFromForm();
    if(servicio.id !== undefined){
      this.subscribeToSaveResponse(this.servicioService.update(servicio));
    }else {
      this.subscribeToSaveResponse(this.servicioService.create(servicio));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IServicio>>): void {
    result.pipe(finalize( () => this.isSaving = false)).subscribe({
      next:() => this.previousState(),
      error: () => console.log("Error")
    })
  }

  private loadCategorias(): void {
    this.categoriaService.getAllCatogorias()
     .pipe(map((res: HttpResponse<ICategoria[]>) => res.body ?? []))
     .pipe(
      map((categorias: ICategoria[]) =>
        this.categoriaService.addCategoriaToCollectionIfMissing(categorias, ...(this.editForm.get('categorias')!.value ?? []))
      )
    ).subscribe((categorias: ICategoria[]) => (this.categoriasCollection = categorias))
  }

  previousState(): void {
    window.history.back();
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

    this.categoriasCollection = this.categoriaService.addCategoriaToCollectionIfMissing(
      this.categoriasCollection, ...(servicio.categorias ?? [])
    );
  }

  trackCategoriaById(index: number, item: ICategoria): number {
    return item.id!;
  }

  getSelectedCategoria(option: ICategoria, selectedVals?: ICategoria[]):ICategoria{
    if(selectedVals){
      for(const selectedVal of selectedVals){
        if(option.id === selectedVal.id){
          return selectedVal;
        }
      }
    }
    return option;
  }


  private createFromForm(): IServicio {
    return {
      ...new Servicio(),
      id: this.editForm.get(['id'])!.value,
      titulo: this.editForm.get(['titulo'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      disponibilidad: this.editForm.get(['disponibilidad'])!.value,
      preciohora: this.editForm.get(['preciohora'])!.value,
      preciotraslado: this.editForm.get(['preciotraslado'])!.value,
      fechacreacion: this.editForm.get(['fechacreacion'])!.value
        ? dayjs(this.editForm.get(['fechacreacion'])!.value, "YYYY-MM-DDTHH:mm")
        : undefined,
      fechaactualizacion: this.editForm.get(['fechaactualizacion'])!.value
        ? dayjs(this.editForm.get(['fechaactualizacion'])!.value, "YYYY-MM-DDTHH:mm")
        : undefined,
      destacado: this.editForm.get(['destacado'])!.value,
      categorias: this.editForm.get(['categorias'])!.value,
    };
  }

  getAuthorities(){
    this.accountService.identify(true).subscribe( account => {
      this.account = account
      if(!this.checkAuthorities(this.account?.authorities)){
        this.previousState()
      } else {
        this.isEspecialista = true;
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
/*
  this.accountService.identify(true).subscribe( account => {
    this.account = account
    if(!this.checkAuthorities(this.account?.authorities)){
      this.router.navigate(['cuenta-especialista']);
    }
  })
*/
}
