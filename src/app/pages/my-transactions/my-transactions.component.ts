import {Component, OnInit} from '@angular/core';
import {TransactionsService} from "../../services/services/transactions.service";
import {TransactionDto} from "../../services/models/transaction-dto";
import {JwtHelperService} from "@auth0/angular-jwt";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {HelperService} from "../../services/helper/helper.service";

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit{

  transactions : Array<TransactionDto> = []

  constructor(private transactionService: TransactionsService,
              private helperService: HelperService) {
  }

  ngOnInit(): void {

    this.transactionService.findAllByUserId({
      'user-id' : this.helperService.getUserId()
    }).subscribe({
      next: (data : TransactionDto[])=>{
        this.transactions = data;
      }
    })
  }

}
