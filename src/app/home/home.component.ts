import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent {
  constructor(private authService: AuthentificationService, private http: HttpClient){}

  roles = this.authService.getRoles();
  ngOnInit(){
    console.log(this.roles) 
  }
  isEmploye(){
    return this.authService.isEmploye()
  }

  isClient(){
    return this.authService.isClient()
  }


}
