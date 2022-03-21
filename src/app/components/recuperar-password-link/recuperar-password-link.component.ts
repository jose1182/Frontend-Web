import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetLinkService } from '../../services/password-reset-link.service';


@Component({
  selector: 'app-recuperar-password-link',
  templateUrl: './recuperar-password-link.component.html',
  styleUrls: ['./recuperar-password-link.component.css']
})
export class RecuperarPasswordLinkComponent implements OnInit {

  initialized = false;
  passwordForm : FormGroup;
  doNotMatch = false;
  success = false;
  error = false;
  key = '';

  constructor(private fb: FormBuilder, private passwordResetLinkService: PasswordResetLinkService, private route: ActivatedRoute) {
    this.passwordForm = this.fb.group({
      newPassword:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirmPassword:['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['key']) {
        this.key = params['key']
      }
      this.initialized = true;
    });

  }

    // función getter para un fácil acceso a los campos del formulario
    get f() { return this.passwordForm.controls; }

  finishReset(): void{
    this.doNotMatch = false;
    this.error = false;


    const newPassword = this.f.newPassword.value;
    const confirmPassword = this.f.newPassword.value;

    if(newPassword !== confirmPassword){
      this.doNotMatch = true;
    }else {
      this.passwordResetLinkService.save(this.key, newPassword).subscribe({
        next: ()=> (this.success = true),
        error: () =>(this.error = true)
      })
    }
  }

}
