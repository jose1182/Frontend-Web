import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { DataUtils, FileLoadError } from '../../core/util/data-util.service';
import { EventManager, EventWithContent } from '../../core/util/event.manager.service';
import { UsuarioService } from '../../services/usuario.service';
import { UserService } from '../../services/user/user.service';
import * as dayjs from 'dayjs';
import { IUser } from '../../model/user.model';
import { IUsuario, Usuario } from '../../model/usuario.model';
import { DATE_TIME_FORMAT } from '../../config/input.constants';
import { UsuariosService } from '../../services/usuario/usuarios.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isSaving = false;
  usersSharedCollection: IUser[] = [];
  editForm: FormGroup;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected usuarioService: UsuarioService,
    protected usuariosService: UsuariosService,
    protected userService: UserService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
  ) {
    this.editForm = this.fb.group({
      id: [],
      nombre: [null, [Validators.required, Validators.maxLength(40)]],
      apellidos: [null, [Validators.maxLength(50)]],
      correo: [null, [Validators.required, Validators.maxLength(50)]],
      dni: [null, [Validators.required, Validators.pattern('[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]')]],
      direccion: [null, [Validators.required]],
      localidad: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      profesion: [],
      fn: [null, [Validators.required]],
      fechaRegistro: [],
      imagen: [],
      imagenContentType: [],
      user: [],
      conversacions: [],
    });
  }

  ngOnInit(): void {

    this.usuariosService.getUsuarioById(3).subscribe(usuario =>{
      this.updateForm(usuario);
      this.loadRelationshipsOptions();
    })

    console.log("user ollections: ", this.usersSharedCollection);

  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        console.log("FileLoadError: ", err)
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuario = this.createFromForm();
    if (usuario.id !== undefined) {
      this.subscribeToSaveResponse(this.usuarioService.update(usuario));
    } else {
      this.subscribeToSaveResponse(this.usuarioService.create(usuario));
    }
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(usuario: IUsuario): void {

    this.editForm.patchValue({
      id: usuario.id,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      dni: usuario.dni,
      direccion: usuario.direccion,
      localidad: usuario.localidad,
      provincia: usuario.provincia,
      profesion: usuario.profesion,
      fn: usuario.fn ? dayjs(usuario.fn).format('YYYY-MM-DDTHH:mm') : null,
      fechaRegistro: usuario.fechaRegistro ? dayjs(usuario.fechaRegistro).format('YYYY-MM-DDTHH:mm') : null,
      imagen: usuario.imagen,
      imagenContentType: usuario.imagenContentType,
      user: usuario.user,
      conversacions: usuario.conversacions,
    });
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IUsuario {
    return {
      ...new Usuario(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellidos: this.editForm.get(['apellidos'])!.value,
      correo: this.editForm.get(['correo'])!.value,
      dni: this.editForm.get(['dni'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      localidad: this.editForm.get(['localidad'])!.value,
      provincia: this.editForm.get(['provincia'])!.value,
      profesion: this.editForm.get(['profesion'])!.value,
      fn: this.editForm.get(['fn'])!.value ? dayjs(this.editForm.get(['fn'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaRegistro: this.editForm.get(['fechaRegistro'])!.value
        ? dayjs(this.editForm.get(['fechaRegistro'])!.value, DATE_TIME_FORMAT)
        : undefined,
      imagenContentType: this.editForm.get(['imagenContentType'])!.value,
      imagen: this.editForm.get(['imagen'])!.value,
      user: this.editForm.get(['user'])!.value,
      conversacions: this.editForm.get(['conversacions'])!.value,
    };
  }
}
