import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiHelperService} from "../../services/api-helper.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrl: './users-details.component.scss'
})
export class UsersDetailsComponent implements OnInit {

  userId: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient, private api: ApiHelperService, private service: TokenStorageService, private router: Router) {}

  displayedColumns: string[] = ['lastname', 'firstname', 'age','deletion'];
  displayedH: string[] = ['lastname', 'firstname', 'age'];
  displayedColumns2: string[] = ['id','name'];
  dataSourcent: any[] = [];
  dataSourcentA: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Stocke la valeur de :id dans la variable userId
      console.log(this.userId); // Utilise cette variable comme nécessaire
    });

    const request: Observable<any> = this.http.get(
      'http://localhost:3000/users/'+this.userId,
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSourcent = [response.body]),
    });

    const requestA: Observable<any> = this.http.get(
      'http://localhost:3000/users/'+this.userId+'/associations',
      { observe: 'response' },
    );
    requestA.subscribe({
      next: (response) => (this.dataSourcentA = [response.body],console.log(this.dataSourcentA)),
    });
  }

  idRedirect(id:number ): void{
    this.router.navigateByUrl("/associations/"+id);

  }
  forceRefresh(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/users/'+this.userId);
    });
  }

  editLastName(){
    const id = this.userId
    const lastname: string = (document.getElementById('lastname') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {lastname}
    })
    this.forceRefresh()
  }

  editFirstName(){
    const id = this.userId
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {firstname}
    })
    this.forceRefresh()
  }

  editPassword(){
    const id = this.userId
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {password}
    })
    this.forceRefresh()
  }
  editAge(){
    const id = this.userId
    const age: string = (document.getElementById('age') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/users/'+id,
      data: {age}
    })
    this.forceRefresh()
  }


  delete(id:number){
    console.log('delete')
    this.api.delete({
      endpoint: '/users/'+id,
    })
    this.router.navigateByUrl('/users');
  }

}
