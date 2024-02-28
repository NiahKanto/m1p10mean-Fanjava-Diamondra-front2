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
  selectedOffreId: any;
  rdvDetails:  any;
  offreDetails:  any;
  
  constructor(private authService: AuthentificationService, private http: HttpClient){}
  rdv :any
  totalRdv: any;
  offres : Offres = []

  fetchRDV() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/nextRDV',{headers: headers});
  }

  fetchOffres() : Observable<Offres> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Offres>('https://m1p10mean-fanjava-diamondra-back.vercel.app/offre/listToday',{headers: headers});
  }

  getdetailRDV(idRdv: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/detailsServ4RDVbyID/${idRdv}`, { headers: headers });
  }
  
  getdetailOffre(idOffre: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`https://m1p10mean-fanjava-diamondra-back.vercel.app/offre/detailsPack/${idOffre}`, { headers: headers });
  }

  voirDetailsRDV(idRdv: string): void {
    console.log('appel fonction')
    this.selectedRdvId = idRdv;
    console.log('idRdv='+idRdv)
    this.getdetailRDV(idRdv).subscribe((details: any) => {
      this.rdvDetails = details;
      this.offreDetails=null;
      console.log('rdvdetail==='+details)
    });
  }

  voirDetailsOffre(idOffre: string): void {
    console.log('appel fonction')
    this.selectedOffreId = idOffre;
    console.log('idOffre='+idOffre)
    this.getdetailOffre(idOffre).subscribe((details: any) => {
      this.offreDetails = details.service;
      this.rdvDetails=null;
      console.log('rdvdetail==='+details)
    });
  }

  ngOnInit(){
    if(this.authService.isClient())
    {
      this.fetchRDV().subscribe((data: any) => {
        this.rdv = data.rdvDetails;
        console.log('vo azo'+data);
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
