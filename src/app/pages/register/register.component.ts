import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserDto} from "../../services/models/user-dto";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userDto: UserDto = { email: "", firstname: "", lastname: "", password: "" };
  errorMessage: Array<string> = []
  constructor(
    private router:Router,
    private authService: AuthenticationService,
    ) {
  }

  async login() {
    await this.router.navigate(['login'])
  }

  register() {
    this.errorMessage = []
    this.authService.register({ body: this.userDto })
      .subscribe({
        next: async (data) => {
          console.log(data)
          await this.router.navigate(['confirm-register']);
        },
        error: (err) => {
          console.log(err.error.validationErrors)
          this.errorMessage = err.error.validationErrors;

        }
      })
  }
}
