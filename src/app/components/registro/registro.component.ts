import { RegistroModel } from './../../model/registro.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public registerErrorText!: string;
  isLoading: boolean = false;


  formGroup: FormGroup;
  public password: string;
  public password_confirmed: string;
  //validaciones
  public validatePassword = false;

  constructor(private fb: FormBuilder, private router: Router, private registroService: RegistroService) {
    
    //contraseña1 y contraseña2
    this.password = '';
    this.password_confirmed = '';

    //validaciones
    this.validatePassword = false;

    this.formGroup = this.fb.group({
      username: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      password_confirmed: ['', Validators.required]
    })

   }
  
  ngOnInit(): void {
  }

  onSubmit():void {
    if (this.formGroup.valid && this.passwordConfirm()){

      console.log("mensaje ok");
      let value: RegistroModel = new RegistroModel()
          value.login = this.formGroup.value.username
          value.email = this.formGroup.value.email
          value.password = this.formGroup.value.password
      //this.registroService.getRegisteredUser(this.formGroup)
      this.registroService
      .registerUser(value)
      .subscribe(
        response => {
          this.isLoading = false;
          this.registerErrorText = '';
          console.log('Register OK');
        }, error =>{
          this.isLoading = false
          this.registerErrorText = `⚠️ ¡No se ha podido registrar! (${error.error?.detail})`;
        },
        () => {
          this.isLoading = false
        }
      )
      this.router.navigate(['/login'])
    } else {
      console.log("Algo falla Paquito");
    }

  }


   //para validar que las contraseñas coinciden  
   public passwordConfirm(): boolean {
    this.password = this.formGroup.value.password;
    this.password_confirmed = this.formGroup.value.password_confirmed;
    console.log(this.password)
    if  (this.password == this.password_confirmed) {
      this.validatePassword = false;
      return true;
    } else {
      this.validatePassword = true;
      return false;
    }
  }
}
