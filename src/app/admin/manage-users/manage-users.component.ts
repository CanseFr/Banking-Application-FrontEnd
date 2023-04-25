import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/services/user.service";
import {UserDto} from "../../services/models/user-dto";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit{

  customers: Array<UserDto> = []
  showInacticUserOnly: boolean = false

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.findAllCustomers()
  }

  private findAllCustomers(){
    this.userService.findAll().subscribe({
      next: (value) => {
        this.customers = value
      }
    })
  }

  filterCustomers(){
    if( this.showInacticUserOnly){
      this.customers = this.customers.filter((c) => !c.active)
    } else {
      this.findAllCustomers()
    }
  }

  changeUserState(active: boolean | undefined, id: number | undefined){
    if (active){
      this.userService.validateAccount({
        "user-id" : id as number
      }).subscribe({
        next: () =>{}
      });
    } else {
      this.userService.invalidateAccount({
        "user-id" : id as number
      }).subscribe({
        next: () =>{}
      });
    }
  }

}
