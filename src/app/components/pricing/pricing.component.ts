import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountModel } from 'src/app/model/account.model';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  account!: AccountModel | null;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      this.account = account
    })
  }


}
