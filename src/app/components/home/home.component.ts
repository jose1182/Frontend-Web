import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountModel } from '../../model/account.model';
import { AuthJwtService } from '../../services/auth-jwt.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountModel!: AccountModel | null;

  constructor(
    private accountService: AccountService,
    private authJwtService: AuthJwtService,
    private route : Router) {

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      console.log(account)
      this.accountModel = account
    })
  }

  isAuthenticated() : boolean {
    return this.authJwtService.loginValue() != null
  }

  logout(){
    this.authJwtService.performLogout();
    this.accountModel = null
    this.route.navigate(['/home'])

  }
}
