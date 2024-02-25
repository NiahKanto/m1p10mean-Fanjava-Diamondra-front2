
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';  
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'

import { RdvComponent } from './rdv/rdv.component'
import { HomeComponent } from './home/home.component';
import { RDVlisteComponent } from './rdv/liste-today/rdv-liste.component'; 
import { RDVhistoriqueComponent } from './rdv/historique/rdv-historique.component'; 
import { ServiceFicheComponent } from './service/ficheService/service.fiche.component';
import { SuiviTachesComponent } from './user/suivi-taches/suivi-taches.component'; 
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { GestionServiceComponent } from './gestion-service/gestion-service.component';
import { DialogAjoutServiceComponent } from './dialog-ajout-service/dialog-ajout-service.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DialogDeleteServiceComponent } from './dialog-delete-service/dialog-delete-service.component';
import { DialogPayRdvComponent } from './dialog-pay-rdv/dialog-pay-rdv.component';
import { ListeServNonAssigneComponent } from './service/liste-serv-non-assigne/liste-serv-non-assigne.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RDVlisteComponent,
    RDVhistoriqueComponent,
    ServiceFicheComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    RdvComponent,
    SuiviTachesComponent,
    HistoriqueClientComponent,
    GestionServiceComponent,
    DialogAjoutServiceComponent,
    InscriptionComponent,
    DialogDeleteServiceComponent,
    DialogPayRdvComponent,
    ListeServNonAssigneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    DragDropModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
