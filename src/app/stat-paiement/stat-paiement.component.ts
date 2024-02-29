import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stat-paiement',
  templateUrl: './stat-paiement.component.html',
  styleUrl: './stat-paiement.component.css'
})
export class StatPaiementComponent {
  single: any[] = [];
  dayValues: any[] = [];

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  showLegend = true;

  xAxisLabel = 'Mois';
  yAxisLabel = 'Montant'

  constructor(private authService: AuthentificationService, private http: HttpClient){
    const year = (new Date()).getFullYear();
  }
  fetchStat() : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<any>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/statPaiementMonth',{headers: headers});
  }

  fetchStatDay(month: number) : Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<any>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/statPaiementDay/'+month,{headers: headers});
  }

  ngOnInit(){
    this.fetchStat().subscribe((data: any) => {
      console.log(data)
      const newSingle = [];
      for(let m=1; m<= 12; m++){
        const mData = data.find((data: { _id: { month: number; }; })=> data._id.month === m);
        if(mData){
            newSingle.push({name: m+'-'+(new Date()).getFullYear(), value: mData.total})
        }
        else{
            newSingle.push({name: m+'-'+(new Date()).getFullYear(), value: 0})
        }
      }
      this.single = newSingle;
    });
  }

  onBarSelect(event: any){
    const dates = event.name.split('-');
    const m = parseInt(dates[0]);
    this.fetchStatDay(m).subscribe((data: any) => {
      this.dayValues = data;
    });
  }

}
