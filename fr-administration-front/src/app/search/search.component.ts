import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ApiHelperService} from "../../services/api-helper.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  query: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private api: ApiHelperService, private service: TokenStorageService, private router: Router) {
  }

  displayedColumns: string[] = ['id','lastname', 'firstname', 'age','delete'];
  displayedH: string[] = ['id','lastname', 'firstname', 'age'];
  displayedColumns2: string[] = ['id','name','delete'];
  displayedH2: string[] = ['id','name'];
  dataSourcent: any[] = [];
  dataSourcent2: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query']; // Stocke la valeur de :id dans la variable userId
      console.log(this.query); // Utilise cette variable comme nécessaire
    });

    const request: Observable<any> = this.http.get(
      'http://localhost:8081/users/search/' + this.query,
      {observe: 'response'},
    );
    request.subscribe({
      next: (response) => (this.dataSourcent = [response.body]),
    });

    const request2: Observable<any> = this.http.get(
      'http://localhost:8081/associations/search/' + this.query,
      {observe: 'response'},
    );
    request2.subscribe({
      next: (response) => (this.dataSourcent2 = [response.body]),
    });

  }

  idRedirect(id: number): void {
    this.router.navigateByUrl("/users/" + id);

  }

  idRedirect2(id: number): void {
    this.router.navigateByUrl("/associations/" + id);

  }

  delete(id: number) {
    console.log('delete')
    this.api.delete({
      endpoint: '/users/' + id,
    })
    this.router.navigateByUrl('/users');
  }

  delete2(id: number) {
    console.log('delete2')
    this.api.delete({
      endpoint: '/associations/' + id,
    })
    this.router.navigateByUrl('/associations');
  }

}
