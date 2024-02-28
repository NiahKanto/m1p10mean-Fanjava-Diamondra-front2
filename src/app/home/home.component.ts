import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RDVDataUnit, RDVUnit, RDVDataTotal } from '../Types/RDV';
import { Observable } from 'rxjs';
import { Offres } from '../Types/Offre';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css' 
})
export class HomeComponent {
  selectedRdvId: any;
  rdvDetails:  any;

  constructor(private authService: AuthentificationService, private http: HttpClient){}
  rdv : RDVDataUnit = {
    dateHeure: new Date(),
    etat: 0,
  };
  totalRdv: RDVDataTotal = {
    totalMontant: 0,
    totalDuree: 0
  };
  offres : Offres = []

  fetchRDV() : Observable<RDVUnit> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<RDVUnit>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/nextRDV',{headers: headers});
  }

  fetchOffres() : Observable<Offres> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Offres>('https://m1p10mean-fanjava-diamondra-back.vercel.app/offre/listToday',{headers: headers});
  }

  getfindServ4RDV(idRdv: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/findServ4RDV/${idRdv}`, { headers: headers });
  }

  voirDetails(idRdv: string): void {
    console.log('appel fonction')
    this.selectedRdvId = idRdv;
    console.log('idRdv='+idRdv)
    this.getfindServ4RDV(idRdv).subscribe((details: any) => {
      this.rdvDetails = details;
      console.log('rdvdetail==='+details)
    });
  }

  ngOnInit(){
    if(this.authService.isClient()){
      this.fetchRDV().subscribe((data: RDVUnit) => {
        this.rdv = data.rdv;
        this.totalRdv = data.totalRdv;
      });
      this.fetchOffres().subscribe((data: Offres) => {
        this.offres = data;
      })
    }
  }

  isEmploye(){
    return this.authService.isEmploye()
  }

  isClient(){
    return this.authService.isClient()
  }

  isManager(){
    return this.authService.isManager()
  }

  
  


}
