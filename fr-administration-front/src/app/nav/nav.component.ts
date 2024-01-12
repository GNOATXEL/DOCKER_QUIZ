import { Component } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  constructor(
    private service: TokenStorageService,
    private route: Router
  ) {}

  inputValue: string = '';


  logout(): void {
    console.log("click on logout !");
    this.service.clear();
    this.route.navigateByUrl("/login");

  }

  listU(): void{
    this.route.navigateByUrl("/users");
  }

  listA(): void{
    this.route.navigateByUrl("/associations");
  }
  profile(): void{
    this.route.navigateByUrl("/profile");
  }

  idol(): void{
    this.route.navigateByUrl("/idol");
  }

  search(): void{
    this.action(this.inputValue)
  }

  forceRefresh(value:string): void {
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigateByUrl('/search/'+value);
    });
  }

  action(value: string): void{
    this.forceRefresh(value);
  }
}
