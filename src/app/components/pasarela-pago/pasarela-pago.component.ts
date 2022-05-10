import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-pasarela-pago',
  templateUrl: './pasarela-pago.component.html',
  styleUrls: ['./pasarela-pago.component.css']
})
export class PasarelaPagoComponent implements OnInit {

  success : boolean = false
  error : boolean = false

  constructor(
    private accountService: AccountService
  ) {

  }

  ngOnInit() {

  }

  makePayment() {
    this.success= true
    this.accountService.updateAccount().subscribe({
      next: ()=> {
        this.accountService.identify(true).subscribe( account => {
          console.log(account)
          //this.accountModel = account
        })

        this.error = true
      },
      error: () =>(this.error = true)
    })
  }
}
