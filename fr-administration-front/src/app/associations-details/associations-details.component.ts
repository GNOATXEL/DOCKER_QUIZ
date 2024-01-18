import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiHelperService} from "../../services/api-helper.service";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-associations-details',
  templateUrl: './associations-details.component.html',
  styleUrl: './associations-details.component.scss'
})
export class AssociationsDetailsComponent implements OnInit {



  assoId: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient, private api: ApiHelperService, private service: TokenStorageService, private router: Router) {}

  displayedColumns: string[] = ['name','deletion'];
  displayedH: string[] = ['name'];
  displayedColumns2: string[] = ['id','lastname', 'firstname'];
  displayedColumns3: string[] = ['id','content'];
  dataSourcent: any[] = [];
  dataSourcentU: any[] = [];
  dataSourcentM: any[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.assoId = params['id']; // Stocke la valeur de :id dans la variable userId
      console.log(this.assoId); // Utilise cette variable comme nécessaire
    });

    const request: Observable<any> = this.http.get(
      'http://localhost:8081/associations/'+this.assoId,
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSourcent = [response.body]),
    });

    const requestU: Observable<any> = this.http.get(
      'http://localhost:8081/associations/'+this.assoId+'/members',
      { observe: 'response' },
    );
    requestU.subscribe({
      next: (response) => (this.dataSourcentU = [response.body]),
    });

    const requestH: Observable<any> = this.http.get(
      'http://localhost:8081/associations/'+this.assoId+'/minutes',
      { observe: 'response' },
    );
    requestH.subscribe({
      next: (response) => (this.dataSourcentM = [response.body], console.log(this.dataSourcentM)),
    });
  }

  idRedirect(id:number ): void{
    this.router.navigateByUrl("/users/"+id);

  }

  forceRefresh(): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/associations/'+this.assoId);
    });
  }

  editName(){
    const id = this.assoId
    const name: string = (document.getElementById('name') as HTMLInputElement).value;
    this.api.put({
      endpoint: '/associations/'+id,
      data: {name}
    })
    this.forceRefresh()
  }
ajoutMembre(){
    const id = this.assoId
  const nameMembre: string = (document.getElementById('nameMember') as HTMLInputElement).value;
  this.api.put({
    endpoint: '/associations/'+id,
    data: {}
  })
  this.forceRefresh()
}


  delete(id:number){
    console.log('delete')
    this.api.delete({
      endpoint: '/associations/'+id,
    })
    this.router.navigateByUrl('/associations');
  }

  add(){
    console.log('delete')
    this.api.delete({
      endpoint: '/associations/',
    })
    this.router.navigateByUrl('/associations');
  }

}
