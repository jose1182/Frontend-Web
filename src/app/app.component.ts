import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountModel } from './model/account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-web';


  accountModel!: AccountModel | null;


  constructor(
    private accountService: AccountService
    ){

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      console.log(account)
      this.accountModel = account
    })

  }
}
