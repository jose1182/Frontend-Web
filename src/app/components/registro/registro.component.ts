import { RegistroModel } from './../../model/registro.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

const EMAIL_ALREADY_EXISTS=  "emailexists";
const LOGIN_ALREADY_EXISTS=  "userexists";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {



  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  public registerForm!: FormGroup;
  public password!: string;
  public password_confirmed!: string;

  constructor(private fb: FormBuilder, private router: Router, private registroService: RegistroService) {

    this.registerForm = this.fb.group({
      login: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password_confirmed: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    })

   }

  ngOnInit(): void {
  }

      // función getter para un fácil acceso a los campos del formulario
  get f() { return this.registerForm.controls; }

  onSubmit():void {

    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    if(!this.registerForm.valid){return}

    if(!this.passwordConfirm()){
      this.doNotMatch = true;
    } else {
      let value: RegistroModel = new RegistroModel(this.f.login.value, this.f.email.value, this.f.password.value);
      this.registroService
      .registerUser(value)
      .subscribe(
        response => {
          this.success = true;
          this.router.navigate(['/login'])
        }, error =>{
          let error_type: String = error.error.errorKey;

          console.log('response: ', error);
          console.log('errorKey: ', error_type);
          if(error.status === 400 && error.error.errorKey === LOGIN_ALREADY_EXISTS){
            this.errorUserExists = true;
          }else if(error.status === 400 && error.error.errorKey === EMAIL_ALREADY_EXISTS){
            this.errorEmailExists = true;
          }else{
            this.error = true
          }
        })
    }




  }

   //para validar que las contraseñas coinciden
   public passwordConfirm(): boolean {
    this.password = this.registerForm.value.password;
    this.password_confirmed = this.registerForm.value.password_confirmed;
    return this.password === this.password_confirmed;
  }
}
