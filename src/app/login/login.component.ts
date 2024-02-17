import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { finalize } from 'rxjs';

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
    private router: Router
  ) {}
  
  isFetching: boolean = false;
  login() {
    this.isFetching = true;
    const credentials = {
      nom: this.username,
      mdp: this.password,
    };
    
    this.authService.login(credentials)
    .pipe(
      finalize(
        () => {
          this.isFetching = false;
        })
    )
    .subscribe(
      success => {
        this.authService.setToken(success.token);
        console.log(success.authorities)
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = error.error.message || 'Verifier vos informations personnelles';
      }
    );
  }
}  
