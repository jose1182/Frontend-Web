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

  formGroup: FormGroup;
  public password1: string;
  public password2: string;
  //validaciones
  public validatePassword = false;
  public provincesList;

  constructor(private fb: FormBuilder, private router: Router, private registroService: RegistroService) {
    
    //contraseña1 y contraseña2
    this.password1 = '';
    this.password2 = '';
    //validaciones
    this.validatePassword = false;
    this.provincesList = this.registroService.getProvinces();

    this.formGroup = this.fb.group({
      firstName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      secondName:['',Validators.pattern('[a-zA-Z ]*')],
      province: ['', Validators.required]

    })

   }
  
  ngOnInit(): void {
  }

  onSubmit():void {
    if (this.passwordConfirm()){

      console.log("mensaje ok");
      let value: RegistroModel = new RegistroModel()
          value.firstName = this.formGroup.value.firstName
          value.email = this.formGroup.value.email
          value.password = this.formGroup.value.password1
          value.secondName = this.formGroup.value.secondName
         this.registroService.getRegisteredUser(this.formGroup)
             this.router.navigate(['/login'])
   
            } else {

      console.log("Algo falla Paquito");
   }
  }
   //para validar que las contraseñas coinciden  
   public passwordConfirm(): boolean {

    this.password1 = this.formGroup.value.password1;
    this.password2 = this.formGroup.value.password2;
console.log(this.password1)
    if  (this.password1 == this.password2) {
      this.validatePassword = false;
      return true;

    } else {
      this.validatePassword = true;
      return false;
    }

  }
  
}
