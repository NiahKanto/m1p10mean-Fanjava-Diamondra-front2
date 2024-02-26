import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardManager } from './auth.guard';
import { HomeComponent } from './home/home.component'; 
import { RdvComponent } from './rdv/rdv.component';
import { RDVhistoriqueComponent } from './rdv//historique/rdv-historique.component'; 
import { RDVlisteComponent } from './rdv/liste-today/rdv-liste.component'; 
import { ServiceFicheComponent } from './service/ficheService/service.fiche.component'; 
import { SuiviTachesComponent } from './user/suivi-taches/suivi-taches.component'; 
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { GestionServiceComponent } from './gestion-service/gestion-service.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ListeServNonAssigneComponent } from './service/liste-serv-non-assigne/liste-serv-non-assigne.component'; 
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';
import { GestionOffreComponent } from './gestion-offre/gestion-offre.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'rdv', component: RdvComponent},
  { path: 'listeRDV', component: RDVlisteComponent },
  { path: 'HistoriqueRDV', component: RDVhistoriqueComponent }, 
  { path: 'ficheService/:id', component: ServiceFicheComponent }, 
  { path: 'suiviTaches', component: SuiviTachesComponent }, 
  { path: 'historic', component: HistoriqueClientComponent }, 
  { path: 'inscription', component: InscriptionComponent},
  { path: 'manageService', component: GestionServiceComponent, canActivate: [AuthGuardManager]},
  { path: 'servNonAssigne', component: ListeServNonAssigneComponent},
  { path: 'clients', component: ClientComponent, canActivate: [AuthGuardManager]},
  { path: 'employes', component: EmployeComponent, canActivate: [AuthGuardManager]},
  { path: 'offres', component: GestionOffreComponent, canActivate: [AuthGuardManager]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
