import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { RDVData, RDVDataUnits, RDVDataTotals } from '../Types/RDV';

@Component({
  selector: 'app-historique-client',
  templateUrl: './historique-client.component.html',
  styleUrl: './historique-client.component.css'
})
export class HistoriqueClientComponent implements OnInit{
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService
  ){}

  rdvs : RDVDataUnits =[];
  totalRdvs: RDVDataTotals=[];
  fusion: any;

  fetchRDV() : Observable<RDVData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<RDVData>('http://localhost:3000/rdv/list-by-client',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchRDV().subscribe((data: RDVData) => {
      this.rdvs = data.rdvs;
      this.totalRdvs=data.totalRdvs;
      console.log(this.rdvs);
      console.log(this.totalRdvs)
      this.fusion = this.rdvs.map((obj,index) => ({
        ...obj,
        ...this.totalRdvs[index]
      }))
    })
  }
}
