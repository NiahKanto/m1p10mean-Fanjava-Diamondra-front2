import { Component } from '@angular/core';
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
  constructor(private authService: AuthentificationService){}

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.authService.login(credentials).subscribe(response =>{
      this.authService.setToken(response.token);
    })
  }
}
