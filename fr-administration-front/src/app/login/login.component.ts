import { Component } from '@angular/core';
import {ApiHelperService} from "../../services/api-helper.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private api: ApiHelperService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {}

  login(): void {
    this.tokenStorageService.clear();

    //if(!this.tokenStorageService.isLogged()) {
      const username: string = (document.getElementById('username') as HTMLInputElement).value;
      const password: string = (document.getElementById('password') as HTMLInputElement).value;
      console.log(username,password);
      console.log("AMOGUS AMOGUS");
      this.api.post({
        endpoint: '/auth/login',
        data: {username, password}
      }).then(response => {this.tokenStorageService.save(response.access_token, username);
        console.log(response)
        this.router.navigateByUrl('/profile');
      }).catch((reason) => {
        alert("amogus")
      });
    //}else {
    //  this.router.navigateByUrl('/users');
    //}
  }


}
