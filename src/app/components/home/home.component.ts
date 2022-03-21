import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountModel } from '../../model/account.model';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountModel!: AccountModel | null;

  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      console.log('identifty: ', account)
      this.accountModel = account
    })
  }


}
