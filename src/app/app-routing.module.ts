import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardManager } from './auth.guard';
import { HomeComponent } from './home/home.component'; 
import { ManagerComponent } from './manager/manager.component';
import { RdvComponent } from './rdv/rdv.component';
import { RDVhistoriqueComponent } from './rdv//historique/rdv-historique.component'; 
import { RDVlisteComponent } from './rdv/liste-today/rdv-liste.component'; 
import { ServiceFicheComponent } from './service/ficheService/service.fiche.component'; 
import { SuiviTachesComponent } from './user/suivi-taches/suivi-taches.component'; 
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { GestionServiceComponent } from './gestion-service/gestion-service.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'rdv', component: RdvComponent},
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuardManager]},
  { path: 'listeRDV', component: RDVlisteComponent },
  { path: 'HistoriqueRDV', component: RDVhistoriqueComponent }, 
  { path: 'ficheService/:id', component: ServiceFicheComponent }, 
  { path: 'suiviTaches', component: SuiviTachesComponent }, 
  { path: 'historic', component: HistoriqueClientComponent }, 
  { path: 'manageService', component: GestionServiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
