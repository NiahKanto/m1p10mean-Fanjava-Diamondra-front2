import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardManager } from './auth.guard';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuardManager]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
