import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ApiHelperService} from "../../services/api-helper.service";

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.scss'
})

export class AssociationsListComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router,private api: ApiHelperService) {}

  displayedColumns: string[] = ['id', 'name'];
  displayedColumns1: string[] = ['id', 'name','delete'];
  dataSource= [];

  ngOnInit(): void {
    const request: Observable<any> = this.http.get(
      'http://localhost:3000/associations',
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSource = response.body),
    });
  }

  idRedirect(id:number ): void{
    this.router.navigateByUrl("/associations/"+id);

  }

  create(): void{
    const name: string = (document.getElementById('name') as HTMLInputElement).value;

    this.api.post({
      endpoint: '/associations/',
      data: {name}
    }).then(response=>this.forceRefresh())

  }

  delete(id: number) {
    console.log('delete')
    this.api.delete({
      endpoint: '/associations/' + id,
    }).then(response=>this.forceRefresh())
  }


  forceRefresh(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/associations');
    });
  }
}

