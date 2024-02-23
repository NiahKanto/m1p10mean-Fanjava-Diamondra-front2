import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { UserInscription } from '../Types/User';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  nom = ''
  email = ''
  mdp = ''
  confirmmdp = ''
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}
  
  isFetching: boolean = false;
  inscription() {
    this.isFetching = true;
    const credentials: UserInscription = {
      nom: this.nom,
      email: this.email,
      mdp: this.mdp,
      confirmmdp: this.confirmmdp
    };
    
    this.authService.inscription(credentials)
    .pipe(
      finalize(
        () => {
          this.isFetching = false;
        })
    )
    .subscribe(
      success => {
        this.successMessage = success.message;
        this.nom='';
        this.email='';
        this.mdp='';
        this.confirmmdp='';
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = error.error.message || 'Verifier vos informations personnelles';
      }
    );
  }
}
