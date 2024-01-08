import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProfileComponent} from "./profile/profile.component";
import {AssociationsListComponent} from "./associations-list/associations-list.component";
import {UsersDetailsComponent} from "./users-details/users-details.component";
import {AssociationsDetailsComponent} from "./associations-details/associations-details.component";
import {SearchComponent} from "./search/search.component";



const routes: Routes = [
  { path: 'users', component: UsersListComponent,canActivate: [AuthGuard] },
  { path: 'associations', component: AssociationsListComponent,canActivate: [AuthGuard] },
  {path:'login',component: LoginComponent},
  {path:'profile',component: ProfileComponent,canActivate: [AuthGuard]},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'users/:id', component: UsersDetailsComponent,canActivate: [AuthGuard] },
  {path: 'associations/:id', component: AssociationsDetailsComponent,canActivate: [AuthGuard] },
  {path: 'search/:query', component: SearchComponent,canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
