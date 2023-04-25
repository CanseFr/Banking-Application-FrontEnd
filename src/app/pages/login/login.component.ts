import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import { AuthenticationService } from 'src/app/services/services/authentication.service';
import { AuthenticationRequest } from 'src/app/services/models/authentication-request';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  authRequest: AuthenticationRequest = {};
  errorMessage : Array<string> = []

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, // necessaire pour a recuperartion de parametre url
    private authService: AuthenticationService
  ) {
    // console.log(activatedRoute) -> Regarder dans e snapshot niveau console pour rechercher les valeur

    // Ici entre crochet est precisé "sometext" la variable declaré dans route module,  "x" paramtre url definit au hasard

    //Il est donc possibile de chainer les params dans route module  -> /:info1/:info2/:info3.....

  }

  async register() {
    await this.router.navigate(['register'])
  }

  ngOnInit(): void {}


    login(){
      this.errorMessage = []
      this.authService.authenticate({
        body: this.authRequest
      }).subscribe({
        next : async (data) => {
          //console.log(data);
          localStorage.setItem('token', data.token as string);
          const helper = new JwtHelperService();
          let decodedToken = null
          if (data.token != null) {
            decodedToken = helper.decodeToken(data.token)
          }

          if ( decodedToken.authorities[0].authority === 'ROLE_ADMIN'){
            await this.router.navigate(['admin/dashboard'])
          } else {
            await this.router.navigate(['user/dashboard'])
          }
        },
        error : (err) => {
          console.log(err.error.errorMessage)
          this.errorMessage.push(err.error.errorMessage);
        }
      })
    }


}
