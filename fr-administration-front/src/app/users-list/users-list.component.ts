import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ApiHelperService} from "../../services/api-helper.service";

//class User {} //pas convaincu nn plus

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router,private api: ApiHelperService) {}

  displayedColumns1: string[] = ['id', 'lastname', 'firstname', 'age','delete'];
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource= []; //pas convaincu c pas comme l'énoncé mais sinon ça avait pas l'air de marcher (enft si jsp pk)

  ngOnInit(): void {
    const request: Observable<any> = this.http.get(
      'http://localhost:3000/users',
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSource = response.body,console.log(this.dataSource)),
});
  }

  idRedirect(id:number ): void{
    this.router.navigateByUrl("/users/"+id);

  }

  create(): void{
    const lastname: string = (document.getElementById('lastname') as HTMLInputElement).value;
    const firstname: string = (document.getElementById('firstname') as HTMLInputElement).value;
    const age: string = (document.getElementById('age') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;

    this.api.post({
      endpoint: '/users/',
      data: { password,age,lastname,firstname}
    }).then(response=>this.forceRefresh())

  }

  forceRefresh(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/users');
    });
  }

  delete(id: number) {
    console.log('delete')
    this.api.delete({
      endpoint: '/users/' + id,
    }).then(response=>this.forceRefresh())
  }
}

