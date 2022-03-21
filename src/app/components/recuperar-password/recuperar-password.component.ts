import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordResetInitService } from '../../services/password-reset-init.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent{


  resetPasswordForm : FormGroup;
  success = false;
  constructor(private fb: FormBuilder, private passwordResetInitService: PasswordResetInitService) {
    this.resetPasswordForm = this.fb.group({
      email:['',[Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]]
    })
  }

  // función getter para un fácil acceso a los campos del formulario
  get f() { return this.resetPasswordForm.controls; }


  resetPass(): void{
    console.log(this.f.email.value)
    this.passwordResetInitService.save(this.f.email.value).subscribe(() => (this.success = true));
  }

}
