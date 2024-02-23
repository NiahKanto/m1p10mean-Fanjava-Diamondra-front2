import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RDVDataUnit, RDVUnit, RDVDataTotal } from '../Types/RDV';
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
  rdv : RDVDataUnit = {
    dateHeure: new Date(),
    etat: 0,
  };
  totalRdv: RDVDataTotal = {
    totalMontant: 0,
    totalDuree: 0
  };

  fetchRDV() : Observable<RDVUnit> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<RDVUnit>('http://localhost:3000/rdv/nextRDV',{headers: headers});
  }

  ngOnInit(){
    if(this.authService.isClient()){
      this.fetchRDV().subscribe((data: RDVUnit) => {
        this.rdv = data.rdv;
        this.totalRdv = data.totalRdv;
      })
    }
  }

  isEmploye(){
    return this.authService.isEmploye()
  }

  isClient(){
    return this.authService.isClient()
  }
  


}
