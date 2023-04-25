import {Component, OnInit} from '@angular/core';
import {LightInfoInput} from "../../components/light-info/light-info.component";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{

  accountInfoList: Array<LightInfoInput> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initializedAccountInfo();
  }

  private initializedAccountInfo(){
    this.accountInfoList = [
      {
        title: 'Account Balance',
        amount : 214654,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest Transfert',
        amount : 654987,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest Deposit',
        amount: 465879,
        infoStyle: 'bg-success'
      }];
  }
}
