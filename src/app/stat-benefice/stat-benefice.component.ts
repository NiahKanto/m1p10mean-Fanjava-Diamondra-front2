import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stat-benefice',
  templateUrl: './stat-benefice.component.html',
  styleUrl: './stat-benefice.component.css'
})
export class StatBeneficeComponent {
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
    return  this.http.get<any>('https://m1p10mean-fanjava-diamondra-back.vercel.app/rdv/statBenefice',{headers: headers});
  }

  ngOnInit(){
    this.fetchStat().subscribe((data: any) => {
      const paiement = data.paiement;
      const depense = data.depense;
      const commission = data.commission;

      console.log(commission);

      const newSingle = [];
      for(let m=1; m<= 12; m++){
        var val = 0;
        const p = paiement.find((paiement: { _id: { month: number; }; })=> paiement._id.month === m);
        if(p){
            val += p.total;
        }
        const d = depense.find((depense: { _id: { month: number; }; })=> depense._id.month === m);
        if(d){
            val -= d.total;
        }
        const c = commission.find((commission: { date:string })=> parseInt(commission.date.split('-')[0]) === m);
        if(c){
            val -= c.total;
        }
        newSingle.push({name: m+'-'+(new Date()).getFullYear(), value: val})
      }
      this.single = newSingle;
     });
  }

}
