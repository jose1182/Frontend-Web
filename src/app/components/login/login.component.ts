import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../model/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading : boolean = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router

    ) {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      remenberMe: false
    })
   }

  ngOnInit(): void {
  }


    // función getter para un fácil acceso a los campos del formulario
  get f() { return this.loginForm.controls; }

  submitForm(){

    this.sent = true

    if(!this.loginForm.valid){return}

    let loginModel: LoginModel = new LoginModel(this.f.username.value, this.f.password.value,this.f.remenberMe.value);

    this.isLoading = true;

    this
      .loginService
      .performLogin(loginModel)
      .subscribe(
        response => {
          this.isLoading = false;
          this.errorMsg = null;
        }, error =>{
          this.errorMsg = `⚠️ ¡No se ha podido iniciar la sesión! (${error.error?.detail})`;
          this.isLoading = false
        },
        () => {
          this.isLoading = false
        }
      )
  }

  goToRegistro():void{
    this.router.navigate(['/registro']);
  }

  goToRecuperacion():void{
    this.router.navigate(['/recuperar-password']);
  }

  goToHome():void{
    this.router.navigate(['/home']);
  }

}
