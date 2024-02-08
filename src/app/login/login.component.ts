import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ''
  password = ''
  errorMessage = '';
  constructor(
    private authService: AuthentificationService,
    private router: Router // Injectez Router  ici
  ) {}
  
  // login(){
  //   const credentials = {
  //     username: this.username,
  //     password: this.password
  //   };
  //   this.authService.login(credentials).subscribe(response =>{
  //     this.authService.setToken(response.token);
  //   })
  // }

  login() {
    const credentials = {
      nom: this.username,
      mdp: this.password,
    };
    
    this.authService.login(credentials).subscribe(
      success => {
        this.authService.setToken(success.token);
        // Rediriger l'utilisateur vers la page d'accueil après la connexion réussie
        this.router.navigate(['/home']);
      },
      error => {
        // Gérer l'erreur de connexion
        console.error('Login failed', error);
        this.errorMessage = error.error.message || 'Verifier vos informations personnelles';
      }
    );
  }
}  
