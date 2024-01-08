import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";
import {ApiHelperService} from "../../services/api-helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private api: ApiHelperService, private service: TokenStorageService, private router: Router) {}

  displayedColumns: string[] = ['lastname', 'firstname', 'age'];
  displayedColumns2: string[] = ['name'];
  dataSourcent: any[] = [];
  dataSourcentA: any[] = [];

  ngOnInit(): void {
    const id = this.service.getId()
    const request: Observable<any> = this.http.get(
      'http://localhost:3000/users/'+id,
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSourcent = [response.body]),
    });

    const requestA: Observable<any> = this.http.get(
      'http://localhost:3000/users/'+id+'/associations',
      { observe: 'response' },
    );
    requestA.subscribe({
      next: (response) => (this.dataSourcentA = [response.body],console.log(this.dataSourcentA)),
    });

  }
  forceRefresh(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/profile');
    });
  }

  editLastName(){
    const id = this.service.getId()
    const lastname: string = (document.getElementById('lastname') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {lastname}
    })
    this.forceRefresh()
  }

  editFirstName(){
    const id = this.service.getId()
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {firstname}
    })
    this.forceRefresh()
  }

  editPassword(){
    const id = this.service.getId()
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {password}
    })
    this.forceRefresh()
  }

}
